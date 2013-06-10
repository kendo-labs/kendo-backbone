describe("Kendo UI Backbone DataSource - read", function(){

  describe("when reading from a Backbone.Collection", function(){
    var ds, collection, items;

    beforeEach(function(){
      var collection = new Backbone.Collection([
        {id: 1, name: "foo"},
        {id: 2, name: "bar"},
        {id: 3, name: "baz"}
      ]);

      var ds = new kendo.Backbone.DataSource({
        collection: collection
      });

      ds.bind("change", function(){
        items = this.view();
      });

      ds.read();
    });

    it("should read all models from the collection", function(){
      var item1 = items[0];
      expect(item1.id).toBe(1);
      expect(item1.name).toBe("foo");

      var item2 = items[1];
      expect(item2.id).toBe(2);
      expect(item2.name).toBe("bar");

      var item3 = items[2];
      expect(item3.id).toBe(3);
      expect(item3.name).toBe("baz");
    });
  });

});
