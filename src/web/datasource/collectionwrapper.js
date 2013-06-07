kendo.Backbone.factory.register("CollectionWrapper", (function(){
  "use strict";

  // Backbone.Collection Wrapper
  // ---------------------------
  // Wrap a Collection with DataSource configuration so that
  // the two-way integration can occur without infinite loops

  // Constructor function
  function Wrapper(collection, dataSource){
    this.collection = collection;
    this.dataSource = dataSource;

    this.listenTo(this.collection, "add", this._addToDataSource);
  };

  // Instance methods
  _.extend(Wrapper.prototype, Backbone.Events, {
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
    }
  });

  return Wrapper;
})());
