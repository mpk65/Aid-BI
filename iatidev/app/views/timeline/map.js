function(doc) {
	var sdate = doc.date_start_actual;
	var edate = doc.date_end_actual;
	var title = doc.title + ' ' + doc.activity_recipient_country;
	var country = doc.activity_recipient_country;
	var donor = doc.activity_reporting_org;
	// http://simile-widgets.org/wiki/Timeline_EventSources#Date_Time_Formats
	var sstart = new Date(Date.UTC('20' + sdate.split("/")[2],sdate.split("/")[0],sdate.split("/")[1],00,00,00,0));
	var eend = new Date(Date.UTC('20' + edate.split("/")[2],edate.split("/")[0],edate.split("/")[1],00,00,00,0));
	var startyear = '20' + sdate.split("/")[2];
	var endyear = '20' + edate.split("/")[2];
	var ccode = doc.activity_recipient_country_code.toLowerCase();
	
	emit(['type','label','country','donor','start','end','startyear','endyear','code'],
		['activities',title,country,donor,sstart,eend,startyear, endyear, ccode]);
}
