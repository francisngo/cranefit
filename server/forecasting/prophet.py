## py_test.py
import pandas as pd
import numpy as np
from fbprophet import Prophet
import sys, json

# Read data from stdin and return first line
def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])

def main():

    [dates, nums, period] = read_in()
    df = pd.DataFrame({'ds': dates, 'y': nums})
    m = Prophet()
    m.fit(df)
    future = m.make_future_dataframe(periods=period)
    forecast = m.predict(future)
    print(json.dumps({
      'ds': [str(x) for x in forecast.ds.values][-period:],
      'yhat': list(forecast.yhat.values[-period:])
    }))

# Start process
if __name__ == '__main__':
    main()
    