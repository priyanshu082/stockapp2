from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import requests
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)
client = MongoClient('mongodb://localhost:27017/')
db = client['optionChainData']

@app.route('/expirydates', methods=['POST'])
def expiryDates():
    try:
        request_data = request.get_json()
        symbol = request_data.get('symbol')

        symbolCollection = db[symbol]
        data = symbolCollection.distinct('Expiry_Date')
    except:
        data = "Error"
    response = {"data": data}
    return jsonify(response)

@app.route('/strikeprices', methods=['POST'])
def strikePrices():
    try:
        request_data = request.get_json()
        symbol = request_data.get('symbol')
        expiryDate = request_data.get('expiryDate')
        noOfStrikes = int(request_data.get('noOfStrikes'))

        symbolCollection = db[symbol]
        data = [x for x in symbolCollection.find({'Expiry_Date': expiryDate}, {'_id':0})]
        allStikePrices = [x['Strike_Price'] for x in data]
        allStikePrices = set(allStikePrices)
        allStikePrices = list(allStikePrices)
        allStikePrices.sort()
        if len(allStikePrices) > noOfStrikes*2:
            elementsToLeave = len(allStikePrices)-noOfStrikes*2
            requiredStrikePrices = allStikePrices[elementsToLeave//2:(-1)*(elementsToLeave//2)] 
        else:
            requiredStrikePrices = allStikePrices

        data = requiredStrikePrices
    except:
        data = "Error"
    response = {"data": data}
    return jsonify(response)

@app.route('/all', methods=['POST'])
def allData():
    try:
        request_data = request.get_json()
        symbol = request_data.get('symbol')
        expiryDate = request_data.get('expiryDate')
        noOfStrikes = int(request_data.get('noOfStrikes'))
        timeRange = request_data.get('timeRange')
       

        startTime, endTime = timeRange.split('-')
        symbolCollection = db[symbol]

        data = [x for x in symbolCollection.find({'Expiry_Date': expiryDate, 'Time': {"$gte": startTime, '$lte': endTime }}, {'_id':0})]
        allStikePrices = [x['Strike_Price'] for x in data]
        allStikePrices = set(allStikePrices)
        allStikePrices = list(allStikePrices)
        allStikePrices.sort()
        if len(allStikePrices) > noOfStrikes*2:
            elementsToLeave = len(allStikePrices)-noOfStrikes*2
            requiredStrikePrices = allStikePrices[elementsToLeave//2:(-1)*(elementsToLeave//2)] 
        else:
            requiredStrikePrices = allStikePrices

        data = [x for x in data if x['Strike_Price'] in requiredStrikePrices]
        df = pd.DataFrame(data)

        df['S_C_Calls'] = df.groupby('Time')['C_Calls'].transform('sum')
        df['S_C_Puts'] = df.groupby('Time')['C_Puts'].transform('sum')
        df['S_COI_Calls'] = df.groupby('Time')['COI_Calls'].transform('sum')
        df['S_COI_Puts'] = df.groupby('Time')['COI_Puts'].transform('sum')
        df['R_S_COI'] = np.where(df["S_COI_Calls"] != 0, df['S_COI_Puts'] / df["S_COI_Calls"], np.nan)

        data = df.to_dict(orient='records')
    except:
        data = "Error"
    response = {"data": data}
    return jsonify(response)

@app.route('/commutativesum', methods=['POST'])
def CommutativeSumData():
    try:
        request_data = request.get_json()
        symbol = request_data.get('symbol')
        expiryDate = request_data.get('expiryDate')
        noOfStrikes = int(request_data.get('noOfStrikes'))
        timeInterval = int(request_data.get('timeInterval'))#2 4 6 8 10

        symbolCollection = db[symbol]
        
        data = [x for x in symbolCollection.find({'Expiry_Date': expiryDate}, {'_id':0})]
        allStikePrices = [x['Strike_Price'] for x in data]
        allStikePrices = set(allStikePrices)
        allStikePrices = list(allStikePrices)
        allStikePrices.sort()
        if len(allStikePrices) > noOfStrikes*2:
            elementsToLeave = len(allStikePrices)-noOfStrikes*2
            requiredStrikePrices = allStikePrices[elementsToLeave//2:(-1)*(elementsToLeave//2)] 
        else:
            requiredStrikePrices = allStikePrices

        data = [x for x in data if x['Strike_Price'] in requiredStrikePrices]
        df = pd.DataFrame(data)

        df['S_C_Calls'] = df.groupby('Time')['C_Calls'].transform('sum')
        df['S_C_Puts'] = df.groupby('Time')['C_Puts'].transform('sum')
        df['S_COI_Calls'] = df.groupby('Time')['COI_Calls'].transform('sum')
        df['S_COI_Puts'] = df.groupby('Time')['COI_Puts'].transform('sum')
        df['PC_Calls'] = df['S_C_Calls']/df['S_COI_Calls']
        df['PC_Puts'] = df['S_C_Puts']/df['S_COI_Puts']

        df = df.sort_values('Time')
        subDf = df[['Time', 'S_COI_Calls', 'S_C_Calls', 'PC_Calls', 'S_COI_Puts', 'S_C_Puts', 'PC_Puts']]
        subDf = subDf.drop_duplicates()

        data = subDf.to_dict(orient='records')[::timeInterval//2]
    except:
        data = "Error"
    response = {"data": data}
    return jsonify(response)

@app.route('/pcr', methods=['POST'])
def pcrData():
    try:
        request_data = request.get_json()
        symbol = request_data.get('symbol')
        expiryDate = request_data.get('expiryDate')
        noOfStrikes = int(request_data.get('noOfStrikes'))
        symbolCollection = db[symbol]

        data = [x for x in symbolCollection.find({'Expiry_Date': expiryDate}, {'_id':0})]
        allStikePrices = [x['Strike_Price'] for x in data]
        allStikePrices = set(allStikePrices)
        allStikePrices = list(allStikePrices)
        allStikePrices.sort()
        if len(allStikePrices) > noOfStrikes*2:
            elementsToLeave = len(allStikePrices)-noOfStrikes*2
            requiredStrikePrices = allStikePrices[elementsToLeave//2:(-1)*(elementsToLeave//2)] 
        else:
            requiredStrikePrices = allStikePrices

        data = [x for x in data if x['Strike_Price'] in requiredStrikePrices]
        df = pd.DataFrame(data)

        df['S_C_Calls'] = df.groupby('Time')['C_Calls'].transform('sum')
        df['S_C_Puts'] = df.groupby('Time')['C_Puts'].transform('sum')
        df['S_COI_Calls'] = df.groupby('Time')['COI_Calls'].transform('sum')
        df['S_COI_Puts'] = df.groupby('Time')['COI_Puts'].transform('sum')
        df['R_S_COI'] = np.where(df["S_COI_Calls"] != 0, df['S_COI_Puts'] / df["S_COI_Calls"], np.nan)
        df = df[['Time', 'R_S_COI', 'underlyingValue']]
        data = df.to_dict(orient='records')
    except:
        data = "Error"
    response = {"data": data}
    return jsonify(response)

@app.route('/price', methods=['POST'])
def priceData():
    try:
        request_data = request.get_json()
        symbol = request_data.get('symbol')

        symbolCollection = db[symbol]
        data = [x for x in symbolCollection.find({}, {'_id':0, "Time":1,  'underlyingValue':1})]
        df = pd.DataFrame(data)

        df  = df.drop_duplicates()

        data = df.to_dict(orient='records')
    except:
        data = "Error"
    response = {"data": data}
    return jsonify(response)

@app.route('/strikegraph', methods=['POST'])
def strikeGraph():
    try:
        request_data = request.get_json()
        symbol = request_data.get('symbol')
        expiryDate = request_data.get('expiryDate')
        strikePrice = int(request_data.get('strikePrice'))
        timeInterval = int(request_data.get('timeInterval'))#2 4 6 8 10

        symbolCollection = db[symbol]
        
        data = [x for x in symbolCollection.find({'Expiry_Date': expiryDate, 'Strike_Price': strikePrice}, {'_id':0, 'Time':1,'LTP_Calls':1, 'LTP_Puts':1,'underlyingValue':1})]
        df = pd.DataFrame(data)

        df.sort_values('Time')
        data = df.to_dict(orient='records')[::timeInterval//2]

    except:
        data = "Error"
    response = {"data": data}
    return jsonify(response) 

@app.route('/buysell', methods=['POST'])
def buySellData():
    try:
        request_data = request.get_json()
        symbol = request_data.get('symbol')
        expiryDate = request_data.get('expiryDate')
        strikePrice = int(request_data.get('strikePrice'))
        timeInterval = int(request_data.get('timeInterval'))#2 4 6 8 10

        symbolCollection = db[symbol]
        
        data = [x for x in symbolCollection.find({'Expiry_Date': expiryDate, 'Strike_Price': strikePrice}, {'_id':0, 'Time':1,'TotalBuyQuantity_Calls':1, 'TotalSellQuantity_Calls':1, 'TotalBuyQuantity_Puts':1, 'TotalSellQuantity_Puts':1})]
        df = pd.DataFrame(data)

        df.sort_values('Time')
        data = df.to_dict(orient='records')[::timeInterval//2]

    except:
        data = "Error"
    response = {"data": data}
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True,host="103.184.192.5")



