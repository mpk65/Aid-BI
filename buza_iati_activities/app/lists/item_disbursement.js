function(head, req) {
	var time_in = new Date().getTime();
	var row; var labels = ['t_type','id','label','t_recorg_code','t_provorg','a_country_code','a_identifier','t_date'];
	send('{\"types\"\: {\"disbursement\" \: {\"pluralLabel\"\: \"disbursements\"}},\"properties\"\: {\"a_identifier\" \: {\"valueType\"\: \"item\"}},\"items\"\:[');
	while(row = getRow()){
		send('{\"type\"\:\"disbursement\",');
		for (var i in row.key){
			send('\"' + labels[i] + '\":\"' + row.key[i].replace(/\"/g,'_') + '\",')
			};
			send('\"t_amount\"\:' + row.value + '},')
		}; 
		var time_out = new Date().getTime();
		var t = time_out - time_in;
		send('{\"type\"\:\"duration\",\"id\"\:\"'+t+'\",\"label\"\:\"'+t+'\"}]}')
}