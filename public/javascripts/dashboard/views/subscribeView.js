define([
  'jquery',
  'backbone',
  'text!templates/subscribeViewTemplate.html'
], function($, Backbone, subscribeViewTemplate){
  var SubscribeView = Backbone.View.extend({
    className: 'modal fade',
    render: function() {
      var html = this.template({ locationId: this.locationId, stripeKey: this.stripeKey });
      this.$el.empty();
      this.$el.append(html);
    },
    initialize: function(options) {
      this.locationId = options.locationId;
      this.stripeKey = options.stripeKey;
      this.template = _.template(subscribeViewTemplate);
      this.render();
      this.$el.modal({ backdrop: 'static' });
    }
  });

  return SubscribeView;
});