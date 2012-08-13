function(head, req) {
	var row; var labels = ['id','label','a_country_name','geo_code','display'];
	send('{\"types\"\: {\"receiving country\" \: {\"pluralLabel\"\: \"receiving countries\"}},'+
			'\"properties\"\: {\"geo_code\" \: {\"valueType\"\: \"item\"}},'+
			'\"items\"\:[');
	while(row = getRow()){
		send('{\"type\"\:\"receiving country\",');
		for (var i in row.key){
			send('\"' + labels[i] + '\":\"' + row.key[i].replace(/\"/g,'_') + '\",')
			};
			send('\"a_country_count\"\:' + row.value + '},')
		}; 
	send('{}]}')
}