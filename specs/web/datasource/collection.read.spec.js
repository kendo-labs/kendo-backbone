describe("Kendo UI Backbone DataSource - Read Backbone Collection", function(){

  describe("given a collection/datasource is empty, when the collection is reset", function(){
    var ds, collection, item;
    
    beforeEach(function(){
      collection = new Backbone.Collection();
      ds = new kendo.Backbone.DataSource({
        collection: collection,
        autoSync: true
      });

      collection.on("reset", function(){
        item = collection.at(0).toJSON();
      });

      collection.reset([{id: 1, name: "foo", foo: "bar", baz: "quux"}]);
    });
    
    it("should reset the data in the DataSource", function(){
      var dsItem = ds.view()[0];

      expect(dsItem.id).toBe(item.id);
      expect(dsItem.name).toBe(item.name);
      expect(dsItem.foo).toBe(item.foo);
      expect(dsItem.baz).toBe(item.baz);
    });
  });
});
