function(doc) {

		if (doc['recipient-country'] != null){
			var a_country_code 	= doc['recipient-country']['@code']
			var a_country_name 	= doc['recipient-country']['#text']
		} else {
		 	var a_country_code 	= doc['recipient-region']['@code']
			var a_country_name 	= doc['recipient-region']['#text']
		 	}
		
		
	emit([
	      a_country_code,
	      a_country_code,
	      a_country_name,
	      a_country_code.toLowerCase(),
	      a_country_name.substring(0,10)
		],
// fact
		1);
}