# ember-autolinkify

This addon is a template helper for https://github.com/gregjacobs/Autolinker.js.

## Installation

* `ember install ember-autolinkify`

## Usage

```handlebars
  {{{linkify 'https://google.com'}}}
```
Will be: `<a href="https://google.com/" target="_blank" rel="noopener noreferrer">google.com</a>`

```handlebars
  {{{linkify 'https://google.com' newWindow=false}}}
```
Will be: `<a href="https://google.com/">google.com</a>`

*WARNING:* you need to use this helper with unsafe handlebars (`{{{htmlHereThatCanBeBad}}}`). It is recommended if this is being used for user inserted data that you use it alongside https://github.com/sivakumar-kailasam/ember-purify.

## Configuration

### Defaults and available options

https://github.com/gregjacobs/Autolinker.js#options

### Global configuration
```js
ENV.APP.linkify = {
  // Refer to various config options in the Autolinker.js README
};
```

### Helper options

You can pass any of the options into the helper.

```handlebars
  {{linkify 'https://google.com' newWindow=false}}
```
Will be: `<a href="https://google.com/">google.com</a>`

## Installation for Development

* `git clone https://github.com/postedin/ember-autolinkify.git`
* `cd ember-autolinkify`
* `yarn install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `yarn test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`
