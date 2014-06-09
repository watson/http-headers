# http-headers

[![Build Status](https://travis-ci.org/watson/http-headers.png)](https://travis-ci.org/watson/http-headers)

HTTP header string parser.

Converts:

```
HTTP/1.1 200 OK
Date: Tue, 10 Jun 2014 07:19:27 GMT
Connection: keep-alive
Transfer-Encoding: chunked

```

To this:

```javascript
{ date: 'Tue, 10 Jun 2014 07:19:27 GMT',
  connection: 'keep-alive',
  'transfer-encoding': 'chunked' }
```

## Why?

If you've ever needed to log or in another way access the headers sent
to the client on a `http.ServerResponse` in Node.js, you know it's not
as easy as with the `http.IncomingMessage` headers (which you just
access via `request.headers['content-type']`).

Response headers are not directly available on the `response` object.
Instead all headers are preprocessed as a string on the private
`response._header` property and needs to be processed in order to be
available as an object.

This module makes the task super simple.

## Installation

```
npm install http-headers
```

## Usage

```javascript
var httpHeaders = require('http-headers');

http.createServer(function (req, res) {
  res.end('Hello World');
  console.log('The headers sent to the client was:', httpHeaders(res));
});
```

## License

MIT
