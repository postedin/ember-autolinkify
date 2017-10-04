import { linkify } from 'ember-autolinkify/helpers/linkify';
import config from '../config/environment';

export function configuredLinkify(text, options) {
  let mergedOptions = {};
  Ember.assign(mergedOptions, config.APP.linkify, options);

  return linkify(text, mergedOptions);
}

export default Ember.Helper.helper(function ([text], options) { return configuredLinkify(text, options); });
