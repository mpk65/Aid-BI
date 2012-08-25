#!/Library/Frameworks/Python.framework/Versions/2.7/bin/python

import sys
sys.path.append("../")

from calais.calais import Calais

class Txt2Entities():

    def __init__(self):
        self.api_key     = "66huxe9uzz3bsx2tfmvu7a8n"
        self.analysis     = "analysis"
        
    def work(self, txt):
        calais = Calais(self.api_key, submitter="www.nivocer.com")
        self.analysis = calais.analyze(txt)
        return self.analysis

def main():
    t = Txt2Entities()
    print "Txt2Entities().work(txt) returns a Calais semantically annotated txt as json:"
    print t.work(open("./example/example.txt").read())
    t.analysis.print_summary()
    t.analysis.print_entities()
    t.analysis.print_topics()
    t.analysis.print_relations()

if __name__ == '__main__':
    main()
