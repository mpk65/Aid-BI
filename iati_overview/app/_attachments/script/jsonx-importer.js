/*==================================================
 *  Exhibit.ExhibitJSONXImporter
 * Ensemble enhancement to JSON importer, adding ex:converter support to
 * allow items to be manipulated during database loading.
 *==================================================
 */
 
Exhibit.ExhibitJSONXImporter = {
};
Exhibit.importers["application/jsonx"] = Exhibit.ExhibitJSONXImporter;

Exhibit.ExhibitJSONXImporter.load = function(link, database, cont , fConvert) {
    /*var url = typeof link == "string" ? link : link.href;
    url = Exhibit.Persistence.resolveURL(url);*/

    var url = link;
    if (typeof link != "string") {
        url = Exhibit.Persistence.resolveURL(link.href);
        fConvert = Exhibit.getAttribute(link, "converter");
    }
    if (typeof fConvert == "string") {
        var name = fConvert;
        name = name.charAt(0).toLowerCase() + name.substring(1) + "Converter";
        if (name in Exhibit.JSONPImporter) {
            fConvert = Exhibit.JSONPImporter[name];
        } else {
            try {
                fConvert = eval(fConvert);
            } catch (e) {
                fConvert = null;
                // silent
            }
        }
    }
    if (fConvert != null && "preprocessURL" in fConvert) {
        url = fConvert.preprocessURL(url);
    }

    var fError = function(statusText, status, xmlhttp) {
        Exhibit.UI.hideBusyIndicator();
        Exhibit.UI.showHelp(Exhibit.l10n.failedToLoadDataFileMessage(url));
        if (cont) cont();
    };
    
    var fDone = function(xmlhttp) {
        Exhibit.UI.hideBusyIndicator();
        try {
            var o = null;
            try {
                o = eval("(" + xmlhttp.responseText + ")");
            } catch (e) {
                Exhibit.UI.showJsonFileValidation(Exhibit.l10n.badJsonMessage(url, e), url);
            }
            
            if (o != null) {
                database.loadData(fConvert ? fConvert(o, url, link) : o, Exhibit.Persistence.getBaseURL(url));
            }
        } catch (e) {
            SimileAjax.Debug.exception(e, "Error loading Exhibit JSON data from " + url);
        } finally {
            if (cont) cont();
        }
    };

    Exhibit.UI.showBusyIndicator();
    SimileAjax.XmlHttp.get(url, fError, fDone);
};
