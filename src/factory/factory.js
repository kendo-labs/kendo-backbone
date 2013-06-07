// kendo.backbone.factory
// ----------------------
//
// Internal object to store / retrieve
// types. A very simple alternative to
// complex solutions like requirejs.
// 
// This object should not be used
// outside of kendo.backbone's internal
// uses.
kendo.Backbone.factory = (function(){
  // from http://www.140byt.es/keywords/new
  function create(a,b,c){return(create[c=b?-~b.length:1]||(create[c]=Function("a,b,c","return new a("+Array(c).join(",b[c++]").slice(1)+")")))(a,b,0)}

  var factory = {
    types: {},
    register: function(name, type){
      this.types[name] = type;
    },
    build: function(name, args){
      var args = Array.prototype.splice.call(arguments, 1);
      return create(this.types[name], args);
    }
  };

  return factory;
})();
