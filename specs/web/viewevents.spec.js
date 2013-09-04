describe("Kendo UI Backbone.View Events", function(){

  describe("when binding kendoUIWeb for a 'change' event, and triggering the change event from a widget", function(){
    var View = Backbone.View.extend({
      template: "<div id='list'></div>",

      kendoUIWeb: {
        "change #list": "listChanged"
      },

      listChanged: jasmine.createSpy("listChanged"),

      render: function(){
        this.$el.html(this.template);

        this.$("#list").kendoListView({
          dataSource: {
            data: [{name: "foo"}, {name: "bar"}]
          },
          template: "#= name #"
        });

        kendo.Backbone.ViewEvents.delegate(this);
      }
    });

    var view;

    beforeEach(function(){
      view = new View();

      view.render();
      var lv = view.$("#list").data("kendoListView");
      lv.trigger("change");
    });

    it("should call the change event handler method", function(){
      expect(view.listChanged).toHaveBeenCalled();
    });

  });

});
