var app = app || {};

app.Channel = Backbone.Model.extend({
  idAttribute: 'uuid',
  urlRoot: 'http://localhost:4000/channels'
});
