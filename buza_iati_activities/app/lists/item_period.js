function(head, req) {
	var time_in = new Date().getTime();
	var row; var labels = ['id','label','a_start_planned','a_start_actual','a_end_planned','a_end_actual'];
	send('{\"types\"\: {\"a_period_date\" \: {\"pluralLabel\"\: \"activity periods\"}},'+
			'\"items\"\:[');
	while(row = getRow()){
		send('{\"type\"\:\"a_period_date\",');
		for (var i in row.key){
			send('\"' + labels[i] + '\":\"' + row.key[i].replace(/\"/g,'_') + '\",')
			};
			send('\"a_period_tally\"\:' + row.value + '},')
		}; 
		var time_out = new Date().getTime();
		var t = time_out - time_in;
		send('{\"type\"\:\"duration\",\"id\"\:\"'+t+'\",\"label\"\:\"'+t+'\"}]}')
}