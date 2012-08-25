function(doc) {
	// !code vendor/iati/atts.js

	if (doc.sector != null){
		sectors = ar.ray(doc.sector)
		for (i in sectors)
		{
			t_sector_code = att.regex(att.code(sectors[i]));
			t_sector_name = att.regex(att.name(sectors[i]));

			emit([
			      t_sector_code,
			      t_sector_code,
			      t_sector_name,
			      t_sector_name.substring(0,7)
			      ],
			      1);
		}
	}
}