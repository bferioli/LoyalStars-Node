define([
    'jquery',
    'backbone'
], function($, Backbone){
  var GenericModel = Backbone.Model.extend({
    idAttribute: '_id',
    initialize: function(options){
      _.extend(this, _.pick(options, 'url', 'urlRoot'));
    } 
  });

  return GenericModel;
});