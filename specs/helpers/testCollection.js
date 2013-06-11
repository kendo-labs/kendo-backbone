(function(global){
  global.TestCollection = Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage("test-collection")
  });

  var c = new global.TestCollection();

  c.on("reset", function(){
    c.each(function(m){
      m.destroy();
    });
  });

  c.fetch({reset: true});

})(this);
