define([
  'jquery',
  'backbone',
  'text!templates/subscribeViewTemplate.html'
], function($, Backbone, subscribeViewTemplate){
  var SubscribeView = Backbone.View.extend({
    className: 'modal fade',
    render: function() {
      var html = this.template({ companyId: this.companyId, stripeKey: this.stripeKey });
      this.$el.empty();
      this.$el.append(html);
    },
    initialize: function(options) {
      this.template = _.template(subscribeViewTemplate);
      this.render();
      this.$el.modal({ backdrop: 'static' });
    }
  });

  return SubscribeView;
});