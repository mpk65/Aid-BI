#!/Library/Frameworks/Python.framework/Versions/2.7/bin/python

import sys
sys.path.append("../")

import couchdb
import os
import shutil
from filemgt.filemgt import Filemgt
fmgt = Filemgt()

class element2couch():
    
    def __init__(self):
        self.couch = couchdb.Server(fmgt.couch_host)
        self.db_name = fmgt.activities_couch
        self.db = self.couch[self.db_name]
        self.db.resource.credentials = (fmgt.couch_user, fmgt.couch_pwd)
        self.design_doc = fmgt.xml_design_doc
        self.resource = self.db.resource('_design', self.design_doc, '_update', 'xform_update_handler')
        self.update_handler = self.db_name + '/xform_update_handler'
        self.in_path = fmgt.xml_dir
        self.move_path = fmgt.xml_couch_dir
        self.filenames = os.listdir(self.in_path)

    def update_(self,filename,id_,rev):
        xmldoc = open(self.in_path + filename + fmgt.xml_ext).read()
        res = self.resource.put(id_, xmldoc,dict(extra_header='extra'),rev=rev)
        print filename, self.db_name, res[0]
    
    def work(self):
        for filename in self.filenames:
            if filename[-4:] == fmgt.xml_ext:
                id_ = filename[:-4]
                docres = self.db.get(id_,default='missing')
                if (docres == 'missing'):
                    print "New ",
                    self.update_(filename[:-4],id_,'missing')
                else:
                    print "Updating ",
                    self.update_(filename[:-4],id_,docres.rev)
                dst_file = self.move_path + filename
                if os.path.exists(dst_file):
                    os.remove(dst_file)
                shutil.move(self.in_path + filename,self.move_path)
#            else:
#                print filename + " is not a " + fmgt.xml_ext + " file"
        print "Done couching"

def main():
    element2couch().work()

if __name__ == '__main__': 
    main()
