describe("Kendo UI Backbone DataSource - Add To Backbone Collection", function(){
  
  describe("when adding a model to a backbone.collection", function(){
    var ds, collection, item;
    
    beforeEach(function(){
      collection = new Backbone.Collection();
      ds = new kendo.Backbone.DataSource({
        collection: collection,
        autoSync: true
      });

      item = collection.add({name: "foo", foo: "bar", baz: "quux"});
    });


    it("should add the model to the kendo.Backbone.Datasource", function(){
      expect(ds.view()[0]).toBe(item);
    });

  });
});
