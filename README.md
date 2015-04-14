# Browser image size

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]

[![Sauce Test Status][sauce-image]][sauce-url]

## Installation

```sh
$ npm install browser-image-size
```

To use browser-image-size you must polyfill [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

## Usage

```js
var browserImageSize = require('browser-image-size')

browserImageSize('128.png')
.then(function (size) {
  console.log(size)
  // => {height: 128, width: 128}
})
```

## API

### browserImageSize(image)

**Parameters:**

* image : {(File|blob|string)} File, blob, or URL string

**Returns:**

* BrowserImageSizePromise : {Promise} resolved with object containing image width and height

## Tests

```sh
$ npm test -- --local
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/browser-image-size.svg?style=flat-square
[npm-url]: https://npmjs.org/package/browser-image-size
[travis-image]: https://img.shields.io/travis/cesarandreu/browser-image-size/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/cesarandreu/browser-image-size
[sauce-image]: https://saucelabs.com/browser-matrix/browser-image-size.svg
[sauce-url]: https://saucelabs.com/u/browser-image-size
