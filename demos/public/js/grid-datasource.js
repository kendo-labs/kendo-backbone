$(function(){

  var memeCollection = new Backbone.Collection([
    { id: 1, url: "/images/memes/28067008.jpg" },
    { id: 2, url: "/images/memes/CatLikeaBoss.jpg" },
    { id: 3, url: "/images/memes/high-fives.gif" },
    { id: 4, url: "/images/memes/JavaScriptEval.jpg" },
    { id: 5, url: "/images/memes/mind_blown.gif" },
    { id: 6, url: "/images/memes/picard-facepalm.jpg" },
    { id: 7, url: "/images/memes/thingsThat.png" },
    { id: 8, url: "/images/memes/ChuckNorrisThumbsUp.gif" }
  ]);

  $(".grid").kendoGrid({
    columns: [
      {
        title: "Preview",
        template: "<img src='#= url #' width='200'>"
      },
      {
        title: "URL",
        field: "url"
      }
    ],
    dataSource: new kendo.Backbone.DataSource({
      collection: memeCollection
    })
  });

});
