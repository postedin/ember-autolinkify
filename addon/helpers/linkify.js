import { helper as buildHelper } from '@ember/component/helper';
import Autolinker from 'autolinker';
import { htmlSafe } from '@ember/string';

export function linkify(text, options) {
  return Autolinker.link(text, options);
}

export default buildHelper(function ([text], options) {
  return linkify(text, options);
});
