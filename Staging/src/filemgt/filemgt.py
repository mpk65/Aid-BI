from time import strftime as date
import os

class Filemgt(object): 

    def __init__(self):
        self.main_dir       = "/Users/michielkuijper/Desktop/data_iati/"
        self.docx_dir       = self.main_dir + "d1_docx/"
        self.pdf_dir        = self.main_dir + "d1_pdf/"
        self.txt_dir        = self.main_dir + "d2_txt/"
        self.id_dir         = self.main_dir + "d3_id_txt/"
        self.json_dir       = self.main_dir + "d4_id_json/"
        self.couch_dir      = self.main_dir + "d5_couchdb_uploaded/"
        self.xmls_dir       = self.main_dir + "x1_sets_activities/"
        self.xml_dir        = self.main_dir + "x2_split_activities/"
        self.xml_couch_dir  = self.main_dir + "x3_couchdb_uploaded/"
        self.processed_dir  = self.main_dir + "processed_" + date("%Y%m%d%H%M%S") + "/"

        for attr, value in self.__dict__.iteritems():
            #print attr, value
            if not os.path.exists(value):
                os.makedirs(value)
        
        self.docx_ext       = ".docx"
        self.pdf_ext        = ".pdf"
        self.txt_ext        = ".txt"
        self.id_ext         = ".txt"
        self.json_ext       = ".json"
        self.xml_ext        = ".xml"
        self.couch          = "couch"
        self.couch_ext      = self.couch
        
#        change when publishing to production
#        self.couch_host = 'http://iati.iriscouch.com:5984/'
#        self.documents_couch = 'calais'
#        self.activities_couch = 'buza_iati'
#        self.xml_design_doc = 'buza_iati'
        self.couch_host = 'http://127.0.0.1:5984/'
        self.couch_user = ''
        self.couch_pwd  = ''
        self.documents_couch = 'aid'
        self.activities_couch = 'aid'
        self.xml_design_doc = 'bi'
            
if __name__ == '__main__':
    Filemgt()