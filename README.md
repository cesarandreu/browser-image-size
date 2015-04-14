# Browser image size

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
