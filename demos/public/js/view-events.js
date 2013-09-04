$(document).ready(function() {

  var drinkData = [{"ProductID":1,"ProductName":"Chai","UnitPrice":18,"UnitsInStock":39,"Discontinued":false},{"ProductID":2,"ProductName":"Chang","UnitPrice":19,"UnitsInStock":17,"Discontinued":false},{"ProductID":3,"ProductName":"Aniseed Syrup","UnitPrice":10,"UnitsInStock":13,"Discontinued":false},{"ProductID":4,"ProductName":"Chef Anton's Cajun Seasoning","UnitPrice":22,"UnitsInStock":53,"Discontinued":false},{"ProductID":5,"ProductName":"Chef Anton's Gumbo Mix","UnitPrice":21.35,"UnitsInStock":0,"Discontinued":true},{"ProductID":6,"ProductName":"Grandma's Boysenberry Spread","UnitPrice":25,"UnitsInStock":120,"Discontinued":false},{"ProductID":7,"ProductName":"Uncle Bob's Organic Dried Pears","UnitPrice":30,"UnitsInStock":15,"Discontinued":false},{"ProductID":8,"ProductName":"Northwoods Cranberry Sauce","UnitPrice":40,"UnitsInStock":6,"Discontinued":false},{"ProductID":9,"ProductName":"Mishi Kobe Niku","UnitPrice":97,"UnitsInStock":29,"Discontinued":true},{"ProductID":10,"ProductName":"Ikura","UnitPrice":31,"UnitsInStock":31,"Discontinued":false},{"ProductID":11,"ProductName":"Queso Cabrales","UnitPrice":21,"UnitsInStock":22,"Discontinued":false},{"ProductID":12,"ProductName":"Queso Manchego La Pastora","UnitPrice":38,"UnitsInStock":86,"Discontinued":false},{"ProductID":13,"ProductName":"Konbu","UnitPrice":6,"UnitsInStock":24,"Discontinued":false},{"ProductID":14,"ProductName":"Tofu","UnitPrice":23.25,"UnitsInStock":35,"Discontinued":false},{"ProductID":15,"ProductName":"Genen Shouyu","UnitPrice":15.5,"UnitsInStock":39,"Discontinued":false}]

  var Drink = Backbone.Model.extend({
    idField: "ProductID"
  });

  var Drinks = Backbone.Collection.extend({
    model: Drink
  });

  var DrinkList = Marionette.ItemView.extend({
    template: "#drink-list-template",

    kendoUIEvents: {
      "change #listView": "listViewChanged"
    },

    listViewChanged: function(e){
      var index = e.sender.select().index();
      var dataItem = e.sender.dataSource.view()[index];
      this.$("#result").html("<h3>You Selected " + dataItem.ProductName + "!</h3>");
    },

    onRender: function(){
      var dataSource = new kendo.Backbone.DataSource({
        collection: this.collection,
        pageSize: 15
      });

      this.$("#pager").kendoPager({
        dataSource: dataSource
      });

      this.$("#listView").kendoListView({
        dataSource: dataSource,
        template: kendo.template($("#drink-item-template").html()),
        selectable: "single"
      });

      kendo.Backbone.ViewEvents.delegate(this);
    }
  });

  var drinks = new Drinks(drinkData);

  var view = new DrinkList({
    collection: drinks
  });

  view.render();
  $("#example .demo-section").html(view.$el);
});
