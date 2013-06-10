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
  };

  // Instance methods
  _.extend(Adapter.prototype, Backbone.Events, {
    add: function(){
      var args = Array.prototype.slice.call(arguments);

      // gate the add that came through the collection directly
      if (!this.addFromCol){
        this.addFromDS = true;
        this.collection.add.apply(this.collection, args);
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
    }
  });

  return Adapter;
})();
