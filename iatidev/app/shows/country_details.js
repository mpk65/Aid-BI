function(doc, req) {
	  var Mustache = require('vendor/couchapp/lib/mustache');
	  var data = {
	    ccode: req.query.ccode
	  };
	  return Mustache.to_html(this.templates.country_details, data );
	}