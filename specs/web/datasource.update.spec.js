describe("Kendo UI Backbone DataSource - update", function(){

  describe("when updating a model that came from a Backbone.Collection", function(){
    var ds, collection, model;

    beforeEach(function(){
      model = new Backbone.Model({id: 1, foo: "bar"});
      collection = new Backbone.Collection([model]);

      ds = new kendo.Backbone.DataSource({
        collection: collection
      });
      ds.read();

      var kModel = ds.get(1);
      kModel.set("foo", "updated");
    });

    it("should push the updates to the Backbone.Collection model", function(){
      expect(model.get("foo")).toBe("updated");
    });
  });

});
