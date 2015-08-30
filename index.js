'use strict'

var nl = /\r?\n/

module.exports = function (str) {
  str = normalize(str)

  // remove leading start-line (e.g. HTTP/1.1 200 OK)
  var lines = str.split(nl)
  if (!~lines[0].indexOf(':')) lines = lines.slice(1)

  return parse(lines)
}

function normalize (str) {
  if (str && str._header) str = str._header // extra headers from http.ServerResponse object
  if (!str || typeof str.toString !== 'function') return ''
  return str.toString().trim()
}

function parse (headers) {
  var result = {}
  headers.forEach(function (header) {
    var index = header.indexOf(':')
    result[header.substr(0, index).toLowerCase()] = header.substr(index + 1).trim()
  })
  return result
}
