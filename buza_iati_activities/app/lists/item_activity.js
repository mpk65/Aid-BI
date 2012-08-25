function(head, req) {
	var time_in = new Date().getTime();
	var row; var labels = ['id','label','a_title','a_description','a_status','a_period_date','a_country_code','a_report'];
	send('{\"types\"\: {\"activity\" \: {\"pluralLabel\"\: \"activities\"}},'+
			'\"properties\"\: {\"a_country_code\" \: {\"valueType\"\: \"item\"},'+
			'\"a_period_date\" \: {\"valueType\"\: \"item\"},'+
			'\"a_report\" \: {\"valueType\"\: \"item\"}},'+
			'\"items\"\:[');
	while(row = getRow()){
		send('{\"type\"\:\"activity\",');
		for (var i in row.key){
			send('\"' + labels[i] + '\":\"' + row.key[i].replace(/\"/g,'_') + '\",')
			};
			send('\"a_count\"\:' + row.value + '},')
		}; 
	var time_out = new Date().getTime();
	var t = time_out - time_in;
	send('{\"type\"\:\"duration\",\"id\"\:\"'+t+'\",\"label\"\:\"'+t+'\"}]}')
}