function(head, req) {
	var time_in = new Date().getTime();
	var row; var labels = ['a_country_code','id','label','a_title','a_description','a_status','a_period_date','a_report'];
	send('{\"items\"\:[');
	while(row = getRow()){
		send('{\"type\"\:\"activity\",');
		for (var i in row.key){
			send('\"' + labels[i] + '\":\"' + row.key[i].replace(/\"/g,'_') + '\",')
			};
			send('\"a_count\"\:' + row.value + '},')
		}; 
		var time_out = new Date().getTime();
		var t = time_out - time_in;
		send('{\"type\"\:\"provisiontime\",\"duration\"\:\"'+t+'\",\"label\"\:\"activity\",\"id\"\:\"activity\"}]}')
}