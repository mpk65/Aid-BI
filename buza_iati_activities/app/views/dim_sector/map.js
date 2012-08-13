function(doc) {
		var t_sector_code 			= doc.sector['@code'];
		var t_sector_name 			= doc.sector['#text'];
		
	emit([
		t_sector_code,
		t_sector_code,
		t_sector_name,
		t_sector_name.substring(0,7)
		],
// fact
		1);
}