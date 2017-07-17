define([
  'jquery',
  'backbone',
  'models/genericModel',
  'fields/textField',
  'fields/selectField',
  'fields/imageUploadField',
  'text!templates/createLocationViewTemplate.html',
  'inputmask',
  'geocoder'
], function($, Backbone, GenericModel, TextField, SelectField, ImageUploadField, createLocationViewTemplate){
  var CreateLocationView = Backbone.View.extend({
    className: 'modal fade',
    events: {
      'click .admin-prev': 'prevSection',
      'click .admin-next': 'nextSection',
      'click .admin-submit': 'saveModel',
      'click .geo-by-address': 'geoByAddress',
      'click .geo-by-current': 'geoByCurrent',
      'change .geo-toggle': 'toggleGeoFields',
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

          var opts = { model: model, response: response, options: options },
              reward = self.$el.find('.reward-select').val();

          if (!reward.length) {
            opts.nextStep = 'reward';
          }

          self.trigger('saveSuccess', opts);
        }
      });
    },
    validateForm: function() {
      var $footer = this.$el.find('.modal-footer'),
          $requiredFields = this.$fields.find('[required]'),
          missingFields = [],
          errorMsg;

      if (this.checkinCodeTaken) {
        errorMsg = 'The checkin code you entered is already taken.';
        $footer.find('.error').remove();
        $footer.prepend('<span class="error">' + errorMsg + '</span>');
        return false;
      }

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
    geoByAddress: function() {
      var geocoder = new google.maps.Geocoder(),
          address = this.$el.find('input[name="address"]').val(),
          city = this.$el.find('input[name="city"]').val(),
          state = this.$el.find('select[name="state"]').val(),
          zip = this.$el.find('input[name="zip"]').val(),
          address_full = address + ', ' + city + ' ' + state + ' ' + zip;

      var successCallback = function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();
          this.$el.find('input[name="latitude"]').val(latitude);
          this.$el.find('input[name="longitude"]').val(longitude);
          this.model.set('latitude', latitude);
          this.model.set('longitude', longitude);
        } 
      };

      geocoder.geocode( { 'address': address_full }, $.proxy(successCallback, this) ); 
    },
    geoByCurrent: function() {
      if ("geolocation" in navigator) {
        var errorCallbackHighAccuracy = function() {
          navigator.geolocation.getCurrentPosition(
            $.proxy(successCallback, this),
            $.proxy(errorCallbackLowAccuracy, this),
            { maximumAge: 600000, timeout: 2000, enableHighAccuracy: false }
          );
        };

        var errorCallbackLowAccuracy = function(position) {
          // Can't get location
        };

        var successCallback = function(position) {
          this.$el.find('input[name="latitude"]').val(position.coords.latitude);
          this.$el.find('input[name="longitude"]').val(position.coords.longitude);
          this.model.set('latitude', position.coords.latitude);
          this.model.set('longitude', position.coords.longitude);
        };

        navigator.geolocation.getCurrentPosition(
          $.proxy(successCallback, this),
          $.proxy(errorCallbackHighAccuracy, this),
          { maximumAge: 600000, timeout: 3000, enableHighAccuracy: true }
        );
      }
      else {
        // Can't get location
      }
    },
    toggleGeoFields: function() {
      var $fields = this.$el.find('.geo-toggle'),
          $geoRows = this.$el.find('.geo-row'),
          selected = $fields.filter(':checked').val(),
          enabled = ( selected === 'y' );

      if (enabled) {
        $geoRows.removeClass('hidden');
        var currentLat = this.$el.find('input[name="latitude"]').val(),
            currentLon = this.$el.find('input[name="longitude"]').val();

        if ( currentLat === 0 || currentLon === 0 ) {
          this.geoByAddress();
        }
      }
      else {
        $geoRows.addClass('hidden');
        this.$el.find('input[name="latitude"]').val(0);
        this.$el.find('input[name="longitude"]').val(0);
        this.model.set('latitude', 0);
        this.model.set('longitude', 0);
      }
    },
    initializeField: function(i, field) {
      var $field = $(field),
          type = $field.data('type');

      switch(type) {
        case 'text':
          new TextField($field, this.model);
          break;
        case 'select':
          new SelectField($field, this.model);
          break;
        case 'image':
          new ImageUploadField($field, this.model);
          break;
      }
    },
    initializeLocationFields: function() {
      var self = this,
          $checkinCode = this.$el.find('input[name="checkinCode"]'),
          $checkinCodeParent = $checkinCode.parent(),
          $zip = this.$el.find('input[name="zip"]');

      $checkinCode.on('keyup', function(){
        var checkinCodeMasked = $checkinCode.val().toUpperCase().replace(/[^A-Z0-9]/ig,'');
        $checkinCode.val(checkinCodeMasked);
        $checkinCode.trigger('change');
        $.ajax({
          url: '/api/locations/checkin-code/' + checkinCodeMasked,
          method: 'GET'
        }).done(function(data){
          $checkinCodeParent.find('.error').remove();
          self.checkinCodeTaken = ( !data || !data.available );
          if (self.checkinCodeTaken)
            $checkinCodeParent.append('<span class="error">This checkin code is already taken.</span>');
        });
      });

      $zip.inputmask({ mask: '99999', placeholder: '' });
    },
    initializeGeoFields: function() {
      var latitude = this.model.get('latitude'),
          longitude = this.model.get('longitude');

      if ( latitude && longitude ) {
        this.$el.find('.geo-toggle[value="y"]').prop('checked', true);
      }
      else if ( latitude === 0 && longitude === 0 ) {
        this.$el.find('.geo-toggle[value="n"]').prop('checked', true);
      }

      this.toggleGeoFields();
    },
    prevSection: function() {
      var $sections = this.$el.find('tbody'),
          $active = $sections.filter(':not(.hidden)'),
          $prev = $active.prev('tbody'),
          first = ($sections.index($prev) === 0);

      $active.addClass('hidden');
      $prev.removeClass('hidden');

      this.$el.find('.admin-next').removeClass('hidden');
      this.$el.find('.admin-submit').addClass('hidden');

      if (first) {
        this.$el.find('.admin-prev').addClass('hidden');
      }
    },
    nextSection: function() {
      var $sections = this.$el.find('tbody'),
          $active = $sections.filter(':not(.hidden)'),
          $next = $active.next('tbody'),
          last = ($sections.index($next) === $sections.length - 1);

      $active.addClass('hidden');
      $next.removeClass('hidden');

      this.$el.find('.admin-prev').removeClass('hidden');

      if (last) {
        this.$el.find('.admin-next').addClass('hidden');
        this.$el.find('.admin-submit').removeClass('hidden');
      }
    },
    render: function() {
      var html = this.template({ model: this.model.toJSON(), s3_base: this.model.s3_base });
      this.$el.empty();
      this.$el.append(html);

      this.$fields = this.$el.find('.admin-field');
      this.$fields.each($.proxy(this.initializeField, this));

      this.initializeLocationFields();
      this.initializeGeoFields();

      var rewardsListTemplate = $('#companyRewardsListTemplate');

      if (rewardsListTemplate.length) {
        var rewardsList = _.template(rewardsListTemplate.html())({ model: this.model.toJSON() }),
            $rewardSelect = this.$el.find('.reward-select'),
            currentReward = this.model.get('reward');
        $rewardSelect.append(rewardsList);

        if (currentReward) {
          $rewardSelect.find('option[value="' + currentReward._id + '"]').prop('selected', true);
        }
      }
    },
    initialize: function() {
      this.template = _.template(createLocationViewTemplate);
      this.render();
      this.$el.modal({ backdrop: 'static' });
    }
  });

  return CreateLocationView;
});