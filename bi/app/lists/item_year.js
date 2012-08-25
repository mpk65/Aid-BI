function(head, req) {
	var time_in = new Date().getTime();
	var row; var labels = ['id','label','t_type'];
	send('{\"items\"\:[');
	while(row = getRow()){
		send('{\"type\"\:\"year\",');
		for (var i in row.key){
			send('\"' + labels[i] + '\":\"' + row.key[i].replace(/\"/g,'_') + '\",')
			};
			send('\"year_count\"\:' + row.value + '},')
		}; 
		var time_out = new Date().getTime();
		var t = time_out - time_in;
		send('{\"type\"\:\"provisiontime\",\"duration\"\:\"'+t+'\",\"label\"\:\"year\",\"id\"\:\"year\"}]}')
}
