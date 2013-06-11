$(function(){

  var MemeCollection = Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage("meme-list")
  });

  var memeCollection = new MemeCollection([
    { id: 1, name: "spring cleaning", url: "/images/memes/28067008.jpg", tags: ["foo", "bar", "baz"] },
    { id: 2, name: "like a boss", url: "/images/memes/CatLikeaBoss.jpg", tags: ["baz", "quux", "widget"] },
    { id: 3, name: "infinite high five", url: "/images/memes/high-fives.gif", tags: ["wombat", "wambo", "bamboo"] },
    { id: 4, name: "eval is evil", url: "/images/memes/JavaScriptEval.jpg", tags: [] },
    { id: 5, name: "mind blown", url: "/images/memes/mind_blown.gif", tags: [] },
    { id: 6, name: "facepalm", url: "/images/memes/picard-facepalm.jpg", tags: [] },
    { id: 7, name: "things that make you go, 'hmmmmmmm'", url: "/images/memes/thingsThat.png", tags: [] },
    { id: 8, name: "epic thumbs up is epic", url: "/images/memes/ChuckNorrisThumbsUp.gif", tags: [] }
  ]);

  GridBackboneApp.init(memeCollection);

  memeCollection.on("add", function(model){
    console.log("added a model:", model.get("name"), model.get("url"));
  });

  var memeDataSource = new kendo.Backbone.DataSource({
    collection: memeCollection,

    schema: {
      model: {
        fields: {
          url: "string",
          name: "string",
          preview: "string",
          tags: {
            defaultValue: []
          }
        }
      }
    }

  });

  $(".grid").kendoGrid({
    dataSource: memeDataSource,
    columns: [
      {
        title: "Preview",
        editor: showImagePreview,
        template: "<img src='#= url #' width='100'>",
        field: "preview"
      },
      {
        title: "Name",
        field: "name",
      },
      {
        title: "URL",
        field: "url"
      },
      {
        title: "Tags",
        template: "#= tags.join(', ') #"
      },
      { command: ["edit", "destroy"] }
    ],
    toolbar: ["create"],
    editable: "popup"
  });

  function showImagePreview(container, options){
    console.log("image preview");
    var imagePreview = $("<img width='100' data-bind='attr: {src: url}'>");
    kendo.bind(imagePreview, options.model);
    container.append(imagePreview);
  }

});

