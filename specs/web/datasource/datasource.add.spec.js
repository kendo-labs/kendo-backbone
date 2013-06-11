describe("Kendo UI Backbone DataSource - Add To DataSource", function(){

  describe("when adding a record to the datasource that does not have a schema defined, and no Backbone.Model.idAttribute has been defined", function(){
    var ds, collection, item;
    
    beforeEach(function(){
      collection = new TestCollection();
      ds = new kendo.Backbone.DataSource({
        collection: collection,
        autoSync: true
      });

      collection.on("add", function(model){
        item = model;
      });

      var foo = ds.add({name: "foo", foo: "bar", baz: "quux"});
    });

    it("should add the record to the backbone.collection", function(){
      expect(collection.length).toBe(1);
    });

    it("should use the 'id' as the datasource schema model id", function(){
      expect(ds.options.schema.model.id).toBe("id");
    });

    it("should add the id to the datasource record, from the collection", function(){
      expect(item.id).not.toBe("");
      expect(ds.view()[0].id).toBe(item.id);
    });

  });

  describe("when adding a record to the datasource that does not have a schema defined, and a Backbone.Model.idAttribute has been defined", function(){
    var ds, collection, item;

    var Model = Backbone.Model.extend({
      idAttribute: "myId"
    });

    var Collection = TestCollection.extend({
      model: Model
    });
    
    beforeEach(function(){
      collection = new Collection();
      ds = new kendo.Backbone.DataSource({
        collection: collection,
        autoSync: true
      });

      var foo = ds.add({name: "foo", foo: "bar", baz: "quux"});
    });

    it("should add the record to the backbone.collection", function(){
      expect(collection.length).toBe(1);
    });

    it("should use the 'id' as the datasource schema model id", function(){
      expect(ds.options.schema.model.id).toBe("myId");
    });

  });

  describe("when adding a record to the datasource that has a schema.model.id defined", function(){
    var ds, collection, item;

    beforeEach(function(){
      collection = new TestCollection();
      ds = new kendo.Backbone.DataSource({
        schema: {
          model: {
            id: "someId"
          }
        },
        collection: collection,
        autoSync: true
      });

      var foo = ds.add({name: "foo", foo: "bar", baz: "quux"});
    });

    it("should add the record to the backbone.collection", function(){
      expect(collection.length).toBe(1);
    });

    it("should use the 'id' as the datasource schema model id", function(){
      expect(ds.options.schema.model.id).toBe("someId");
    });

  });

});
