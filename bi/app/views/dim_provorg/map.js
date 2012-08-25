function(doc) {
	// !code vendor/iati/atts.js
	var a_reporg_name = att.name(doc['reporting-org']);
	var a_reporg_code = att.code(doc['reporting-org']);

	ts = ar.ray(doc['transaction'])

	for (i in ts)
	{    
		t_provorg_name = att.name(ts[i]['provider-org']);
		t_provorg_code = att.code(ts[i]['provider-org']);  

		if (t_provorg_name == null)
		{
			t_provorg_name = a_reporg_name;
		}

		if (t_provorg_code == null)
		{
			t_provorg_code = a_reporg_code;
		}

		emit([
		      t_provorg_code,
		      t_provorg_code,
		      t_provorg_name,
		      ],
		      1);
	}
}
