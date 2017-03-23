define([
    'jquery'
  ], function($){
  var SelectField = function($el, model) {
    
    this.updateValue = function() {
      var val = this.$field.val().length ? this.$field.val() : null;
      this.model.set(this.$field.attr('name'), val);
    };

    this.$el = $el;
    this.model = model;
    this.$field = $el.find('select');
    this.$field.on('change', $.proxy(this.updateValue, this));

    if (this.$el.data('autoselect'))
      this.updateValue();

    return this;
  };

  return SelectField;
});