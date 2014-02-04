
# co-sse

  [Server-Sent Events](http://www.html5rocks.com/en/tutorials/eventsource/basics/)
  generator stream.
  
  [![build status](https://secure.travis-ci.org/juliangruber/co-sse.png)](http://travis-ci.org/juliangruber/co-sse)

## Example

  Create a sse stream from a function:

```js
var sse = require('co-sse');
var wait = require('co-wait');
var co = require('co');

co(function*(){
  var read = sse(function*(){
    yield wait(1000);
    return Date.now() + '';
  });

  var data;
  while (data = yield read) console.log(data);
})();

```

Outputs:

```bash
$ make example
data: 1391517447428


data: 1391517448462


data: 1391517449464


data: 1391517450466


data: 1391517451467


```

## Installation

```bash
$ npm install co-sse
```

## API

### sse(fn[, opts])

  Create a generator function that reads and converts data from `fn` into
  the [Server-Sent Events](http://www.html5rocks.com/en/tutorials/eventsource/basics/)
  format.
  
  Options:
  
  - retry: Set the retry interval

## License

  MIT

