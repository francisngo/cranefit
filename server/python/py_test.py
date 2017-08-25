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
    print(df.head())
    # m = Prophet(weekly_seasonality=False, yearly_seasonality=False)
    m = Prophet()
    m.fit(df)
    future = m.make_future_dataframe(periods=31)
    print(future.tail())
    forecast = m.predict(future)
    print(forecast[['ds', 'yhat']].tail())

#start process
if __name__ == '__main__':
    main()