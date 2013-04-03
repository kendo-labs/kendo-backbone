// Kendo-Backbone
// --------------
// v0.0.1
//
// Copyright (c)2013 Telerik. All Rights Reserved.
// Distributed under Apache 2.0 license
//
// http://kendoui.com

(function(global, kendo){
  "use strict";

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

// Kendo UI: kendo.backbone.DataSource
// -----------------------------------
//
// An early work to create a adapter that wraps around a 
// `Backbone.Collection` as the underlying data store and
// transport for a `kendo.data.DataSource`. This will provide basic
// data-binding functionality for Kendo UI widgets and controls, such
// as grids, list views, etc.
//
// Note that this is a largely untested experiment and hack. It is not 
// intended for production use. It is intended to be a sample only, 
// and is presented as-is with no implied stability and no guarantee 
// to work properly with any of Kendo UI's control suite.

(function($, kendo, _) {
  "use strict";

  // add a backbone namespace if we need it
  kendo.Backbone = kendo.Backbone || {};

  // BackboneTransport
  // -----------------
  //
  // Define a transport that will move data between
  // the kendo DataSource and the Backbone Collection
  var BackboneTransport = function(collection){
    this._collection = collection;
  };
  
  // add basic CRUD operations to the transport
  _.extend(BackboneTransport.prototype, {

    create: function(options) {
      var data = options.data;
      // create the model in the collection
      this._collection.add(data);
      // tell the DataSource we're done
      options.success(data);
    },

    read: function(options) {
      options.success(this._collection.toJSON());
    },

    update: function(options) {
      // find the model
      var model = this._collection.get(options.data.id);

      // update the model
      model.set(options.data);

      // tell the DataSource we're done
      options.success(options.data);
    },

    destroy: function(options) {
      // find the model
      var model = this._collection.get(options.data.id);

      // remove the model
      this._collection.remove(model);

      // tell the DataSource we're done
      options.success(options.data);
    }
  });

  // kendo.backbone.DataSource
  // -----------------------------------

  // Define the custom data source that uses a Backbone.Collection
  // as the underlying data store / transport
  kendo.Backbone.DataSource = kendo.data.DataSource.extend({
    init: function(options) {
      var collection = options.collection;

      // configure the Backbone transport 
      var bbtrans = new BackboneTransport(collection);
      _.defaults(options, { transport: bbtrans, autoSync: true });

      // Setup default schema, if none is provided
      options = setupDefaultSchema(options, collection);

      // initialize the datasource with the new configuration
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

})($, kendo, _);

 
})(this, kendo);
