var app = app || {};

app.Channels = Backbone.Collection.extend({
  model: app.Channel,
  url: 'http://localhost:4000/channels'
});
