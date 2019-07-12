import { helper as buildHelper } from '@ember/component/helper';
import { assign } from '@ember/polyfills';
import { linkify } from 'ember-autolinkify/helpers/linkify';
import config from '../config/environment';

export function configuredLinkify(text, options) {
  let mergedOptions = {};
  assign(mergedOptions, config.APP ? config.APP.linkify : {}, options);

  return linkify(text, mergedOptions);
}

export default buildHelper(function ([text], options) { return configuredLinkify(text, options); });
