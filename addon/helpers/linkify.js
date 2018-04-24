import Ember from 'ember';
import Autolinker from 'autolinker';
import { htmlSafe } from '@ember/string';

export function linkify(text, options) {
  return Autolinker.link(text, options);
}

export default Ember.Helper.helper(function ([text], options) { return htmlSafe(linkify(text, options)); });
