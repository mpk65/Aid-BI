function(head, req) {
	var time_in = new Date().getTime();
	var row; var labels = ['id','label','t_sector_name','display'];
	send('{\"items\"\:[');
	while(row = getRow()){
		send('{\"type\"\:\"sector\",');
		for (var i in row.key){
			send('\"' + labels[i] + '\":\"' + row.key[i].replace(/\"/g,'_') + '\",')
			};
			send('\"t_sector_count\"\:' + row.value + '},')
		}; 
		var time_out = new Date().getTime();
		var t = time_out - time_in;
		send('{\"type\"\:\"provisiontime\",\"duration\"\:\"'+t+'\",\"label\"\:\"sector\",\"id\"\:\"sector\"}]}')
}
