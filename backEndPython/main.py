import multiprocessing
import time
import pandas as pd
import numpy as np
import re
from datetime import datetime
import pytz
from pymongo import MongoClient
from nsepythonserver import nsefetch


def call_api(symbol):
    # MongoDB Connection
    client = MongoClient('mongodb://localhost:27017/')
    db = client['optionChainData']
    
    if symbol in ["NIFTY", "FINNIFTY", "BANKNIFTY", "MIDCPNIFTY"]:
        url = f"https://www.nseindia.com/api/option-chain-indices?symbol={symbol}"
    else:
        url = f"https://www.nseindia.com/api/option-chain-equities?symbol={symbol}"
        symbol = re.sub(r'[^a-zA-Z0-9]', '_', symbol) #to avoid special characters in table names

    try:
        data = nsefetch(url)
        data = data['records']
    except:
        return False

    underlyingValue = data['underlyingValue']
    timestamp = data['timestamp'][-8:]
    dataDate = data['timestamp'][:11]

    initialUnderlyingValueCollection = db['initialUnderlyingValues']
    symbolCollection = db[symbol]

    if not initialUnderlyingValueCollection.find_one({'symbol': symbol}):
        initialUnderlyingValueCollection.insert_one({'symbol': symbol, 'underlyingValue': underlyingValue})
        initialUnderlyingValue = underlyingValue
    else:
        if timestamp < '09:18:00':
            initialUnderlyingValueCollection.update_one({'symbol': symbol}, {'$set': {'underlyingValue': underlyingValue}})
        initialUnderlyingValue=initialUnderlyingValueCollection.find_one({'symbol': symbol})['underlyingValue']

    relevant_data = data['data']
    extracted_data = []

    for i in relevant_data:
        record = {
            'Date': dataDate,
            'Time': timestamp,
            'underlyingValue': underlyingValue,
            'Strike_Price': i['strikePrice'],
            'COI_Calls': 0 if i.get('CE', 0)==0 else i['CE']['changeinOpenInterest'],
            'COI_Puts': 0 if i.get('PE', 0)==0 else i['PE']['changeinOpenInterest'],
            'LTP_Calls': 0 if i.get('CE', 0)==0 else i['CE']['lastPrice'],
            'LTP_Puts': 0 if i.get('PE', 0)==0 else i['PE']['lastPrice'],
            'CLTP_Calls': 0 if i.get('CE', 0)==0 else i['CE']['change'],
            'CLTP_Puts': 0 if i.get('PE', 0)==0 else i['PE']['change'],
            'TotalBuyQuantity_Calls': 0 if i.get('CE', 0)==0 else i['CE']['totalBuyQuantity'],
            'TotalSellQuantity_Calls': 0 if i.get('CE', 0)==0 else i['CE']['totalSellQuantity'],
            'TotalBuyQuantity_Puts': 0 if i.get('PE', 0)==0 else i['PE']['totalBuyQuantity'],
            'TotalSellQuantity_Puts': 0 if i.get('PE', 0)==0 else i['PE']['totalSellQuantity'],
            'OpenInterest_Calls': 0 if i.get('CE', 0)==0 else i['CE']['openInterest'],
            'OpenInterest_Puts': 0 if i.get('PE', 0)==0 else i['PE']['openInterest'],
            'Expiry_Date': i['expiryDate']
        }
        extracted_data.append(record)

    df = pd.DataFrame(extracted_data)

    df['Expiry_Date'] = pd.to_datetime(df['Expiry_Date'], format='%d-%b-%Y')
    df = df.sort_values(by=['Expiry_Date', 'Strike_Price'])

    above_df = df[df['Strike_Price'] > initialUnderlyingValue].groupby('Expiry_Date').head(20)
    below_df = df[df['Strike_Price'] <= initialUnderlyingValue].groupby('Expiry_Date').tail(20)
    result_df = pd.concat([above_df, below_df], ignore_index=True)
    result_df = result_df.sort_values(by=['Expiry_Date', 'Strike_Price'])


    if symbolCollection.find_one({'Date':dataDate}):
        #expected error due to id col in collection
        past_all_df = pd.DataFrame(symbolCollection.find({'Date': dataDate}))
        past_all_df['Expiry_Date'] = pd.to_datetime(past_all_df['Expiry_Date'], format='%Y-%m-%d')
        # past_all_df = past_all_df.sort_values(by=['Time'])
        prev_df = past_all_df.tail(len(result_df))
        prev_df = prev_df.sort_values(by=['Expiry_Date', 'Strike_Price'])
        prev_df.reset_index(drop=True, inplace=True)
        result_df.reset_index(drop=True, inplace=True)

        result_df['C_Calls'] = result_df['COI_Calls'] - prev_df['COI_Calls']
        result_df['C_Puts'] = result_df['COI_Puts'] - prev_df['COI_Puts']
        result_df['C_CLTP_Calls'] = result_df['CLTP_Calls'] - prev_df['CLTP_Calls']
        result_df['C_CLTP_Puts'] = result_df['CLTP_Puts'] - prev_df['CLTP_Puts']
        result_df['C_Amt_Calls_Cr'] = (result_df['C_Calls']*132000)/10000000
        result_df['C_Amt_Puts_Cr'] = (result_df['C_Puts']*132000)/10000000

        # 1:-Short Covering		If prize is Increasing and OI is decresing.
        # 2:-Short Buildup		If prize is Decreasing and OI is Increasing.
        # 3:-Long Buildup		If prize is Increasing and OI is increasing.
        # 4:-Long Unwinding		If prize is decresing and OI is decresing.

        result_df['Long_Short_Calls'] = np.where((result_df['C_CLTP_Calls'] < 0) & (result_df['C_Calls'] > 0), 'Short Buildup ↓',
               np.where((result_df['C_CLTP_Calls'] < 0) & (result_df['C_Calls'] < 0), 'Long Unwinding ↓',
               np.where((result_df['C_CLTP_Calls'] > 0) & (result_df['C_Calls'] < 0), 'Short Covering ↑',
               np.where((result_df['C_CLTP_Calls'] > 0) & (result_df['C_Calls'] > 0), 'Long Buildup ↑', ''))))
        
        result_df['Long_Short_Puts'] = np.where((result_df['C_CLTP_Puts'] < 0) & (result_df['C_Puts'] > 0), 'Short Buildup ↓',
               np.where((result_df['C_CLTP_Puts'] < 0) & (result_df['C_Puts'] < 0), 'Long Unwinding ↓',
               np.where((result_df['C_CLTP_Puts'] > 0) & (result_df['C_Puts'] < 0), 'Short Covering ↑',
               np.where((result_df['C_CLTP_Puts'] > 0) & (result_df['C_Puts'] > 0), 'Long Buildup ↑', ''))))

        # if result_df['CLTP_Calls'] > 0 and result_df['C_Calls'] < 0:
        #     result_df['Long_Short_Calls'] = 'Short Covering' 
        # elif result_df['CLTP_Calls'] < 0 and result_df['C_Calls'] > 0:
        #     result_df['Long_Short_Calls'] = 'Short Buildup' 
        # elif result_df['CLTP_Calls'] > 0 and result_df['C_Calls'] > 0:
        #     result_df['Long_Short_Calls'] = 'Long Buildup' 
        # elif result_df['CLTP_Calls'] < 0 and result_df['C_Calls'] < 0:
        #     result_df['Long_Short_Calls'] = 'Long Unwinding' 

        # if result_df['CLTP_Puts'] > 0 and result_df['C_Puts'] < 0:
        #     result_df['Long_Short_Puts'] = 'Short Covering' 
        # elif result_df['CLTP_Puts'] < 0 and result_df['C_Puts'] > 0:
        #     result_df['Long_Short_Puts'] = 'Short Buildup' 
        # elif result_df['CLTP_Puts'] > 0 and result_df['C_Puts'] > 0:
        #     result_df['Long_Short_Puts'] = 'Long Buildup' 
        # elif result_df['CLTP_Puts'] < 0 and result_df['C_Puts'] < 0:
        #     result_df['Long_Short_Puts'] = 'Long Unwinding' 

    else:
        result_df['C_Calls'] = 0
        result_df['C_Puts'] = 0
        result_df['C_Amt_Calls_Cr'] = 0.0
        result_df['C_Amt_Puts_Cr'] = 0.0
        result_df['C_CLTP_Calls']=0
        result_df['C_CLTP_Puts']=0
        result_df['Long_Short_Calls'] = None
        result_df['Long_Short_Puts'] = None

    result_df['Expiry_Date'] = result_df['Expiry_Date'].dt.strftime('%Y-%m-%d')

    # currentTime =  datetime.now(pytz.timezone('Asia/Kolkata')).strftime("%H-%M-%S")
    if not symbolCollection.find_one({'Date': dataDate, 'Time': timestamp}):
        symbolCollection.insert_many(result_df.to_dict(orient='records'))

    return True

        
