'use strict';

var nl = /\r?\n/;

module.exports = function (headers) {
  if (typeof headers === 'object')
    headers = headers._header;

  var result = {};

  if (!headers) return result;

  headers.trim().split(nl).slice(1).forEach(function (header) {
    var index = header.indexOf(':');
    result[header.substr(0, index).toLowerCase()] = header.substr(index+1).trim();
  });

  return result;
};
