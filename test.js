'use strict'

var test = require('tape')
var http = require('http')
var httpHeaders = require('./')

var startLineStr = 'HTTP/1.1 200 OK\r\n'
var headersStr = 'Date: Tue, 10 Jun 2014 07:29:20 GMT\r\n' +
  'Connection: keep-alive\r\n' +
  'Transfer-Encoding: chunked\r\n' +
  'X-List: A\r\n' +
  'X-Multi-Line-Header: Foo\r\n' +
  ' Bar\r\n' +
  'X-List: B\r\n' +
  '\r\n'
var fullResponseStr = startLineStr + headersStr + 'Hello: World'

var result = {
  date: 'Tue, 10 Jun 2014 07:29:20 GMT',
  connection: 'keep-alive',
  'transfer-encoding': 'chunked',
  'x-list': 'A, B',
  'x-multi-line-header': 'Foo Bar'
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

test('buffer', function (t) {
  t.deepEqual(httpHeaders(new Buffer(headersStr)), result)
  t.end()
})

test('start-line + header', function (t) {
  t.deepEqual(httpHeaders(startLineStr + headersStr), result)
  t.end()
})

test('headers only', function (t) {
  t.deepEqual(httpHeaders(headersStr), result)
  t.end()
})

test('full http response', function (t) {
  t.deepEqual(httpHeaders(fullResponseStr), result)
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
    t.deepEqual(httpHeaders({ _header: startLineStr + headersStr }), result)
    t.end()
  })
})
