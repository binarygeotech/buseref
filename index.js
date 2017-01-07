'use strict';

var fs = require('fs');

var getBlocks = require('./lib/getBlocks'),
  transformReferences = require('./lib/transformReferences'),
  compactContent = require('./lib/compactContent');

module.exports = function (content, options) {
  var blocks = getBlocks(content),
    opts = options || {},
    transformedContent = transformReferences(blocks, content, opts),
    replaced = compactContent(blocks);

  return [ transformedContent, replaced ];
};

module.exports.file = function (filename, options) {
  var e = fs.existsSync(filename), block, content = '', opts, transformedContent, replaced;
  
  if (e) {
    content = fs.readFileSync(filename, 'utf8');
    
    if (content.length) {
      blocks = getBlocks(content);
      opts = options || {};
      transformedContent = transformReferences(blocks, content, opts);
      replaced = compactContent(blocks);
      
      return [ transformedContent, replaced ];
    }
  }
  
  return null;
};
