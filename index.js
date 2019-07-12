'use strict';
var path = require('path');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var resolve = require('resolve');

module.exports = {
  name: require('./package').name,

  included: function(app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this.app = app;

    this.import('vendor/autolinker/Autolinker.min.js');
    this.import('vendor/shims/autolinker.js');
  },

  treeForVendor(tree) {
    let autolinkerPath = resolve.sync('autolinker', { basedir: this.app.project.root });

    let copiedTree = new Funnel(autolinkerPath.replace('/Autolinker.js', ''), {
      destDir: 'autolinker',
      files: ['Autolinker.min.js']
    });

    return mergeTrees([tree, copiedTree]);
  },
};
