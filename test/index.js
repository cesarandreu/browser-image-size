// ES6 Promise polyfill
/* istanbul ignore next */
global.Promise = global.Promise || require('promise-polyfill')

// canvas.toBlob polyfill
/* istanbul ignore next */
require('./vendor/canvas-to-blob')

var browserImageSize = require('../lib')
var test = require('tape')
var images = [
  ['test/fixtures/32.gif', 32],
  ['test/fixtures/64.jpg', 64],
  ['test/fixtures/128.png', 128]
]

test('URLs', function (t) {
  t.timeoutAfter(5000)
  t.plan(images.length)

  for (var i = 0; i < images.length; i++)
    urlTest(images[i][0], images[i][1])

  function urlTest (name, number) {
    baseTest(t, name, name, number)
  }
})

test('Blobs', function (t) {
  t.timeoutAfter(5000)
  t.plan(images.length)

  for (var i = 0; i < images.length; i++)
    blobTest(images[i][0], images[i][1])

  function blobTest (name, number) {
    getBlobFromImageUrl(name)
    .then(function (blob) {
      baseTest(t, name, blob, number)
    })
    .catch(t.fail)
  }
})

test('Failure', function (t) {
  t.timeoutAfter(5000)
  t.plan(4)

  browserImageSize('')
  .catch(function () {
    t.pass('fail with empty path input')
  })

  browserImageSize('test/fixtures')
  .catch(function () {
    t.pass('fail with invalid path input')
  })

  browserImageSize({})
  .catch(function () {
    t.pass('fail with object input')
  })

  getBlobFromImageUrl(images[0][0])
  .then(function (blob) {
    return browserImageSize(blob.slice(0, 1))
  })
  .catch(function () {
    t.pass('fail with invalid blob')
  })
})

// t = tape
// name = file path
// input = browserImageSize input
// number = resulting height and width
function baseTest (t, name, input, number) {
  t.test(name, innerTest)
  function innerTest (st) {
    st.plan(3)
    browserImageSize(input)
    .then(function (size) {
      st.equal(typeof size, 'object', 'resolves promise with size object')
      st.equal(size.height, number, 'has height of ' + number)
      st.equal(size.width, number, 'has width of ' + number)
    })
    .catch(st.fail)
  }
}

// Helper
// Given a url, return a blob
function getBlobFromImageUrl (url) {
  return new Promise(function (resolve, reject) {
    var img = document.createElement('img')
    img.onload = function onload () {
      var canvas = document.createElement('canvas')
      canvas.height = img.height
      canvas.width = img.width
      canvas.getContext('2d').drawImage(img, 0, 0)
      canvas.toBlob(resolve, 'image/' + name.split('.').reverse().unshift())
    }
    img.onerror = reject
    img.src = url
  })
}
