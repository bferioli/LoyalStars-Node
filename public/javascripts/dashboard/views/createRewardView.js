define([
  'jquery',
  'backbone',
  'models/genericModel',
  'fields/textField',
  'fields/imageUploadField',
  'text!templates/createRewardViewTemplate.html',
  'inputmask'
], function($, Backbone, GenericModel, TextField, ImageUploadField, createRewardViewTemplate){
  var CreateRewardView = Backbone.View.extend({
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
      this.model.save({}, {
        success: function(model, response, options) {
          var location = options.xhr.getResponseHeader('Location');

          if ( location && !model.get('id') ) {
            var id = location.substring( location.lastIndexOf('/') + 1 );
            self.model.set('id', id);
          }

          self.$el.modal('hide');
          self.trigger('saveSuccess', { model: model, response: response, options: options });
        }
      });
    },
    validateForm: function() {
      var self = this,
          $footer = this.$el.find('.modal-footer'),
          $requiredFields = this.$fields.find('[required]'),
          checkinsRequired = this.$fields.find('[name="checkins_required"]').val(),
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

      if ( parseInt(checkinsRequired) > 15 ) {
        errorMsg = 'Maximum of 15 checkins required to earn reward.';
        $footer.find('.error').remove();
        $footer.prepend('<span class="error">' + errorMsg + '</span>');
        return false;
      }

      return true;
    },
    render: function() {
      var html = this.template({ model: this.model.toJSON(), s3_base: this.model.s3_base });
      this.$el.empty();
      this.$el.append(html);
      this.$fields = this.$el.find('.admin-field');
      this.$fields.each($.proxy(this.initializeField, this));
      this.$fields.find('input[name="checkins_required"]').inputmask({ mask: '99', placeholder: '' });
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
    initialize: function() {
      this.template = _.template(createRewardViewTemplate);
      this.render();
      this.$el.modal({ backdrop: 'static' });
    }
  });

  return CreateRewardView;
});