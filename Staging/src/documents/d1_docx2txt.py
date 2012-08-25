#!/Library/Frameworks/Python.framework/Versions/2.7/bin/python

import sys
sys.path.append("../")

import re, zipfile

class Docx2Txt():
    
    def __init__(self):
        self.inner_xml_path     = "word/document.xml"
        self.xml                = "xml tags with styling and content"
        self.tags_array         = []
        self.txt_chunk_in_tag   = re.compile('w:t[^><]*>([^><]*)</w:t')
        self.txt_chunk_array    = []
        self.text               = ""

    def work(self, filename):
        z         = zipfile.ZipFile(filename)
        self.xml     = z.open(self.inner_xml_path).read()
        self.tags_array = self.xml.split("><")

        for tag in self.tags_array:
            match = self.txt_chunk_in_tag.search(tag)
            if match:
                txt_chunk = match.group(1)
                self.txt_chunk_array.append(txt_chunk)

        for txt_chunk in self.txt_chunk_array:
            self.text = self.text + " " + txt_chunk
        
        return self.text

def main():
    print "Doc2Txt().work(docx) returns the raw txt in a docx word document"
    print Docx2Txt().work("./example/example.docx")

if __name__ == '__main__':
        main()


