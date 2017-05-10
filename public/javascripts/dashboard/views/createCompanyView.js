define([
  'jquery',
  'backbone',
  'models/genericModel',
  'fields/textField',
  'fields/imageUploadField',
  'text!templates/createCompanyViewTemplate.html',
  'inputmask'
], function($, Backbone, GenericModel, TextField, ImageUploadField, createCompanyViewTemplate){
  var CreateCompanyView = Backbone.View.extend({
    className: 'modal fade',
    events: {
      'click .admin-submit': 'saveModel'
    },
    saveModel: function() {
      var self = this,
          valid = this.validateForm();

      if (!valid)
        return;
      
      this.trigger('loading');

      var saveCompany = function() {
        self.model.save({}, {
          success: function(model, response, options) {
            self.$el.modal('hide');
            self.trigger('saveSuccess', { model: model, response: response, options: options });
          }
        });
      };

      saveCompany();
    },
    validateForm: function() {
      var self = this,
          $footer = this.$el.find('.modal-footer'),
          $requiredFields = this.$fields.find('[required]'),
          missingFields = [],
          errorMsg;

      $requiredFields.each(function(i, field) {
        var $field = $(field),
            value = $field.val();

        if (value === '') {
          var label = $field.data('label') || $field.attr('name');
          missingFields.push(label);
        }
      });

      if (missingFields.length) {
        errorMsg = 'Please provide: ' + missingFields.join(', ');
        $footer.find('.error').remove();
        $footer.prepend('<span class="error">' + errorMsg + '</span>');
        return false;
      }

      return true;
    },
    populateSlug: function(e) {
      var $slugField = this.$fields.find('input[name="slug"]'),
          value = $(e.currentTarget).val().toLowerCase().replace(' ', '-').replace(/[^a-z-]/g,'');
      $slugField.val(value);
      $slugField.trigger('change');
    },
    render: function() {
      var html = this.template({ model: this.model.toJSON(), s3_base: this.model.s3_base });
      this.$el.empty();
      this.$el.append(html);
      this.$fields = this.$el.find('.admin-field');
      this.$fields.each($.proxy(this.initializeField, this));
      this.$fields.find('input[name="slug"]').inputmask('Regex', {
        regex: "[a-z-]*"
      });
      this.$fields.find('input[name="name"]').on('keyup', $.proxy(this.populateSlug, this));
    },
    initializeField: function(i, field) {
      var $field = $(field),
          type = $field.data('type');

      switch(type) {
        case 'text':
          new TextField($field, this.model);
          break;
        case 'image':
          new ImageUploadField($field, this.model);
          break;
      }
    },
    initialize: function(options) {
      this.template = _.template(createCompanyViewTemplate);
      this.render();
      this.$el.modal({ backdrop: 'static' });
    }
  });

  return CreateCompanyView;
});