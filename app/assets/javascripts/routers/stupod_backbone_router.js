var app = app || {};

var StupodRouter = Backbone.Router.extend({
  routes: {
    'channels': 'channels',
    'channel/:id': 'channel'
  },

  channels: function() {
    var view = new app.ChannelsView({ collection: new app.Channels() });
    $('#app').html(view.render().el);
  },

  channel: function(id) {
    var view = new app.ChannelView({ model: new app.Channel({ uuid: id }) });
    $('#app').html(view.el);
  }
});
