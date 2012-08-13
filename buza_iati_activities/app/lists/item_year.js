function(head, req) {
	var row; var labels = ['id','label','t_type'];
	send('{\"types\"\: {\"year\" \: {\"pluralLabel\"\: \"years\"}},'+
			'\"properties\"\: {\"a_identifier\" \: {\"valueType\"\: \"item\"},'+
			'\"t_sector_code\" \: {\"valueType\"\: \"item\"},'+
			'\"t_recorg_code\" \: {\"valueType\"\: \"item\"},'+
			'\"t_provorg_code\" \: {\"valueType\"\: \"item\"}},'+
			'\"items\"\:[');
	while(row = getRow()){
		send('{\"type\"\:\"year\",');
		for (var i in row.key){
			send('\"' + labels[i] + '\":\"' + row.key[i].replace(/\"/g,'_') + '\",')
			};
			send('\"year_count\"\:' + row.value + '},')
		}; 
	send('{}]}')
}
