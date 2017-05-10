define([
  'jquery',
  'backbone',
  'models/genericModel',
  'views/createCompanyView',
  'views/createLocationView',
  'views/createRewardView',
  'views/subscribeView',
  'bootstrap'
], function($, Backbone, GenericModel, CreateCompanyView, CreateLocationView, CreateRewardView, SubscribeView){
  var CompanyView = Backbone.View.extend({
    el: '#main',
    childView: null,
    events: {
      'click .create-company': 'onboardingFlow',
      'click .create-location': 'createLocation',
      'click .create-reward': 'createReward',
      'click .edit-location': 'editLocation',
      'click .edit-reward': 'editReward',
      'click .subscribe': 'subscribeOrRefresh'
    },
    triggerSubView: function(options) { 
      var properties,
          model;

      if (options.id === 'new') {
        properties = options.cid ? { companyId: options.cid } : {};
        model = new options.model(properties);
        model.urlRoot = options.urlRoot;
      }
      else {
        model = new options.model({ _id: options.id });
        model.urlRoot = options.urlRoot;
        model.fetch();
      }

      this.childView = new options.view({ model: model });
      this.$el.append(this.childView.$el);


      model.on('sync', function(){ window.locationModel = model; });
      model.on('error', this.showError);
      model.on('sync', $.proxy(this.childView.render, this.childView));
    },
    createCompany: function() {
      var options = {
        urlRoot: '/api/companies',
        id: 'new',
        model: GenericModel,
        view: CreateCompanyView
      };

      this.triggerSubView(options);
    },
    createLocation: function() {
      var options = {
        urlRoot: '/api/companies/' + this.companyId + '/locations',
        id: 'new',
        model: GenericModel,
        view: CreateLocationView,
        cid: this.companyId
      };

      this.triggerSubView(options);
      this.childView.on('saveSuccess', $.proxy(this.locationCallback, this));
    },
    createReward: function() {
      var options = {
        urlRoot: '/api/companies/' + this.companyId + '/rewards',
        id: 'new',
        model: GenericModel,
        view: CreateRewardView,
        cid: this.companyId
      };

      this.triggerSubView(options);
      this.childView.on('saveSuccess', $.proxy(this.rewardCallback, this));
    },
    editLocation: function(e) {
      e.preventDefault();
      var id = $(e.currentTarget).data('location-id');
      var options = {
        urlRoot: '/api/locations',
        id: id,
        model: GenericModel,
        view: CreateLocationView
      };

      this.triggerSubView(options);
      this.childView.on('saveSuccess', $.proxy(this.locationCallback, this));
    },
    editReward: function(e) {
      e.preventDefault();
      var id = $(e.currentTarget).data('reward-id');
      var options = {
        urlRoot: '/api/rewards',
        id: id,
        model: GenericModel,
        view: CreateRewardView
      };

      this.triggerSubView(options);
      this.childView.on('saveSuccess', $.proxy(this.rewardCallback, this));
    },
    launchSubscription: function(e) {
      if (e && typeof e.preventDefault !== 'undefined')
        e.preventDefault();
      this.childView = new SubscribeView({ companyId: this.companyId, stripeKey: this.stripeKey });
      this.$el.append(this.childView.$el);
    },
    subscribeOrRefresh: function() {
      var self = this;
      $.ajax({
        url: '/api/subscription/' + this.companyId,
        method: 'GET'
      }).done(function(data){
        if (data.result.subscription)
          self.refreshPage();
        else
          self.launchSubscription();
      });
    },
    locationCallback: function(options) {
      var self = this;

      if (!options.nextStep){
        this.subscribeOrRefresh();
        return;
      }

      var location = options.model;

      var rewardCallback = function(options) {
        var rewardId = options.model.get('id');
        location.set('reward_id', rewardId);
        location.on('sync', $.proxy(self.subscribeOrRefresh, self));
        location.save();
      };

      if (options.nextStep === 'reward') {
        this.createReward();
        this.childView.off('saveSuccess');
        this.childView.on('saveSuccess', rewardCallback);
      }
    },
    rewardCallback: function(options) {
      this.subscribeOrRefresh();
    },
    refreshPage: function() {
      window.location.reload();
    },
    onboardingFlow: function() {
      var self = this;

      var companyCallback = function(options) {
        self.companyId = options.model.id;
        self.createLocation();
      };

      this.createCompany();
      this.childView.on('saveSuccess', companyCallback);
    },
    render: function() {
      return this;
    },
    initialize: function() {
      this.companyId = this.$el.data('company-id');
      this.stripeKey = this.$el.data('stripe-pk');
    }
  });

  return CompanyView;
});