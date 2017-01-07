'use strict';

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
	var e = fs.existsSync(filename);
	
	if(e){
		var content = fs.readFileSync(filename, 'utf8');
		
		if(content.length) {
			var blocks = getBlocks(content),
			opts = options || {},
			transformedContent = transformReferences(blocks, content, opts),
			replaced = compactContent(blocks);
			
			return [ transformedContent, replaced ];
		}
	}
	
	return null;
};