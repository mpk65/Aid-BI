// http://wiki.apache.org/couchdb/Document_Update_Handlers
// IN: curl -X PUT http://127.0.0.1:5984/iatidev/_design/xml2json/_update/xform_update_handler/eu_sudan_xml --data @eu_sudan.xml
// OUT: http://127.0.0.1:5984/_utils/document.html?iatidev/eu_sudan_xml

function(doc, req) {
    var e4xmlJsonClass = require('vendor/couchapp/lib/jsone4xml').e4xmlJsonClass;
    e4xmlJsonClass.hello()
    if (doc) {
        log("doc wasn't null!  this is unexpected! you will LOSE your information in favor of the xml");
    }
    log(doc);
    log(req);
    //var xmldoc = req.body[xmldoc];
    //var xmldoc = req[xmldoc];
    
    // Workaround: Mozilla Bug 336551
    // see https://developer.mozilla.org/en/E4X
    var content = req.body.replace(/^<\?xml\s+version\s*=\s*(["'])[^\1]+\1[^?]*\?>/, "");
    var xml_content = new XML(content); 
    doc = e4xmlJsonClass.xml2obj(xml_content);
        
    // Because there is an xmlns in the form we can't reference these normally 
    // like .uuid therefore we have to use the *:: annotation, which searches 
    // every namespace.
    // See: http://dispatchevent.org/roger/using-e4x-with-xhtml-watch-your-namespaces/
    var getUuid = function(doc) {
        // search for a uuid in some known places
        if (req.id != null) return req.id; // mpk65
        var other_uuid = doc["uuid"];
        if (doc["uuid"]) return doc["uuid"];
        if (doc["Meta"] && doc["Meta"]["uid"]) return doc["Meta"]["uid"];
        var guid = function() {
            // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
            // TODO: find a better guid generator / plug into couch uuid framework
            var S4 = function() { 
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            }
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        }
        log("no uuid in form, generating one server side.");
        return guid();
    }
    
    // Try to get an id from the form, or fall back to generating one randomly
    uuid = getUuid(doc);
    log("id: " + uuid);
    doc["_id"] = uuid.toString();
    if (req.query.rev != 'missing')
    {
    doc["_rev"] = req.query.rev; // mpk65
    }
    
    // attach the raw xml as a file called "form.xml"
    // except this doesn't work.  so stick it in a field called "#xml" instead.
    // This apparently has to be base64 encoded to store properly in couch.
    // var attachments = { "form.xml" : { "content_type":"text/xml", "data": req.body } };      
    // doc["_attachments"] = attachments;
    
    // NOTE: should this be a file?  Not sure how this will do with multipart, we 
    // probably want to be smarter.
    doc["#xml"] = req.body;
    
    doc["#doc_type"] = "XForm"
    var resp =  {"headers" : {"Content-Type" : "text/plain"},
                 "body" : uuid.toString()};
    return [doc, resp];
}