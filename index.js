'use strict'

var strip = require('strip-lines')
var nextLine = require('next-line')

// RFC-2068 Start-Line definitions:
//   Request-Line: Method SP Request-URI SP HTTP-Version CRLF
//   Status-Line:  HTTP-Version SP Status-Code SP Reason-Phrase CRLF
var startLine = /^[A-Z_]+(\/\d\.\d)? /

module.exports = function (str) {
  return parse(normalize(str))
}

function normalize (str) {
  if (str && str._header) str = str._header // extra headers from http.ServerResponse object
  if (!str || typeof str.toString !== 'function') return ''
  str = str.toString().trim()
  if (startLine.test(str)) str = strip(str, 1)
  return str
}

function parse (str) {
  var headers = {}
  var next = nextLine(str)
  var line = next()
  var index, name, value

  while (line) {
    // subsequent lines in multi-line headers start with whitespace
    if (line[0] === ' ' || line[0] === '\t') {
      value += ' ' + line.trim()
      line = next()
      continue
    }

    if (name) addMessageHeader()

    index = line.indexOf(':')
    name = line.substr(0, index)
    value = line.substr(index + 1).trim()

    line = next()
  }

  if (name) addMessageHeader()

  return headers

  function addMessageHeader () {
    name = name.toLowerCase()
    if (name in headers) headers[name] += ', ' + value
    else headers[name] = value
  }
}
