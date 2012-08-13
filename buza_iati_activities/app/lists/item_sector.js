function(head, req) {
	var row; var labels = ['id','label','t_sector_name','display'];
	send('{\"types\"\: {\"sector\" \: {\"pluralLabel\"\: \"sectors\"}},\"items\"\:[');
	while(row = getRow()){
		send('{\"type\"\:\"sector\",');
		for (var i in row.key){
			send('\"' + labels[i] + '\":\"' + row.key[i].replace(/\"/g,'_') + '\",')
			};
			send('\"t_sector_count\"\:' + row.value + '},')
		}; 
	send('{}]}')
}
