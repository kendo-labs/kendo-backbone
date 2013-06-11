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
