require.config({
  waitSeconds: 200,
  urlArgs: 'bust=v7',
  paths: {
    'underscore': 'libs/underscore.min',
    'backbone': 'libs/backbone.min',
    'bootstrap': 'libs/bootstrap.min',
    'material': 'libs/material.min',
    'ripples': 'libs/ripples.min',
    'jquery': 'libs/jquery.min',
    'datetimepicker': 'libs/jquery.datetimepicker',
    'inputmask': 'libs/jquery.inputmask.min',
    'geocoder': '//maps.google.com/maps/api/js?key=AIzaSyB2YpgTeYK2DJx8ff1KJrCHWE7Ki4GPl4E',
    'text': 'libs/text'
  },
  shim: {
    'backbone': ['underscore'],
    'bootstrap': ['jquery'],
    'material': ['jquery'],
    'ripples': ['jquery'],
    'datetimepicker': ['jquery'],
    'inputmask': ['jquery']
  }
});

require(['app'], function(App){
  App.initialize();

  var module = $('script[src$="require.js"]').data('module');
  if (module) {
    require([module], function(Module){
      Module.initialize();
    });
  }
});