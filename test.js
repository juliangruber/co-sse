var sse = require('./');
var assert = require('assert');
var equal = assert.equal;
var co = require('co');

describe('sse(fn, opts)', function(){
  describe('data', function(){
    it('should add data: to strings', function(done){
      co(function*(){
        var i = 0;
        var stream = sse(function*(){
          return {
            0: 'hello',
            1: 'world'
          }[i++];
        });
        
        equal(yield stream, 'data: hello\n\n');
        equal(yield stream, 'data: world\n\n');
        assert(!(yield stream));
      })(done);
    });
    
    it('should handle new lines', function(done){
      co(function*(){
        var i = 0;
        var stream = sse(function*(){
          if (!i++) return 'hello\nworld';
        });
        
        equal(yield stream, 'data: hello\ndata: world\n\n');
        assert(!(yield stream));
      })(done);
    });
  });
  
  describe('header', function(){
    it('should send the retry header', function(done){
      co(function*(){
        var i = 0;
        var stream = sse({ retry: 5000}, function*(){
          return {
            0: 'hello',
            1: 'world'
          }[i++];
        });
        
        equal(yield stream, 'retry: 5000\ndata: hello\n\n');
        equal(yield stream, 'data: world\n\n');
        assert(!(yield stream));
      })(done);
    });
  });
});
