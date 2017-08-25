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

    [dates, nums] = read_in()
    df = pd.DataFrame({'ds': dates, 'y': nums})
    # m = Prophet(weekly_seasonality=False, yearly_seasonality=False)
    m = Prophet()
    m.fit(df)
    future = m.make_future_dataframe(periods=31)
    forecast = m.predict(future)
    print(list(forecast.yhat.values))

#start process
if __name__ == '__main__':
    main()