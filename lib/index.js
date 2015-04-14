/* istanbul ignore next */
var DOMURL = window.URL || window.webkitURL || window

/**
 * Get an image's width and height
 * @param {(File|blob|string)} File, blob, or URL string
 * @returns {Promise} resolved with object containing image width and height
 */
module.exports = function browserImageSize (image) {
  return new Promise(function (resolve, reject) {
    var url = typeof image === 'string' ? image : DOMURL.createObjectURL(image)
    if (!url) throw new Error('Must use a valid image')

    var img = document.createElement('img')
    img.onload = function onload () {
      if (typeof image !== 'string')
        DOMURL.revokeObjectURL(url)
      resolve({width: img.width, height: img.height})
    }

    img.onerror = function onerror (err) {
      if (typeof image !== 'string')
        DOMURL.revokeObjectURL(url)
      reject(err)
    }

    img.src = url
  })
}
