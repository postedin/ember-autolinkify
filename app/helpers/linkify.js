import { linkify } from 'ember-autolinkify/helpers/linkify';
import config from '../config/environment';
import { htmlSafe } from '@ember/string';

export function configuredLinkify(text, options) {
  let mergedOptions = {};
  Ember.assign(mergedOptions, config.APP ? config.APP.linkify : {}, options);

  return linkify(text, mergedOptions);
}

export default Ember.Helper.helper(function ([text], options) { return htmlSafe(configuredLinkify(text, options)); });
