function(head, req) {
	var time_in = new Date().getTime();
	var row; var labels = ['id','label','t_recorg_name'];
	send('{\"items\"\:[');
	while(row = getRow()){
		send('{\"type\"\:\"receiving_organisation\",');
		for (var i in row.key){
			send('\"' + labels[i] + '\":\"' + row.key[i].replace(/\"/g,'_') + '\",')
			};
			send('\"t_recorg_count\"\:' + row.value + '},')
		}; 
		var time_out = new Date().getTime();
		var t = time_out - time_in;
		send('{\"type\"\:\"provisiontime\",\"duration\"\:\"'+t+'\",\"label\"\:\"receiving_organisation\",\"id\"\:\"receiving_organisation\"}]}')
}