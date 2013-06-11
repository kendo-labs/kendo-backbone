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
