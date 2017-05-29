var app = app || {};

app.ChannelsView = Backbone.View.extend({
  tagName: 'div',
  template: JST['channel/index'],
  initialize: function() {
    this.listenTo(this.collection, 'add', this.addOne);
    this.listenTo(this.collection, 'reset', this.addAll);
    this.collection.fetch({ headers: {'Authorization': app.Auth.authorizationHeader()} });
  },
  render: function() {
    this.$el.html(this.template());
    return this;
  },
  addOne: function(channel) {
    var view = new app.ChannelListView({ model: channel });
    $('#channels').append(view.render().el);
  },
  addAll: function() {
    $('#channels').html('');
    this.collection.each(this.addOne, this);
  }
});
