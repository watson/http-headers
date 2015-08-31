'use strict'

var test = require('tape')
var http = require('http')
var httpHeaders = require('./')

var requestLine = 'GET /foo HTTP/1.1\r\n'
var statusLine = 'HTTP/1.1 200 OK\r\n'
var msgHeaders = 'Date: Tue, 10 Jun 2014 07:29:20 GMT\r\n' +
  'Connection: keep-alive\r\n' +
  'Transfer-Encoding: chunked\r\n' +
  'X-List: A\r\n' +
  'X-Multi-Line-Header: Foo\r\n' +
  ' Bar\r\n' +
  'X-List: B\r\n' +
  '\r\n'
var requestMsg = requestLine + msgHeaders + 'Hello: World'
var responseMsg = statusLine + msgHeaders + 'Hello: World'

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

test('empty buffer', function (t) {
  t.deepEqual(httpHeaders(new Buffer('')), {})
  t.end()
})

test('start-line + header', function (t) {
  t.deepEqual(httpHeaders(requestLine + msgHeaders), result)
  t.deepEqual(httpHeaders(statusLine + msgHeaders), result)
  t.deepEqual(httpHeaders(new Buffer(requestLine + msgHeaders)), result)
  t.deepEqual(httpHeaders(new Buffer(statusLine + msgHeaders)), result)
  t.end()
})

test('headers only', function (t) {
  t.deepEqual(httpHeaders(msgHeaders), result)
  t.deepEqual(httpHeaders(new Buffer(msgHeaders)), result)
  t.end()
})

test('full http response', function (t) {
  t.deepEqual(httpHeaders(requestMsg), result)
  t.deepEqual(httpHeaders(responseMsg), result)
  t.deepEqual(httpHeaders(new Buffer(requestMsg)), result)
  t.deepEqual(httpHeaders(new Buffer(responseMsg)), result)
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
    t.deepEqual(httpHeaders({ _header: statusLine + msgHeaders }), result)
    t.end()
  })
})
