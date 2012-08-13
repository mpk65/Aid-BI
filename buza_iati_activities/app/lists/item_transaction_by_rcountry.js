function(head, req) {
	var row; var labels = ['a_country_code','t_recorg_code','t_provorg_code','t_sector_code','id','label','a_identifier','t_type','t_date'];
	send('{\"types\"\: {\"transaction\" \: {\"pluralLabel\"\: \"transactions\"}},'+
			'\"properties\"\: {\"a_identifier\" \: {\"valueType\"\: \"item\"},'+
			'\"t_sector_code\" \: {\"valueType\"\: \"item\"},'+
			'\"t_date\" \: {\"valueType\"\: \"item\"},'+
			'\"t_recorg_code\" \: {\"valueType\"\: \"item\"},'+
			'\"t_provorg_code\" \: {\"valueType\"\: \"item\"}},'+
			'\"items\"\:[');
	while(row = getRow()){
		send('{\"type\"\:\"transaction\",');
		for (var i in row.key){
			send('\"' + labels[i] + '\":\"' + row.key[i].replace(/\"/g,'_') + '\",')
			};
			send('\"t_amount\"\:' + row.value + '},')
		}; 
	send('{}]}')
}
