
/**
 * Sse generator stream.
 *
 * @param {Object=} opts
 * @param {GeneratorFunction} fn
 * @return {GeneratorFunction}
 * @api public
 */

module.exports = function sse(opts, fn){
  if ('function' == typeof opts) {
    fn = opts;
    opts = {};
  }
  
  var first = true;
  
  return function*(end){
    var out = '';
    
    // headers
    
    if (first) {
      if (opts.retry) out += 'retry: 5000\n';
      first = false;
    }
    
    // body
    
    var data = yield fn(end);
    if (data) {
      out += data.split('\n').map(function(line){
        return 'data: ' + line + '\n';
      }).join('') + '\n';
    }
    
    if (out != '') return out;
  };
}
