describe("Kendo UI Backbone DataSource - remove", function(){

  describe("when destroying a model that came from a Backbone.Collection", function(){
    var ds, collection, model;

    beforeEach(function(){
      model = new Backbone.Model({id: 1, foo: "bar"});
      collection = new Backbone.Collection([model]);

      ds = new kendo.Backbone.DataSource({
        collection: collection
      });
      ds.read();

      var kModel = ds.get(1);
      ds.remove(kModel);
    });

    it("should remove the model from the backbone.collection", function(){
      expect(collection.length).toBe(0);
    });
  });

});

