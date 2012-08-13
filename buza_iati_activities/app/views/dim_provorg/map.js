function(doc) {
		for (tr in doc['transaction'])
					{
					var t_provorg_code 	= doc['transaction'][tr]['provider-org']['@ref'];
					var t_provorg_name 	= doc['transaction'][tr]['provider-org']['#text'];
		
	emit([
	      t_provorg_code,  
	      t_provorg_code,  
	      t_provorg_name   
		],
// fact
		1);
}}