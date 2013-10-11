// Kendo-Backbone
// --------------
// v0.0.6
//
// Copyright (c)2013 Telerik. All Rights Reserved.
// Distributed under Apache 2.0 license
//
// http://kendoui.com

(function(global, kendo){
  "use strict";

  // add a backbone namespace from which
  // to hang everything
  kendo.Backbone = kendo.Backbone || {};

// Kendo-Backbone Model
// --------------------
// 
// Wrap a Backbone.Model in a kendo.data.Model
(function () {
  var Model = kendo.data.Model;

  function wrapBackboneModel(BackboneModel, fields) {
    return Model.define({
      fields: fields,
      init: function(model) {
        if (!(model instanceof BackboneModel)) {
          model = new BackboneModel(model);
        }

        Model.fn.init.call(this, model.toJSON());
        this.backbone = model;
      },
      set: function(field, value) {
        Model.fn.set.call(this, field, value);

        this.backbone.set(field, value);
      }
    });
  }

  kendo.backboneModel = wrapBackboneModel;
})();

// Kendo-Backbone Collection
// -------------------------
// 
// Wrap a Backbone.Collection in a kendo.data.ObservableArray
(function () {

  var Model = kendo.data.Model,
  ObservableArray = kendo.data.ObservableArray;

  function wrapBackboneCollection(model) {
    return ObservableArray.extend( {
      init: function(collection) {
        ObservableArray.fn.init.call(this, collection.models, model);

        this.collection = collection;
      },

      splice: function(index, howMany) {
        var itemsToInsert, removedItemx, idx, length;

        itemsToInsert = Array.prototype.slice.call(arguments, 2);

        var removedItems = kendo.data.ObservableArray.fn.splice.apply(this, arguments);

        if (removedItems.length) {
          for (idx = 0, length = removedItems.length; idx < length; idx++) {
            this.collection.remove(removedItems[idx].backbone);
          }
        }

        if (itemsToInsert.length) {
          for (idx = 0, length = itemsToInsert.length; idx < length; idx++) {
            this.collection.unshift(itemsToInsert[idx].backbone);
          }
        }

        return removedItems;
      }
    });
  }

  kendo.backboneCollection = wrapBackboneCollection;
})();


// BackboneTransport
// -----------------
//
// INTERNAL TYPE
//
// Define a transport that will move data between
// the kendo DataSource and the Backbone Collection

kendo.Backbone.BackboneTransport = (function(){
  "use strict";

  // Constructor Function
  function Transport(colWrap){
    this.colWrap = colWrap;
  };
  
  // Instance methods. 
  // add basic CRUD operations to the transport
  _.extend(Transport.prototype, {

    create: function(options) {
      var data = options.data;

      // create the model in the collection
      this.colWrap.create(data, function(model){
        // tell the DataSource we're done
        options.success(model);
      });
    },

    read: function(options) {
      options.success(this.colWrap.collection.toJSON());
    },

    update: function(options) {
      // find the model
      var model = this.colWrap.collection.get(options.data.id);

      // update the model
      model.set(options.data);

      // tell the DataSource we're done
      options.success(options.data);
    },

    destroy: function(options) {
      // find the model
      var model = this.colWrap.collection.get(options.data.id);

      // remove the model
      this.colWrap.collection.remove(model);

      // tell the DataSource we're done
      options.success(options.data);
    }
  });

  return Transport;
})();

// Backbone.Collection Adapter
// ---------------------------
//
// INTERNAL TYPE
//
// Wrap a Collection with DataSource configuration so that
// the two-way integration can occur without infinite loops

kendo.Backbone.CollectionAdapter = (function(){
  "use strict";

  // Constructor function
  function Adapter(collection, dataSource){
    this.collection = collection;
    this.dataSource = dataSource;

    this.listenTo(this.collection, "add", this._addToDataSource);
    this.listenTo(this.collection, "remove", this._removeFromDataSource);
    this.listenTo(this.collection, "reset", this._resetDataSource);
  };

  // Instance methods
  _.extend(Adapter.prototype, Backbone.Events, {
    create: function(data, cb){
      if (this.addFromCol){
        // gate the add that came through the collection directly
        cb(data);
      } else {
        this.addFromDS = true;

        // ensure the id is cleared out, not just
        // an empty string
        if (!data.id){data.id = null}

        // add the model to the collection, and
        // for the return so that we can get the
        // id from the new model, and send it to
        // the datasource
        this.collection.create(data, {
          wait: true,
          success: function(model){
            cb(model.toJSON());
          }
        });

        this.addFromDS = false;
      }
    },

    _addToDataSource: function(model){
      // gate the add that came through the datasource directly
      if (!this.addFromDS){
        this.addFromCol = true;

        var data = model.toJSON();
        this.dataSource.add(data);

        this.addFromCol = false;
      }
    },

    _removeFromDataSource: function(model){
      var dsModel = this.dataSource.get(model.id);

      if (dsModel){
        this.dataSource.remove(dsModel);
      }
    },

    _resetDataSource: function(){
      this.dataSource.read();
    }
  });

  return Adapter;
})();

// Kendo UI: kendo.backbone.DataSource
// -----------------------------------
//
// An adapter that wraps around a 
// `Backbone.Collection` as the underlying data store and
// transport for a `kendo.data.DataSource`. This will provide basic
// data-binding functionality for Kendo UI widgets and controls, such
// as grids, list views, etc.

kendo.Backbone.DataSource = (function($, kendo, _) {
  "use strict";

  // kendo.Backbone.DataSource
  // -----------------------------------

  // Define the custom data source that uses a Backbone.Collection
  // as the underlying data store / transport
  var DataSource = kendo.data.DataSource.extend({
    init: function(options) {
      // build a collection wrapper for the backbone.collection
      var collection = options.collection;
      var colWrap = new kendo.Backbone.CollectionAdapter(collection, this);

      // configure the Backbone transport with the collection
      var bbtrans = new kendo.Backbone.BackboneTransport(colWrap);
      _.defaults(options, { transport: bbtrans });

      // initialize the datasource with the new configuration
      options = setupDefaultSchema(options, collection);
      kendo.data.DataSource.prototype.init.call(this, options);
    }
  }); 

  // Setup default schema, if none is provided
  function setupDefaultSchema(target, collection){
    // build the schema.model, one step at a time, 
    // to ensure it is not replaced, and ensure it is
    // properly set up in case parts of a schema or model
    // are provided by the specific application needs
    _.defaults(target, { schema: {} });
    _.defaults(target.schema, { model: {} });

    // set an id field based on the collection's model.idAttribute,
    // or use the default "id" if none found
    _.defaults(target.schema.model, {
      id: getPrototypeOf(collection).model.prototype.idAttribute || "id"
    });

    return target;
  }

  // shim for Object.getPrototypeOf
  // based on http://ejohn.org/blog/objectgetprototypeof/
  function getPrototypeOf(target){
    if (Object.getPrototypeOf){
      return Object.getPrototypeOf(target);
    } else {
      return target.__proto__ || target.constructor.prototype;
    }
  }

  return DataSource;
})($, kendo, _);

 
// Kendo UI: kendo.Backbone.ViewEvents
// -----------------------------------
//
// Handle Kendo UI Widget and control events from a
// Backbone.View instance.
//
// Configure event definitions using a `kendoUIEvents`
// object, similar to the standard Backbone.View `events`
// configuration. Then call the `kendo.Backbone.ViewEvents.delegate(view)`
// method after the view has been rendered and the Kendo UI
// controls have been instantiated. When the Backbone.View
// instance is being cleaned up, call the
// `kendo.Backbone.ViewEvents.undelegate(view)` method to
// clean up the event handlers.

kendo.Backbone.ViewEvents = (function($, kendo, Backbone, _) {
  var eventSplitter = /^(\S+)\s*(.*)$/;
  var eventConfigName = "kendoUIEvents";

  var m;

  var ViewEvents = {

    delegate: function(view) {
      this._processEvents(view, function(widget, eventName, method){
        m = method;
        widget.bind(eventName, method);
      });
    },

    undelegate: function(view){
      this._processEvents(view, function(widget, eventName, method){
        widget.unbind(eventName);
      });
    },

    _processEvents: function(view, cb){
      var events = _.result(view, eventConfigName);
      if (!events){ return; }

      for (var key in events) {
        var method = events[key];

        if (!_.isFunction(method)) { method = view[method]; }
        if (!method) { continue; }

        var match = key.match(eventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, view);

        var element = view.$(selector); 
        var widget = kendo.widgetInstance(element, kendo.ui) ||
                     kendo.widgetInstance(element, kendo.mobile.ui) ||
                     kendo.widgetInstance(element, kendo.dataviz.ui);

        cb.call(this, widget, eventName, method);
      }
    }
  };

  return ViewEvents;
})(jQuery, kendo, Backbone, _);


})(this, kendo);
