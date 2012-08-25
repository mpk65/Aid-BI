function(doc) {
	// !code vendor/iati/atts.js
	var a_country_name = att.name(doc['recipient-country']);
	if (a_country_name == null)
	{
		a_country_name = att.name(doc['recipient-region']);
	}


	var a_country_code = att.code(doc['recipient-country']);
	if (a_country_code == null)
	{
		a_country_code = att.code(doc['recipient-region'])
	}

	ts = ar.ray(doc['transaction'])
	for (i in ts)
	{    
		t_recorg_name = att.name(ts[i]['receiver-org']);
		t_recorg_code = att.code(ts[i]['receiver-org']);  

		if (t_recorg_name == null)
		{
			t_recorg_name = a_country_name
		}

		if (t_recorg_code == null)
		{
			t_recorg_code = a_country_code
		}

		emit([
		      t_recorg_code,  
		      t_recorg_code,  
		      t_recorg_name   
		      ],
		      1);
	}
}
