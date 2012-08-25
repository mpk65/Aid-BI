#!/Library/Frameworks/Python.framework/Versions/2.7/bin/python

import sys
sys.path.append("../")
sys.path.append("/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/pdf")

from pdfparser import PDFDocument, PDFParser
from pdfinterp import PDFResourceManager, PDFPageInterpreter, process_pdf
from pdfdevice import PDFDevice#, TagExtractor
from converter import TextConverter#,XMLConverter, HTMLConverter 
from cmapdb import CMapDB
from layout import LAParams

class Pdf2Txt():
    
    def __init__(self):
        self.text        = ""

    def work(self, filename, inpath, outpath):
        password = ''
        pagenos = set()
        maxpages = 0
        caching = True

        debug = 0
        PDFDocument.debug = debug
        PDFParser.debug = debug
        CMapDB.debug = debug
        PDFResourceManager.debug = debug
        PDFPageInterpreter.debug = debug
        PDFDevice.debug = debug
        infile = inpath + filename + '.pdf'
        outfile = outpath + filename + '.txt'

        rsrcmgr = PDFResourceManager(caching=caching)
        outfp   = file(outfile, 'w')
        codec = 'utf-8'
        laparams = LAParams()
        imagewriter = None

        device  = TextConverter(rsrcmgr, outfp, codec=codec, laparams=laparams,imagewriter=imagewriter)

        fp      = file(infile, 'rb')

        process_pdf(rsrcmgr, device, fp, pagenos, maxpages=maxpages, password=password, caching=caching, check_extractable=True)

        fp.close()
        device.close()
        outfp.close()
        return

def main():
    print "<"
    Pdf2Txt().work('example','example/','example/')
    print ">"

if __name__ == '__main__':
        main()