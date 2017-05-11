define([
  'jquery',
  'underscore',
  'backbone',
  'views/dashboardView',
  'bootstrap'
], function($, _, Backbone, DashboardView){
  var LoylAdmin = {
    initialize: function() {
      window.app = this;
      this.view = new DashboardView();
    }
  };

  return LoylAdmin;
});