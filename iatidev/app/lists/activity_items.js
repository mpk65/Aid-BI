//['country','code','donor','label','id']
// ["Afghanistan", "af", "The Global Alliance for Vaccination and Immunisation", "CSO", "47122-12-AFG-10B-Y"]
function(head, req) {
	var row; var labels = ['country_code','reporg_code','fundorg_code','extorg_code','imporg_code','label','startyear','endyear','id'];
	send('{types\: {\"activity\" \: {pluralLabel\: \"activities\"}},properties\: {\"country_code\" \: {valueType\: \"item\"},\"reporg_code\" \: {valueType\: \"item\"},\"fundorg_code\" \: {valueType\: \"item\"},\"extorg_code\" \: {valueType\: \"item\"},\"imporg_code\" \: {valueType\: \"item\"}},items:[');
	while(row = getRow()){
		send('{\"type\"\:\"activity\",');
		for (var i in row.key){
			send('\"' + labels[i] + '\":\"' + row.key[i] + '\",')
			};
			send('\"transactions\"\:' + row.value + '},')
		}; 
	send(']}')
}