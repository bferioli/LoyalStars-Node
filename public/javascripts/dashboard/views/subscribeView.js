define([
  'jquery',
  'backbone',
  'text!templates/subscribeViewTemplate.html'
], function($, Backbone, subscribeViewTemplate){
  var SubscribeView = Backbone.View.extend({
    className: 'modal fade',
    render: function() {
      var html = this.template({ company_id: this.company_id, stripe_pk: this.stripe_pk, user: this.user });
      this.$el.empty();
      this.$el.append(html);
    },
    initialize: function(options) {
      var self = this;
      _.extend(this, _.pick(options, 'company_id', 'stripe_pk'));
      $.ajax({
        url: '/api/2/current_user',
        method: 'GET'
      }).done(function(data){
        self.user = data.result.user;
        self.template = _.template(subscribeViewTemplate);
        self.render();
        self.$el.modal({ backdrop: 'static' });
      });
    }
  });

  return SubscribeView;
});