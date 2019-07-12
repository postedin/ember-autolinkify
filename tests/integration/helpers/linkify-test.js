
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import config from '../../../config/environment';

let originalConfig;

module('helper:linkify', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.setup = function() {
      originalConfig = config.APP.linkify;
    };

    this.teardown = function() {
      config.APP.linkify = originalConfig;
    };
  });

  test('it renders', async function(assert) {
    this.set('inputValue', '1234');

    await render(hbs`{{{linkify inputValue}}}`);

    assert.dom('*').hasText('1234');
  });

  test('links plain text with defaults', async function(assert) {
    assert.expect(1);

    this.set('text', 'Some plain text with https://google.com/ link.');
    await render(hbs `{{{linkify text}}}`);
    assert.deepEqual(find('*').innerHTML, 'Some plain text with <a href="https://google.com/" target="_blank" rel="noopener noreferrer">google.com</a> link.');
  });

  test('links plain text with defaults but not already created links', async function(assert) {
    assert.expect(1);

    this.set('text', 'Some plain text with https://google.com/ link. <a href="https://yahoo.com">https://noreally.com</a>');
    await render(hbs `{{{linkify text}}}`);
    assert.deepEqual(find('*').innerHTML, 'Some plain text with <a href="https://google.com/" target="_blank" rel="noopener noreferrer">google.com</a> link. <a href="https://yahoo.com">https://noreally.com</a>');
  });

  test('links plain text with options', async function(assert) {
    assert.expect(1);

    this.set('text', 'Some plain text with https://google.com/ link.');
    await render(hbs `{{{linkify text newWindow=false stripTrailingSlash=false}}}`);
    assert.deepEqual(find('*').innerHTML, 'Some plain text with <a href="https://google.com/">google.com/</a> link.');
  });

  test('app with overriden config', async function(assert) {
    assert.expect(1);

    config.APP.linkify = {
      newWindow: false,
      stripTrailingSlash: false,
    };

    this.set('text', 'Some plain text with https://google.com/ link.');
    await render(hbs `{{{linkify text}}}`);
    assert.deepEqual(find('*').innerHTML, 'Some plain text with <a href="https://google.com/">google.com/</a> link.');
  });

  test('helper options override app options', async function(assert) {
    assert.expect(1);

    config.APP.linkify = {
      newWindow: false,
      stripTrailingSlash: false,
      stripPrefix: false,
    };

    this.set('text', 'Some plain text with https://google.com/ link.');
    await render(hbs `{{{linkify text stripPrefix=true newWindow=true}}}`);
    assert.deepEqual(find('*').innerHTML, 'Some plain text with <a href="https://google.com/" target="_blank" rel="noopener noreferrer">google.com/</a> link.');
  });
});
