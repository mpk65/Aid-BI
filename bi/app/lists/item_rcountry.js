function(head, req) {
	var time_in = new Date().getTime();
	var row; var labels = ['id','label','a_country_name','geo_code','display'];
	send('{\"items\"\:[');
	while(row = getRow()){
		send('{\"type\"\:\"receiving_country\",');
		for (var i in row.key){
			send('\"' + labels[i] + '\":\"' + row.key[i].replace(/\"/g,'_') + '\",')
			};
			send('\"a_country_count\"\:' + row.value + '},')
		}; 
		var time_out = new Date().getTime();
		var t = time_out - time_in;
		send('{\"type\"\:\"provisiontime\",\"duration\"\:\"'+t+'\",\"label\"\:\"receiving_country\",\"id\"\:\"receiving_country\"}]}')
}