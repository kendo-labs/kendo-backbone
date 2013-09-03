$(document).ready(function() {

  var dataSource = new kendo.data.DataSource({
    transport: {
      read: {
        url: "http://demos.kendoui.com/service/Products",
        dataType: "jsonp"
      }
    },
    pageSize: 15
  });

  $("#pager").kendoPager({
    dataSource: dataSource
  });

  $("#listView").kendoListView({
    dataSource: dataSource,
    template: kendo.template($("#template").html())
  });

});
