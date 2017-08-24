## py_test.py
import pandas as pd
import numpy as np
from fbprophet import Prophet
import sys, json

#Read data from stdin and return first line
def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])

def main():
    df = pd.DataFrame(columns=['ds','y'])
    m = Prophet()
    m.fit(df)
    future = m.make_future_dataframe(periods=2)
    print(future)

#start process
if __name__ == '__main__':
    main()