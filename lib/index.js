/**
 * Get an image's width and height
 * @param {(File|blob|string)} File, blob, or URL string
 * @returns {Promise} resolved with object containing image width and height
 */
module.exports = function browserImageSize (image) {
  /* istanbul ignore next */
  var DOMURL = require('object-url')

  return new Promise(function (resolve, reject) {
    var url = typeof image === 'string' ? image : DOMURL.create(image)
    if (!url) throw new Error('Must use a valid image')

    var img = document.createElement('img')
    img.onload = function onload () {
      if (typeof image !== 'string')
        DOMURL.revoke(url)
      resolve({width: img.width, height: img.height})
    }

    img.onerror = function onerror (err) {
      if (typeof image !== 'string')
        DOMURL.revoke(url)
      reject(err)
    }

    img.src = url
  })
}
