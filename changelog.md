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