def call_batch(symbols):
    results = []
    for symbol in symbols:
        results.append(call_api(symbol))
    return results


def market_status():
    data=nsefetch('https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY')
    data=data['records']
    timestamp = data['timestamp'][-8:]
    if timestamp[0:5] == '15:30':
        return False
    else:
        return True

        

if __name__ == "__main__":
    IST = pytz.timezone('Asia/Kolkata') 
    while True:
        if not ('09:18:00' <= datetime.now(IST).strftime("%H:%M:%S") <= '15:33:00'):
            continue
        else:
            if market_status():
                while ('09:18:00' <= datetime.now(IST).strftime("%H:%M:%S") <= '15:35:00'):
                            start = time.time()

                            with open("/root/stockapp2/backEndPython/symbols.txt") as f:
                                data = f.readlines()

                            num_cores = multiprocessing.cpu_count()
                            symbols = [i.strip('\n') for i in data]
                            no_of_batches = 3*num_cores
                            avg_elements = len(symbols) // no_of_batches
                            remainder = len(symbols) % no_of_batches

                            symbol_batches = [symbols[i * avg_elements + min(i, remainder):(i + 1) * avg_elements + min(i + 1, remainder)] for i in range(no_of_batches)]       


                            # Use the number of CPU cores as the number of processes
                            with multiprocessing.Pool(processes=no_of_batches) as pool:
                                # Use the pool to map the worker function onto the tasks
                                results = pool.map(call_batch, symbol_batches)

                            flattened_list = [item for sublist in results for item in sublist]

                            print(f"\nPassed: {flattened_list.count(True)}\nFailed: {flattened_list.count(False)}")
                            end = time.time()

                            print(f'{end-start}')
                            print(datetime.now(IST).strftime("%d/%b/%Y %H:%M:%S"))
                            if end-start < 120:
                                time.sleep(120-(end-start))
            
            else:
                #to sleep on holiday for the hours in which market remains open
                time.sleep(25200)



        # with open("/root/stockapp2/backEndPython/symbols.txt") as f:
        #     data = f.readlines()

        # symbols = [i.strip('\n') for i in data]
        # num_cores = multiprocessing.cpu_count()
        # no_of_batches = 3*num_cores
        # avg_elements = len(symbols) // no_of_batches
        # remainder = len(symbols) % no_of_batches

        # symbol_batches = [symbols[i * avg_elements + min(i, remainder):(i + 1) * avg_elements + min(i + 1, remainder)] for i in range(no_of_batches)]       
        
        # while True:
        #     start = time.time()

        #     # Use the number of CPU cores as the number of processes
        #     with multiprocessing.Pool(processes=no_of_batches) as pool:
        #         # Use the pool to map the worker function onto the tasks
        #         results = pool.map(call_batch, symbol_batches)

        #     flattened_list = [item for sublist in results for item in sublist]

        #     print(f"\nPassed: {flattened_list.count(True)}\nFailed: {flattened_list.count(False)}")
        #     end = time.time()

        #     print(f'{end-start}\n')
        #     time.sleep(120-(end-start))