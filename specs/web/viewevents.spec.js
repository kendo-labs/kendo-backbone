describe("Kendo UI Backbone.View Events", function(){

  describe("when delegating kendoUIEvents and triggering an event from a widget", function(){
    var View = Backbone.View.extend({
      template: "<div id='list'></div>",

      kendoUIEvents: {
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

    it("should call the event handler", function(){
      expect(view.listChanged).toHaveBeenCalled();
    });

  });

  describe("when undelegating kendoUIEvents and triggering an event from a widget", function(){
    var View = Backbone.View.extend({
      template: "<div id='list'></div>",

      kendoUIEvents: {
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
      },

      remove: function(){
        kendo.Backbone.ViewEvents.undelegate(this);
        Backbone.View.prototype.remove.call(this);
      }
    });

    var view;

    beforeEach(function(){
      view = new View();
      view.render();
      var lv = view.$("#list").data("kendoListView");

      view.remove();
      lv.trigger("change");
    });

    it("should not call the event handler", function(){
      expect(view.listChanged).not.toHaveBeenCalled();
    });
  });

});
