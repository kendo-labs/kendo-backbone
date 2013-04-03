# kendo.Backbone.DataSource

Use a Backbone.Collection instance as a DataSource for any Kendo UI 
Web control.

## About

The `kendo.Backbone.DataSource` provides a custom [transport](http://docs.kendoui.com/api/framework/datasource#configuration-transport)
implementation for a [kendo.data.DataSource](http://docs.kendoui.com/api/framework/datasource), 
using the Backbone.Collection instance as the underlying data 
store for the DataSource. It provides automatic synchronization 
between the DataSource instance and the Backbone.Collection instance, 
but it does not force persistence through the Backbone.Collection 
sync methods.

## Basic Use

Create an instance of a `kendo.Backbone.DataSource` any time you want
to use a Backbone.Collection as a DataSource for a Kendo UI Web
control. This datasource instance can be assigned to the `datasource`
attribute of any Kendo UI Web control.

```js
// create a kendo.Backbone.DataSource using a Backbone.Collection
// as the backing store
var bbds = new kendo.Backbone.DataSource({
  collection: myBBCol
});

$("#some-element").kendoDropDownList({
  datasource: bbds,
  dataTextField: "some-field",
  dataValueField: "id"
});
```

This will create a [Kendo UI DropDownList](http://demos.kendoui.com/web/dropdownlist/index.html)

The kendo.Backbone.DataSource will sync model changes between
itself and the Backbone.Collection automatically.

### Reading Models

When reading from the underlying Backbone.Collection, the Backbone.Model
instances will be converted to [kendo.data.Model](http://docs.kendoui.com/api/framework/model)
instances automatically. This is done by using the Backbone.Collection
instance `.toJSON()` method, and providing the resulting objects as
the data for the Kendo UI DataSource.

To affect what data is made available to the kendo.Backbone.DataSource,
override the `toJSON` method of the Backbone.Collection and/or the Model
type that it uses.

### Creating Models

When adding a new model to the kendo.Backbone.DataSource, the
underlying Backbone.Collection `add` method will be called, adding the
model to the Backbone.Collection instance.

No calls to persist the new Backbone.Model instance will be made. If you
need the calls to be persisted, you should manually `.save` the model
or provide some other means of persisting them.

### Updating Models

When a model in a kendo.Backbone.DataSource is updated, the 
Backbone.Model that is represented by the DataSource model will also
be updated. The model's `id` will be used to find the model in the
Backbone.Collection, and the model's `set` method will be called to
set the new values.

### Removing Models

When a model in a kendo.Backbone.DataSource is removed, the
Backbone.Model that it represents will be removed from the
underlying Backbone.Collection. The model's `id` is used to find
and remove the model.

## Inferring schema.model.id

Typically, creating an instance of a `kendo.data.DataSource` requires
the definition of a `schema` with a `model` and `mode.id` attribute.
This is used by the DataSource and various controls to facilitate
certain points of functionality.

When creating an instance of a `kendo.Backbone.DataSource`, though,
the `schema.model.id` will be inferred from the Backbone.Collection
and Model, if no schema is provided.

For example:

```js
var MyModel = Backbone.Model.extend({
  idAttribute: "myId"
});

var MyCollection = Backbone.Collection.extend({
  model: MyModel
});

var ds = new kendo.Backbone.DataSource({
  colelction: new MyCollection()
});

ds.options.schema.model.id; // => "myId"
```

If no `idAttribute` is specified on the Backbone.Model type, the
default "id" value will be used.

If a `schema` is configured on the `kendo.Backbone.DataSource` instance,
though, this configuration will override the inferred id.
