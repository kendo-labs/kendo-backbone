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
      // increment the id
      if (!this._currentId) { this._currentId = this._collection.length; }
      this._currentId += 1;

      // set the id on the data provided
      var data = options.data;
      data.id = this._currentId;

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
      var bbtrans = new BackboneTransport(options.collection);
      _.defaults(options, {transport: bbtrans, autoSync: true});

      kendo.data.DataSource.fn.init.call(this, options);
    }
  }); 

})($, kendo, _);
