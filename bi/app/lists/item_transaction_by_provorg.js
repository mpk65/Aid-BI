function(head, req) {
	var time_in = new Date().getTime();
	var row; var labels = ['t_provorg_code','t_recorg_code','a_country_code','t_sector_code','id','label','a_identifier','t_type','t_date'];
	send('{\"items\"\:[');
	while(row = getRow()){
		send('{\"type\"\:\"transaction\",');
		for (var i in row.key){
			send('\"' + labels[i] + '\":\"' + row.key[i].replace(/\"/g,'_') + '\",')
			};
			send('\"t_amount\"\:' + row.value + '},')
		}; 
		var time_out = new Date().getTime();
		var t = time_out - time_in;
		send('{\"type\"\:\"provisiontime\",\"duration\"\:\"'+t+'\",\"label\"\:\"transaction\",\"id\"\:\"transaction\"}]}')
}
