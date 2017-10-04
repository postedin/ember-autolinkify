(function() {
  function vendorModule() {
    'use strict';

    return self['Autolinker'];
  }

  define('autolinker', [], vendorModule);
})()
