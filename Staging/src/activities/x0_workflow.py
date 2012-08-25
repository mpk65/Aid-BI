#!/Library/Frameworks/Python.framework/Versions/2.7/bin/python

import sys
sys.path.append("../")

from x1_set2element import set2element 
from x2_element2couch import element2couch 
from filemgt.filemgt import Filemgt
fmgt = Filemgt()

def main():
    set2element().work(fmgt.xmls_dir,fmgt.xml_ext,fmgt.xml_dir,fmgt.xml_ext)
    element2couch().work()
    print "\nActivities from " + fmgt.xmls_dir + " pre-processed and couched to " + fmgt.activities_couch

if __name__ == '__main__': 
    main()