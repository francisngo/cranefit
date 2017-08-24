## py_test.py
import sys, json

#Read data from stdin and return first line
def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])

def main():
    #Write array from stdin reversed to stdout
    print(read_in()[::-1])

#start process
if __name__ == '__main__':
    main()