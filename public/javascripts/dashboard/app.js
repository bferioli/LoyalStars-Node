define([
  'jquery',
  'underscore',
  'backbone',
  'views/dashboardView',
  'bootstrap'
], function($, _, Backbone, DashboardView){
  var QuireAdmin = {
    initialize: function() {
      window.app = this;
      this.view = new DashboardView();
    }
  };

  return QuireAdmin;
});