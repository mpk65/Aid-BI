function(head, req) {
	var time_in = new Date().getTime();
	var row; var labels = ['id','title','label','relevance','description','kind','activity_rel','offset'];
	send('{\"items\"\:[');
	while(row = getRow()){
		send('{\"type\"\:\"entity\",');
		for (var i in row.key){
			var item_value = row.key[i];
			send('\"' + labels[i] + '\":\"' + item_value + '\",')
			};
			send('\"entity_count\"\:' + row.value + '},')
		}; 
		var time_out = new Date().getTime();
		var t = time_out - time_in;
		send('{\"type\"\:\"duration\",\"id\"\:\"'+t+'\",\"label\"\:\"'+t+'\"}]}')
}