function(doc) {
		var a_identifier 		= doc['iati-identifier'];
		var a_title 			= doc.title;
		var a_description 		= doc.description['#text'];
		var t_sector_code = doc.sector['@code'];
		if (doc['recipient-country'] != null){
			var a_country_code 	= doc['recipient-country']['@code'];} else {
		 	var a_country_code 	= doc['recipient-region']['@code'];}
		
		for (tr in doc['transaction'])
					{
					var t_type 			= doc['transaction'][tr]['transaction-type']['@code'];
					var t_recorg_code 	= doc['transaction'][tr]['receiver-org']['@ref'];
					var t_recorg_name 	= doc['transaction'][tr]['receiver-org']['#text'];
					var t_provorg_code 	= doc['transaction'][tr]['provider-org']['@ref'];
					var t_date 			= doc['transaction'][tr]['value']['@value-date'].split("-")[0];
					var t_amount 		= doc['transaction'][tr]['value']['#text'];
					var t_amount_i 		= parseInt(t_amount);
		
	emit([
// dim_keys
		t_sector_code,
	    t_recorg_name, // replace with code when ambiguities are removed
		t_provorg_code,
		a_country_code,
// invariant
		a_identifier +'_'+ t_type +'_'+ t_date,
	    a_identifier +'_'+ t_type +'_'+ t_date,
		a_identifier,
		t_type,
		t_date
		],
// fact
		t_amount_i);
}}