import Ember from 'ember';
import Autolinker from 'autolinker';

export function linkify(text, options) {
  return Autolinker.link(text, options);
}

export default Ember.Helper.helper(function ([text], options) { return linkify(text, options); });
