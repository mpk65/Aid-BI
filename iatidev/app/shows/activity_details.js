function(doc, req) {
	  var Mustache = require('vendor/couchapp/lib/mustache');
	  var data = {
	    identifier: req.query.identifier
	  };
	  return Mustache.to_html(this.templates.activity_details, data );
	}