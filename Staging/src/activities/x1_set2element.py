#!/Library/Frameworks/Python.framework/Versions/2.7/bin/python

import sys
sys.path.append("../")

import re, os
import shutil
from filemgt.filemgt import Filemgt
fmgt = Filemgt()

class set2element():
    
    def __init__(self):
        self.count          = 0
        self.activity_array = []
        self.line_array     = []
        self.outfile_name   = 'ignored_header.xml'
        self.outfile        = open(self.outfile_name,'w')
        self.read_dir       = ''
        self.write_dir      = ''

    def build_activity (self, set_, line):

        end_of_set = re.compile('(</iati-activities>)')
        end_of_set_found = end_of_set.search(line)
        # line is end of set
        if end_of_set_found:
            for i in self.activity_array:
                # write out last previous activity
                self.outfile.write(i)
            print "\n",self.count, " activities in ", set_, "\n\n"
            self.activity_array = []

        begin_of_activity = re.compile('(<iati-activity)')
        begin_of_activity_found = begin_of_activity.search(line)
        # line is begin of a new activity
        if begin_of_activity_found:
            for i in self.activity_array:
                # write out previous activity
                self.outfile.write(i)
            self.activity_array = []
    
        activity_identifier = re.compile('identifier>(\S*)</iati')
        activity_identifier_found = activity_identifier.search(line)
        # line is an activity identifier
        if activity_identifier_found:
            # remember activity identifier
            activity_file_name = activity_identifier_found.group(1) + fmgt.xml_ext
            activity_file_name = activity_file_name.replace( '/' , '_' )
            self.outfile = open(self.write_dir + activity_file_name,'w')
            print ".", activity_file_name,
            self.count = self.count + 1

        # remember any other lines 
        self.activity_array.append(line)
        return

    def break_along_tags(self, line):
        line_ = line.replace('><','>><<')
        self.line_array = re.split(('><'),line_)
        return self.line_array
    
    def extract_activities_from (self, set_):
        contents = open(self.read_dir + set_ + fmgt.xml_ext,'r')
        self.count = 0
        # this could be one long line without linebreaks
        for longline in contents:
            # therefore we break the line(s) for every tag 
            for tagline in self.break_along_tags(longline):
                # and start looking for activities     
                self.build_activity (set_, tagline)

    def work(self, source_dir,source_ext,target_dir,target_ext):
            first_few = 3
            without_ext = 0 - len(source_ext)
            ducktype = 0 - 3
            self.read_dir = source_dir
            self.write_dir = target_dir

            candidates = os.listdir(source_dir)
            worker_list = []
            set_list = []

            for candidate in candidates:
                    if candidate[ducktype:] == source_ext[ducktype:]:
                            worker_list.append(candidate[:without_ext])

            for worker in worker_list:
#            for worker in worker_list[:first_few]:
                set_list.append(worker)

            for set_ in set_list:
                self.extract_activities_from (set_)
                fmgt.processed_dir = fmgt.xml_couch_dir
                dst_file = fmgt.processed_dir + set_ + fmgt.xml_ext
                if os.path.exists(dst_file):
                    os.remove(dst_file)
                shutil.move(self.read_dir + set_ + fmgt.xml_ext,fmgt.processed_dir)

def main():
    set2element().work('example/','.xml','example/','.xml')
 
if __name__ == '__main__':
    main()

