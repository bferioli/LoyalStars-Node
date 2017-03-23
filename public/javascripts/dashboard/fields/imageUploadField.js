define([
    'jquery'
  ], function($){
  var ImageUploadField = function($el, model) {

    this.fileSelect = function(e) {
      var formData = new FormData();
      formData.append('file', e.currentTarget.files[0]); 
      $.ajax({
        url: '/api/2/image',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: $.proxy(this.fileUploadSuccess, this)
      });
    };

    this.fileUploadSuccess = function(data) {
      this.$hidden.val(data.result.s3_key);
      this.$preview.attr('src', data.result.href);
      this.model.set(this.$hidden.attr('name'), data.result.s3_key);
    };

    this.$el = $el;
    this.model = model;
    this.$field = $el.find('input[type="file"]');
    this.$hidden = $el.find('input[type="hidden"]');
    this.$preview = $el.find('img');
    this.$field.on('change', $.proxy(this.fileSelect, this));

    return this;
  };

  return ImageUploadField;
});