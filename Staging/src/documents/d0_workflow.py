#!/Library/Frameworks/Python.framework/Versions/2.7/bin/python

import sys
sys.path.append("../")

# coordination script to pre-process and couch upload Activity documents 

import os
import shutil
import simplejson as json

from filemgt.filemgt import Filemgt
from d1_docx2txt import Docx2Txt
from d1_pdf2txt import Pdf2Txt
from d2_txt2id import Txt2ID
from d3_txt2entities import Txt2Entities
from d4_entities2couch import Entities2Couch

f = Filemgt()

PDF_FLAG = False
IDENTIFIER_MAP  = {}

class Dok(object): 
    global IDENTIFIER_MAP

    def __init__(self):
        self.name         = "name"
        self.contents_pre     = "contents_pre"
        self.contents_post     = "contents_post"
        self.identifiers     = []
        self.json        = {}

    def work_me(self,source,target):
        if source == f.docx_ext and target == f.txt_ext:
            self.contents_post = Docx2Txt().work(f.docx_dir + self.name + f.docx_ext)
        elif source == f.pdf_ext and target == f.txt_ext:
            self.contents_post = Pdf2Txt().work(self.name, f.pdf_dir, f.txt_dir)
        elif source == f.txt_ext and target == f.id_ext:
            self.contents_post = self.contents_pre
            self.identifiers = Txt2ID().work(self.contents_pre)
            IDENTIFIER_MAP[self.name] = self.identifiers
        elif source == f.id_ext and target == f.json_ext:
            calais_response = Txt2Entities().work(self.contents_pre)
            self.contents_post = calais_response.data
            self.json = json.loads(self.contents_post)
            self.json['doc']['info']['activities'] = IDENTIFIER_MAP[self.name]
            self.contents_post = json.dumps(self.json)
            calais_response.print_summary()
        elif source == f.json_ext and target == f.couch_ext:
            self.contents_post = Entities2Couch().work(self.name, self.contents_pre)

    def read(self, dir_, ext):
        if dir_ == f.docx_dir and ext == f.docx_ext:
            self.contents_pre = "delegating to Docx2Txt() on account of being a zipfile"
        else:
            self.contents_pre = open(dir_ + self.name + ext).read()

    def write_(self, dir_, ext, id_):
        if dir_ == f.txt_dir and ext == f.txt_ext and PDF_FLAG:
            self.contents_pre = "delegating to Pdf2Txt() on account of using a device"
        else:
            open(dir_ + id_ + self.name + ext,'w').write(self.contents_post)
        self.dot_me()

    def write(self, dir_, ext):
        if dir_ == f.couch and ext == f.couch_ext:
            self.dot_me()
        else:
            self.write_(dir_,ext,"")

    def move_me(self, dir_, ext):
        if ext == f.json_ext or ext == f.docx_ext or ext == f.pdf_ext:
            dst_file = f.couch_dir + self.name + ext
            if os.path.exists(dst_file):
                os.remove(dst_file)
            shutil.move(dir_ + self.name + ext,f.couch_dir )
        else:
            dst_file = f.processed_dir + self.name + ext
            if os.path.exists(dst_file):
                os.remove(dst_file)
            shutil.move(dir_ + self.name + ext,f.processed_dir )

    def id_me(self, id_):
        self.name = id_ + "_" + self.name 

    def dot_me(self):
        print ".",

    def call_me(self):
        print (self.name),
        
    def print_me(self,head):
        print self.contents_pre[:head]
        print "-----------------"
        print self.contents_post[:head]

def work(source_dir,source_ext,target_dir,target_ext):
    first_few = 3
    without_ext = 0 - len(source_ext)
    ducktype = 0 - 3

    candidates = os.listdir(source_dir)
    worker_list = []
    dok_list = []

    # filter out candidates that do not have the proper ducktype
    for candidate in candidates:
        if candidate[ducktype:] == source_ext[ducktype:]: 
            worker_list.append(candidate[:without_ext])

    # create dok objects for first few workers in list
#    for worker in worker_list[:first_few]:
    for worker in worker_list:
        dok = Dok()
        dok.name = worker
        dok_list.append(dok)
        
    if dok_list:
        print "\nWorking " + source_ext + " into " + target_ext

    # transform the dok contents
    for dok in dok_list:
        dok.read(source_dir,source_ext)
        dok.call_me()
        dok.work_me(source_ext,target_ext)
#        dok.print_me(80)
        dok.write(target_dir,target_ext)
        dok.move_me(source_dir, source_ext)

def main():
    global PDF_FLAG
    
    work(f.docx_dir,f.docx_ext,f.txt_dir,f.txt_ext)
    PDF_FLAG = True
    work(f.pdf_dir,f.pdf_ext,f.txt_dir,f.txt_ext)
    PDF_FLAG = False
    work(f.txt_dir,f.txt_ext,f.id_dir,f.id_ext)
    work(f.id_dir,f.id_ext,f.json_dir,f.json_ext)
    work(f.json_dir,f.json_ext,f.couch,f.couch_ext)
    
    print "\nDocuments from " + f.docx_dir + " pre-processed and couched to " + f.documents_couch

if __name__ == '__main__': 
    main()
