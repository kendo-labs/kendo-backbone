// Kendo UI: kendo.Backbone.ViewEvents
// -----------------------------------
//
// Handle Kendo UI Widget and control events from a
// Backbone.View instance.
//
// Configure event definitions using a `kendoUIEvents`
// object, similar to the standard Backbone.View `events`
// configuration. Then call the `kendo.Backbone.ViewEvents.delegate(view)`
// method after the view has been rendered and the Kendo UI
// controls have been instantiated. When the Backbone.View
// instance is being cleaned up, call the
// `kendo.Backbone.ViewEvents.undelegate(view)` method to
// clean up the event handlers.

kendo.Backbone.ViewEvents = (function($, kendo, Backbone, _) {
  var eventSplitter = /^(\S+)\s*(.*)$/;

  var ViewEvents = {

    delegate: function(view, events) {
      if (!(events || (events = _.result(view, 'kendoUIEvents')))) { return view; }

      this.undelegate();

      for (var key in events) {
        var method = events[key];

        if (!_.isFunction(method)) { method = view[events[key]]; }
        if (!method) { continue; }

        var match = key.match(eventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, view);

        var widget = kendo.widgetInstance(view.$(selector), kendo.ui);
        widget.bind(eventName, method);
      }
      return view;
    },

    undelegate: function(){
    }
  };

  return ViewEvents;
})(jQuery, kendo, Backbone, _);
