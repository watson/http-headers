'use strict'

var nl = /\r\n|\n|\r/

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

function parse (lines) {
  var result = {}
  var line, index, name, value
  for (var n = 0, l = lines.length; n < l; n++) {
    line = lines[n]
    if (line === '') break // an empty line indicates end of header section
    if (line[0] === ' ' || line[0] === '\t') {
      value += ' ' + line.trim()
    } else {
      if (n) addField(result, name, value)
      index = line.indexOf(':')
      name = line.substr(0, index)
      value = line.substr(index + 1).trim()
    }
  }
  if (n) addField(result, name, value)
  return result
}

function addField (headers, name, value) {
  name = name.toLowerCase()
  if (name in headers) headers[name] += ', ' + value
  else headers[name] = value
}
