(function(global, Backbone){
  global.GridBackboneApp = {
    init: function(collection){
      this.collection = collection;
      this.setupForm();
      this.setupGrid();
    }, 

    setupForm: function(){
      var form = new Form({
        el: $(".backbone-form")
      });

      var that = this;
      form.on("save", function(data){
        console.log('saving to the collection');
        that.collection.add(data);
      });
    },

    setupGrid: function(){
      var gridView = new GridView({
        collection: this.collection
      });

      gridView.on("itemview:model:destroy", function(view, model){
        this.collection.remove(model);
      }, this);

      gridView.render();
      $(".backbone-grid").html(gridView.$el);
    }
  };

  var RowView = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#marionette-grid-row-template",

    events: {
      "click .destroy": "destroyClicked"
    },

    modelEvents: {
      "change": "render"
    },

    destroyClicked: function(e){
      e.preventDefault();
      this.trigger("model:destroy", this.model);
    }
  });

  var GridView = Marionette.CompositeView.extend({
    tagName: "table",
    template: "#marionette-grid-template",
    itemView: RowView
  });

  var Form = Backbone.View.extend({
    
    events: {
      "click button.save": "saveClicked"
    },

    saveClicked: function(e){
      e.preventDefault();

      // split the tags input by "," and remove the
      // left over spaces for the tags
      var tags = this.$("textarea[name='tags']").val();
      tags = tags.trim().split(/\s*,\s*/g);

      var data = {
        name: this.$("input[name='name']").val(),
        url: this.$("input[name='url']").val(),
        tags: tags
      };

      this.trigger("save", data);
    }

  });

})(this, Backbone);
