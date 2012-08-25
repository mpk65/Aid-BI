#!/Library/Frameworks/Python.framework/Versions/2.7/bin/python

import sys
sys.path.append("../")

import couchdb,json
from filemgt.filemgt import Filemgt
f = Filemgt()

class Entities2Couch():

    def __init__(self):
        self.couch = couchdb.Server(f.couch_host)
        self.dbname = f.documents_couch
        self.db = self.couch[self.dbname]
        self.db.resource.credentials = (f.couch_user, f.couch_pwd)
        self.example = {'type': 'person','name': 'John Doe'}

    def work(self,id_,jsn):
        doc = json.loads(jsn)
        if self.db.get(id_,default='missing') == 'missing':
            print "New in",
            self.db[id_] = doc
        else:
            print "Updating",
            rev = self.db[id_].rev
            #self.db.save(id_,json.loads(jsn),{},rev=rev)
            doc['_rev']=rev
            self.db[id_] = doc
            #return res[0] # should be a 201 HTTP response code
        print f.documents_couch
    
def main():
        t = Entities2Couch()
        print "Entities2Couch().work(json) updates an entity to couchDB " + t.dbname
        t.work('example', json.dumps(t.example))

if __name__ == '__main__':
        main()