var app = app || {};

app.ChannelView = Backbone.View.extend({
  tagName: 'div',

  template: JST['channel/show'],

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.model.fetch({ headers: {'Authorization': app.Auth.authorizationHeader()} });
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});
