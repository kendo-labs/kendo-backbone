# kendo.Backbone.ViewEvents

Bind Kendo UI widget events directly, inside of a Backbone.View,
using a syntax like that of the DOM `events` configuration

## About

The Kendo UI widgets trigger various events throughout their
lifecycle and use. These events have typically needed 
[binding code in JavaScript]()
, to handle them correctly. With the `kendo.Backbone.ViewEvents`
plugin, you no longer need to do this. Now you can directly
bind to the Kendo UI events using a familiar event declaration
syntax!

## Binding Events

To get Kendo UI widget events bound in your Backbone.View, you
will need to do two things:

0. declare a `kendoUIEvents` configuration object in your
view

0. call the `kendo.Backbone.ViewEvents.delegate` method, passing
in the view instance

```js
var View = Backbone.View.extend({
  template: "<div id='list'></div>",
  
  // declare the Kendo UI widget events
  // the same way you would declare the
  // Backbone.View "events"
  kendoUIEvents: {
    "change #list": "listChanged"
  },
 
  listChanged: function(e){
    console.log("THE LIST CHANGE EVENT FIRED!!!");
  },
 
  render: function(){
    // render the view however you want
    this.$el.html(this.template);
 
    // instantiate a Kendo UI widget in the view
    this.$("#list").kendoListView({
      dataSource: {
        data: [{name: "foo"}, {name: "bar"}]
      },
      template: "#= name #"
    });
 
    // tell the kendo.Backbone plugin to 
    // delegate the view events for 
    // the widgets in this view
    kendo.Backbone.ViewEvents.delegate(this);
  }
});
```

Note that the call to `kendo.Backbone.ViewEvents.delegate`
must happen after the Kendo UI widgets have been initialized.

## Unbinding Events

It is important to unbind the events when removing the 
Backbone.View instance from the DOM. To do this, call the
`kendo.Backbone.ViewEvents.undelegate` method, again passing
in the view instance.

```js
var View = Backbone.View.extend({

  remove: function(){
    kendo.Backbone.ViewEvents.undelegate(this);
    Backbone.View.prototype.remove.call(this);
  }
});
```

In this example, the `remove` method is overridden and a call
to `kendo.Backbone.ViewEvents.undelegate` is made. Now when the
view's `remove` method is called, the Kendo UI widget events
will be unbound.

**NOTE**: the `undelegate` method will unbind all event handlers
for a given event on a widget. This is due to limitations in 
how the event handlers are configured, internally. Because of
this, you should not bind any events on the Kendo UI widget
outside of the Backbone.View that contains the widget.
