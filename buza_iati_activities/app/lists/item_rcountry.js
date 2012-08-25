function(head, req) {
	var time_in = new Date().getTime();
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
		var time_out = new Date().getTime();
		var t = time_out - time_in;
		send('{\"type\"\:\"duration\",\"id\"\:\"'+t+'\",\"label\"\:\"'+t+'\"}]}')
}