var sse = require('./');
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
