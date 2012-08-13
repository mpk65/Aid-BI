// http://127.0.0.1:5984/iati_usd/_design/exhibit/_list/activity_items/activities?group_level=5
function(keys, values) { 
	return sum(values)
  }