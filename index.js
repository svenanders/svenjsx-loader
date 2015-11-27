var loaderUtils = require('loader-utils');
var svenjsx = require('svenjsx');

module.exports = function(source) {
  this.cacheable();

  var params = loaderUtils.parseQuery(this.query);
  if (params.harmony == 'false') {
    params.harmony = false;
  }
  if (params.precompile == 'false') {
    params.precompile = false;
  }

  var whitelist = {
    harmony: true,
    precompile: true
  };

  var unknownParams = [];
  for (var i in params) {
    if (!whitelist[i])
      unknownParams.push(i);
  }
  if (unknownParams.length) {
    var warn = unknownParams.length === 1 ?
      'svenjsx-loader got this undocumented option: ' :
      'svenjsx-loader got these undocumented options: ';
    warn += unknownParams.join(', ');
    this.emitWarning(warn);
  }

  return svenjsx.transform(source, params);
};
