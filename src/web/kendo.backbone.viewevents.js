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
  var eventConfigName = "kendoUIEvents";

  var m;

  var ViewEvents = {

    delegate: function(view) {
      this._processEvents(view, function(widget, eventName, method){
        m = method;
        widget.bind(eventName, method);
      });
    },

    undelegate: function(view){
      this._processEvents(view, function(widget, eventName, method){
        widget.unbind(eventName);
      });
    },

    _processEvents: function(view, cb){
      var events = _.result(view, eventConfigName);
      if (!events){ return; }

      for (var key in events) {
        var method = events[key];

        if (!_.isFunction(method)) { method = view[method]; }
        if (!method) { continue; }

        var match = key.match(eventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, view);

        var element = view.$(selector); 
        var widget = kendo.widgetInstance(element, kendo.ui) ||
                     kendo.widgetInstance(element, kendo.mobile.ui) ||
                     kendo.widgetInstance(element, kendo.dataviz.ui);

        cb.call(this, widget, eventName, method);
      }
    }
  };

  return ViewEvents;
})(jQuery, kendo, Backbone, _);
