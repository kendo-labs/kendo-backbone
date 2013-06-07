(function(global, Backbone){
  global.GridBackboneApp = {
    init: function(collection){
      this.collection = collection;

      var form = new Form({
        el: $(".backbone-form")
      });

      var that = this;
      form.on("save", function(data){
        console.log('saving to the collection');
        that.collection.add(data);
      });
    }
  };

  var Form = Backbone.View.extend({
    
    events: {
      "click button.save": "saveClicked"
    },

    saveClicked: function(e){
      e.preventDefault();

      // split the tags input by "," and remove the
      // left over spaces for the tags
      var tags = this.$("input[name='tags']").val();
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
