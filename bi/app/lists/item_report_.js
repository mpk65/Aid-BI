function(head, req) {
	var time_in = new Date().getTime();
	var row; var labels = ['id','label','title','entity','reported_activity'];
	send('{\"items\"\:[');
	while(row = getRow()){
		send('{\"type\"\:\"report\",');
		for (var i in row.key){
			var item_value = row.key[i];
			if (isArray(item_value)){
				send('\"' + labels[i] + '\":[');
				for (var j in item_value){send('\"' + item_value[j] + '\",')}
				send('"dummy"],');
			}else{
				send('\"' + labels[i] + '\":\"' + item_value + '\",')
			}};
			send('\"report_count\"\:' + row.value + '},')
		}; 
		var time_out = new Date().getTime();
		var t = time_out - time_in;
		send('{\"type\"\:\"duration\",\"id\"\:\"'+t+'\",\"label\"\:\"'+t+'\"}]}')
}
