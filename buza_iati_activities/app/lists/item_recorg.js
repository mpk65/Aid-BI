function(head, req) {
	var row; var labels = ['id','label','t_recorg_name'];
	send('{\"types\"\: {\"receiving organisation\" \: {\"pluralLabel\"\: \"receiving organisations\"}},\"items\"\:[');
	while(row = getRow()){
		send('{\"type\"\:\"receiving organisation\",');
		for (var i in row.key){
			send('\"' + labels[i] + '\":\"' + row.key[i].replace(/\"/g,'_') + '\",')
			};
			send('\"t_recorg_count\"\:' + row.value + '},')
		}; 
	send('{}]}')
}