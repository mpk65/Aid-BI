function(head, req) {
	send('{'+
'\"types\"\: {'+
'\"activity\"\: {\"pluralLabel\"\: \"activities\"},'+
'\"transaction\"\: {\"pluralLabel\"\: \"transactions\"},'+
'\"receiving_country\"\: {\"pluralLabel\"\: \"receiving countries\"},'+
'\"receiving_organisation\"\: {\"pluralLabel\"\: \"receiving organisations\"},'+
'\"providing_organisation\"\: {\"pluralLabel\"\: \"providing organisations\"},'+
'\"sector\"\: {\"pluralLabel\"\: \"sectors\"},'+
'\"country\"\: {\"pluralLabel\"\: \"countries\"},'+
'\"year\"\: {\"pluralLabel\"\: \"years\"},'+
'\"a_period_date\"\: {\"pluralLabel\"\: \"activity periods\"},'+
'\"report\"\: {\"pluralLabel\"\: \"reports\"},'+
'\"entity\"\: {\"pluralLabel\"\: \"entities\"},'+
'\"provisiontime\"\: {\"pluralLabel\"\: \"provisiontimes\"}'+
'},'+
'\"properties\"\: {'+
'\"a_identifier\"\: {\"valueType\"\: \"item\"},'+
'\"a_country_code\"\: {\"valueType\"\: \"item\"},'+
'\"a_period_date\"\: {\"valueType\"\: \"item\"},'+
'\"a_report\"\: {\"valueType\"\: \"item\"},'+
'\"geo_code\"\: {\"valueType\"\: \"item\"},'+
'\"t_date\"\: {\"valueType\"\: \"item\"},'+
'\"t_sector_code\"\: {\"valueType\"\: \"item\"},'+
'\"t_recorg_code\"\: {\"valueType\"\: \"item\"},'+
'\"t_provorg_code\"\: {\"valueType\"\: \"item\"},'+
'\"entity\"\: {\"valueType\"\: \"item\"},' +
'\"reported_activity\"\: {\"valueType\"\: \"item\"}'+
'}}')}