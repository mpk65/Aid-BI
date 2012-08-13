//http://127.0.0.1:5984/iati_usd/_design/exhibit/_view/countries?group_level=2
function(keys, values) { 
	return sum(values)
  }