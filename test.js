'use strict';

var assert = require('assert');
var http = require('http');
var httpHeaders = require('./index');

var hStr = 'HTTP/1.1 200 OK\r\nDate: Tue, 10 Jun 2014 07:29:20 GMT\r\nConnection: keep-alive\r\nTransfer-Encoding: chunked\r\n\r\n';
var hObj = {
  date: 'Tue, 10 Jun 2014 07:29:20 GMT',
  connection: 'keep-alive',
  'transfer-encoding': 'chunked'
};

assert.deepEqual(httpHeaders(), {});
assert.deepEqual(httpHeaders(''), {});
assert.deepEqual(httpHeaders({}), {});
assert.deepEqual(httpHeaders(new http.ServerResponse({})), {});
assert.deepEqual(httpHeaders({ _header: undefined }), {});
assert.deepEqual(httpHeaders({ _header: '' }), {});
assert.deepEqual(httpHeaders({ _header: hStr }), hObj);
assert.deepEqual(httpHeaders(hStr), hObj);
