describe("Kendo UI Backbone DataSource - Add To Backbone Collection", function(){
  
  describe("when adding a model to a backbone.collection", function(){
    var ds, collection, item;
    
    beforeEach(function(){
      collection = new TestCollection();
      ds = new kendo.Backbone.DataSource({
        collection: collection,
        autoSync: true
      });

      collection.on("add", function(model){
        item = model.toJSON();
      });

      collection.add({name: "foo", foo: "bar", baz: "quux"});
    });

    it("should add one model to the collection", function(){
      expect(collection.length).toBe(1);
    });

    it("should add one model to the datasource", function(){
      expect(ds.view().length).toBe(1);
    });

    it("should add the model to the kendo.Backbone.Datasource", function(){
      var dsModel = ds.view()[0].toJSON();
      expect(dsModel.name).toBe(item.name);
      expect(dsModel.foo).toBe(item.foo);
      expect(dsModel.baz).toBe(item.baz);
    });
  });

});
