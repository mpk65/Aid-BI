function(doc) {
		for (tr in doc['transaction'])
					{
					var t_recorg_code 	= doc['transaction'][tr]['receiver-org']['@ref'];
					var t_recorg_name 	= doc['transaction'][tr]['receiver-org']['#text'];
		
	emit([
	      t_recorg_name,  // replace with code when ambiguities are removed
	      t_recorg_name,  // replace with code when ambiguities are removed
	      t_recorg_name   // do not replace
		],
// fact
		1);
}}