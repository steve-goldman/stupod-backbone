var app = app || {};

app.ChannelListView = Backbone.View.extend({
  tagName: 'a',
  className: 'list-group-item',
  attributes: function() {
    return { 'href': '#channel/'.concat(this.model.attributes.id) };
  },
  template: JST['channel/show_list'],
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});
