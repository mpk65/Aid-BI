#!/Library/Frameworks/Python.framework/Versions/2.7/bin/python

import sys
sys.path.append("../")

import nltk
import re

class Txt2ID():

    def __init__(self):
        self.identifiers = []
        self.five_digits = re.compile('(\d{5,})')

    def work(self,txt):
        words = nltk.word_tokenize(txt)
        for word in words:
            found = self.five_digits.search(word)
            if found:
                identifier = found.group(1)
                self.identifiers.append(identifier)
        return self.identifiers

def main():
        t = Txt2ID()
        print "Txt2ID().work(txt) returns an array with possible identifiers:"
        print t.work(open("./example/example.txt").read())

if __name__ == '__main__':
        main()
