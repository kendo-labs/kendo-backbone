describe("Kendo UI Backbone DataSource - Remove From Backbone Collection", function(){
  
  describe("when removing a model from a backbone.collection", function(){
    var ds, collection, item;
    
    beforeEach(function(){
      item = new Backbone.Model({id: 1, name: "foo", foo: "bar", baz: "quux"});
      collection = new TestCollection(item);

      ds = new kendo.Backbone.DataSource({
        collection: collection,
        autoSync: true
      });
      ds.read();

      collection.remove(item);
    });

    it("should add one model to the collection", function(){
      expect(collection.length).toBe(0);
    });

    it("should add one model to the datasource", function(){
      expect(ds.view().length).toBe(0);
    });
  });

});
