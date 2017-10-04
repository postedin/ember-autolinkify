/* eslint-env node */
'use strict';
var path = require('path');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-autolinkify',

  included: function(app) {
    this._super.included.apply(this, arguments);

    this.import('vendor/autolinker/Autolinker.min.js');
    this.import('vendor/shims/autolinker.js');
  },

  treeForVendor(tree) {
    let autolinkerPath = path.join(this.app.project.nodeModulesPath, 'autolinker/dist');

    let copiedTree = new Funnel(autolinkerPath, {
      destDir: 'autolinker',
      files: ['Autolinker.min.js']
    });

    return mergeTrees([tree, copiedTree]);
  },
};
