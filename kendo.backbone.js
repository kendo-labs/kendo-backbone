(function () {
var Model = kendo.data.Model,
    ObservableArray = kendo.data.ObservableArray;

function wrapBackboneModel(backboneModel, fields) {
    return Model.define({
        fields: fields,
        init: function(model) {
            if (!(model instanceof backboneModel)) {
                model = new backboneModel(model);
            }

            Model.fn.init.call(this, model.toJSON());
            this.backbone = model;
        },
        set: function(field, value) {
            Model.fn.set.call(this, field, value);

            this.backbone.set(field, value);
        }
    });
}

function wrapBackboneCollection(model) {
    return ObservableArray.extend( {
        init: function(collection) {
            ObservableArray.fn.init.call(this, collection.models, model);

            this.collection = collection;
        },

        splice: function(index, howMany) {
            var itemsToInsert, removedItemx, idx, length;

            itemsToInsert = Array.prototype.slice.call(arguments, 2);

            removedItems = kendo.data.ObservableArray.fn.splice.apply(this, arguments);

            if (removedItems.length) {
                for (idx = 0, length = removedItems.length; idx < length; idx++) {
                    this.collection.remove(removedItems[idx].backbone);
                }
            }

            if (itemsToInsert.length) {
                for (idx = 0, length = itemsToInsert.length; idx < length; idx++) {
                    this.collection.unshift(itemsToInsert[idx].backbone);
                }
            }

            return removedItems;
        }
    });
}

kendo.backboneCollection = wrapBackboneCollection;
kendo.backboneModel = wrapBackboneModel;
})();
