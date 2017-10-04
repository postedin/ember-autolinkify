
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import config from '../../../config/environment';

let originalConfig;

moduleForComponent('linkify', 'helper:linkify', {
  integration: true,
  setup: function() {
    originalConfig = config.APP.linkify;
  },

  teardown: function() {
    config.APP.linkify = originalConfig;
  }
});

test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{{linkify inputValue}}}`);

  assert.equal(this.$().text().trim(), '1234');
});

test('links plain text with defaults', function(assert) {
  assert.expect(1);

  this.set('text', 'Some plain text with https://google.com/ link.');
  this.render(hbs `{{{linkify text}}}`);
  assert.deepEqual(this.$().html(), 'Some plain text with <a href="https://google.com/" target="_blank" rel="noopener noreferrer">google.com</a> link.');
});

test('links plain text with defaults but not already created links', function(assert) {
  assert.expect(1);

  this.set('text', 'Some plain text with https://google.com/ link. <a href="https://yahoo.com">https://noreally.com</a>');
  this.render(hbs `{{{linkify text}}}`);
  assert.deepEqual(this.$().html(), 'Some plain text with <a href="https://google.com/" target="_blank" rel="noopener noreferrer">google.com</a> link. <a href="https://yahoo.com">https://noreally.com</a>');
});

test('links plain text with options', function(assert) {
  assert.expect(1);

  this.set('text', 'Some plain text with https://google.com/ link.');
  this.render(hbs `{{{linkify text newWindow=false stripTrailingSlash=false}}}`);
  assert.deepEqual(this.$().html(), 'Some plain text with <a href="https://google.com/">google.com/</a> link.');
});

test('app with overriden config', function(assert) {
  assert.expect(1);

  config.APP.linkify = {
    newWindow: false,
    stripTrailingSlash: false,
  };

  this.set('text', 'Some plain text with https://google.com/ link.');
  this.render(hbs `{{{linkify text}}}`);
  assert.deepEqual(this.$().html(), 'Some plain text with <a href="https://google.com/">google.com/</a> link.');
});

test('helper options override app options', function(assert) {
  assert.expect(1);

  config.APP.linkify = {
    newWindow: false,
    stripTrailingSlash: false,
    stripPrefix: false,
  };

  this.set('text', 'Some plain text with https://google.com/ link.');
  this.render(hbs `{{{linkify text stripPrefix=true newWindow=true}}}`);
  assert.deepEqual(this.$().html(), 'Some plain text with <a href="https://google.com/" target="_blank" rel="noopener noreferrer">google.com/</a> link.');
});
