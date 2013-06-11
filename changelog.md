## v0.0.5 [view commit logs](https://github.com/kendo-labs/kendo-backbone/compare/v0.0.4...v0.0.5)

* kendo.Backbone.DataSource
  * **BREAKING** Adding a model to the DataSource now forces a Backbone `collection.create` and must bring back an `id` on the model
  * Fixed issue with adding multiple items to DataSource

## v0.0.4 [view commit logs](https://github.com/kendo-labs/kendo-backbone/compare/v0.0.3...v0.0.4)

* kendo.Backbone.DataSource
  * Supports two-way sync between the Backbone.Collection and
    kendo.data.DataSource, for "add" and "remove", and "read" ("reset" on the backbone.collection).

## v0.0.3 [view commit logs](https://github.com/kendo-labs/kendo-backbone/compare/v0.0.2...v0.0.3)

* kendo.Backbone.DataSource
  * No longer defaults `autoSync: true`. Now uses the normal default of `autoSync: false`

## v0.0.2 [view commit logs](https://github.com/kendo-labs/kendo-backbone/compare/v0.0.1...v0.0.2)

* The kendo.Backbone.DataSource will now infer `schema.model.id` from the
  Backbone.Collection instance, is no `schema` is configured

* Started writing unit tests for the kendo.Backbone.DataSource

## v0.0.1

* Initial release
* Added `kendo.backbone.DataSource` to wrap a Backbone.Collection in a
  kendo.data.DataSource
* Added `kendo.backboneCollection` to wrap a Backbone.Collection in a Kendo
  MVVM ObservableArray
* Added `kendo.backboneModel` to wrap a Backbone.Model in a Kendo MVVM
  Observable model
