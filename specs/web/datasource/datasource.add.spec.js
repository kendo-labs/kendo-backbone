describe("Kendo UI Backbone DataSource - add", function(){

  describe("when adding a record to the datasource that does not have a schema defined, and no Backbone.Model.idAttribute has been defined", function(){
    var ds, collection, item;
    
    beforeEach(function(){
      collection = new Backbone.Collection();
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
      expect(ds.options.schema.model.id).toBe("id");
    });

  });

  describe("when adding a record to the datasource that does not have a schema defined, and a Backbone.Model.idAttribute has been defined", function(){
    var ds, collection, item;

    var Model = Backbone.Model.extend({
      idAttribute: "myId"
    });

    var Collection = Backbone.Collection.extend({
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
      collection = new Backbone.Collection();
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
