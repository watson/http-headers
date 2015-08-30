'use strict'

var test = require('tape')
var http = require('http')
var httpHeaders = require('./')

var hStr = 'HTTP/1.1 200 OK\r\nDate: Tue, 10 Jun 2014 07:29:20 GMT\r\nConnection: keep-alive\r\nTransfer-Encoding: chunked\r\n\r\n'

var result = {
  date: 'Tue, 10 Jun 2014 07:29:20 GMT',
  connection: 'keep-alive',
  'transfer-encoding': 'chunked'
}

test('no argument', function (t) {
  t.deepEqual(httpHeaders(), {})
  t.end()
})

test('empty string', function (t) {
  t.deepEqual(httpHeaders(''), {})
  t.end()
})

test('empty object', function (t) {
  t.deepEqual(httpHeaders({}), {})
  t.end()
})

test('start-line + header', function (t) {
  t.deepEqual(httpHeaders(hStr), result)
  t.end()
})

test('http.ServerResponse', function (t) {
  t.test('real http.ServerResponse object', function (t) {
    var res = new http.ServerResponse({})
    t.deepEqual(httpHeaders(res), {})
    t.end()
  })

  t.test('no _header property', function (t) {
    t.deepEqual(httpHeaders({ _header: undefined }), {})
    t.end()
  })

  t.test('empty string as _header', function (t) {
    t.deepEqual(httpHeaders({ _header: '' }), {})
    t.end()
  })

  t.test('normal _header property', function (t) {
    t.deepEqual(httpHeaders({ _header: hStr }), result)
    t.end()
  })
})
