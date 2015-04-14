// ES6 Promise polyfill
global.Promise = global.Promise || require('promise-polyfill')

// canvas.toBlob polyfill
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
    urlTest(t, images[i][0], images[i][1])
})

test('Blobs', function (t) {
  t.timeoutAfter(5000)
  t.plan(images.length)

  for (var i = 0; i < images.length; i++)
    blobTest(t, images[i][0], images[i][1])
})

test('Failure', function (t) {
  t.timeoutAfter(5000)
  t.plan(2)

  browserImageSize('test/fixtures')
  .catch(function () {
    t.pass('fail with invalid path input')
  })

  browserImageSize({})
  .catch(function () {
    t.pass('fail with object input')
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

function urlTest (t, name, number) {
  baseTest(t, name, name, number)
}

function blobTest (t, name, number) {
  getBlobFromImageUrl(name)
  .then(function (blob) {
    baseTest(t, name, blob, number)
  })
  .catch(t.fail)
}

// Helper
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
