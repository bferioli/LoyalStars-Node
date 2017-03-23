define([
    'jquery'
  ], function($){
  var TextField = function($el, model) {

    this.updateValue = function() {
      this.model.set(this.$field.attr('name'), this.$field.val());
    };
      
    this.$el = $el;
    this.model = model;
    this.$field = $el.find('input[type="text"]');
    this.$field.on('change', $.proxy(this.updateValue, this));

    return this;
  };

  return TextField;
});