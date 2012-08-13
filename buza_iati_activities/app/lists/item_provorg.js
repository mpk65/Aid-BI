function(head, req) {
	var row; var labels = ['id','label','t_provorg_name'];
	send('{\"types\"\: {\"providing organisation\" \: {\"pluralLabel\"\: \"providing organisations\"}},\"items\"\:[');
	while(row = getRow()){
		send('{\"type\"\:\"providing organisation\",');
		for (var i in row.key){
			send('\"' + labels[i] + '\":\"' + row.key[i].replace(/\"/g,'_') + '\",')
			};
			send('\"t_provorg_count\"\:' + row.value + '},')
		}; 
	send('{}]}')
}