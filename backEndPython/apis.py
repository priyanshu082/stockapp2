from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import requests
import pandas as pd
import numpy as np
from nsepython import nsefetch
import bcrypt
from datetime import datetime, timedelta


app = Flask(__name__)
CORS(app)
client = MongoClient('mongodb://localhost:27017/')
db = client['optionChainData']


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    mobile = data.get('mobile')
    password = data.get('password')

    if not name or not email or not password or not mobile:
        return jsonify({'message': 'Missing required fields'}), 400

    users_collection = db['users']
    existing_user = users_collection.find_one({'email': email},{'_id':0})
    if existing_user:
        return jsonify({'message': 'User already exists'}), 401

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    new_user = {'name': name, 'email': email, 'password': hashed_password, 'mobile': mobile}


    users_collection.insert_one(new_user)

    return jsonify({'data': {'name': name, 'email': email, 'mobile': mobile}}), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing email or password'}), 400

    users_collection = db['users']
    user = users_collection.find_one({'email': email},{'_id':0})

    if not user:
        return jsonify({'message': 'User does not exsists'}), 400
    
    if not bcrypt.checkpw(password.encode('utf-8'),user['password']):
        return jsonify({'message': 'Invalid password'}), 400

    user.pop('password')
    return jsonify({'data': user}), 200

@app.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.get_json()
    email = data.get('email')
    tenure = data.get('tenure')

    if not email or not tenure:
        return jsonify({'message': 'Missing required fields'}), 400
    
    users_collection = db['users']
    user = users_collection.find_one({'email': email},{'_id':0})

    if not user:
        return jsonify({'message': 'User does not exsists'}), 400

    subscribers_collection = db['subscribers']

    current_date = datetime.now()
    # Add n months to the current date
    future_date = current_date + timedelta(days=30 * tenure)

    new_subscriber = {'email': email, 'start': current_date.strftime("%Y-%m-%d") , 'end': future_date.strftime("%Y-%m-%d")}
    subscribers_collection.insert_one(new_subscriber)

    new_subscriber['_id'] = str(new_subscriber['_id'])
    return jsonify({'data': new_subscriber}), 200

@app.route('/issubscribed', methods=['POST'])
def isSubscribed():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({'message': 'Missing required fields'}), 400
    
    users_collection = db['users']
    user = users_collection.find_one({'email': email},{'_id':0})

    if not user:
        return jsonify({'message': 'User does not exsists'}), 400

    subscribers_collection = db['subscribers']
    subscriber = subscribers_collection.find_one({'email': email},{'_id':0})

    if not subscriber:
        return jsonify({'message': 'Subscriber does not exsists'}), 400

    end_date = datetime.strptime(subscriber['end'], "%Y-%m-%d")
    # Get the current date
    current_date = datetime.now()
    # Compare the future date with the current date

    if end_date >= current_date:
        return jsonify({'data': subscriber}), 200
        
    return jsonify({'message': 'Subscription expired'}), 400



@app.route('/ismarketopen', methods=['GET'])
def market_status():
    data=nsefetch('https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY')
    data=data['records']
    timestamp = data['timestamp'][-8:]

    if timestamp[0:5] == '15:30':
        return jsonify({"satatus": False})
    else:
        return jsonify({"satatus": True})


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
        # Replace np.nan with None
        df = df.replace({np.nan: None}) 

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
        df['PC_Calls'] = (df['S_C_Calls']/df['S_COI_Calls']).abs()
        df['PC_Puts'] = (df['S_C_Puts']/df['S_COI_Puts']).abs()

        df = df.sort_values('Time')
        subDf = df[['Time', 'S_COI_Calls', 'S_C_Calls', 'PC_Calls', 'S_COI_Puts', 'S_C_Puts', 'PC_Puts']]
        subDf = subDf.drop_duplicates()
        # Replace np.nan with None
        subDf = subDf.replace({np.nan: None})

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
        # Replace np.nan with None
        df = df.replace({np.nan: None})
        data = df.to_dict(orient='records')
    except:
        data = "Error"
    response = {"data": data}
    return jsonify(response)


@app.route('/screener', methods=['GET'])
def screener():
    try:
        # request_data = request.get_json()
        # noOfStrikes = int(request_data.get('noOfStrikes'))
        noOfStrikes = 12


        with open("/root/stockapp2/backEndPython/symbols.txt") as f:
            data = f.readlines()

        symbols = [i.removesuffix('\n') for i in data]

        result = []
        i=0
        for symbol in symbols:
   
            symbolCollection = db[symbol]
            
            expiryDate = symbolCollection.distinct('Expiry_Date')
            expiryDate.sort()
            expiryDate=expiryDate[0]
            data = [x for x in symbolCollection.find({'Expiry_Date': expiryDate} ,{'_id':0})]
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

            conditions = [
                (df['R_S_COI'] > 1.2),
                (df['R_S_COI'] < 0.7)
            ]
            choices = ['Bullish', 'Bearish']
            # Default choice if none of the conditions are met
            default_choice = 'Sideways'
            df['Trend'] = np.select(conditions, choices, default=default_choice)
           
            df = df[['Time', 'underlyingValue', 'R_S_COI', 'Trend']]
            df=df.sort_values(by=['Time'], ascending=False)
            df.reset_index(drop=True, inplace=True)
            result.append({})
            result[i]['symbol'] = symbol
            result[i]['Time'] = df.iloc[0, 0]
            result[i]['underlyingValue'] = df.iloc[0, 1]
            result[i]['R_S_COI'] = df.iloc[0, 2]
            result[i]['Trend'] = df.iloc[0, 3]
            i+=1

        data = result
    except Exception as e :
        data = f"Error {str(e)}"
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
        # Replace np.nan with None
        df = df.replace({np.nan: None})

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
        noOfStrikes = int(request_data.get('noOfStrikes'))


        symbolCollection = db[symbol]
        
        data1 = [x for x in symbolCollection.find({'Expiry_Date': expiryDate, 'Strike_Price': strikePrice}, {'_id':0, 'COI_Calls':1, 'COI_Puts':1,'underlyingValue':1})]
        df1 = pd.DataFrame(data1)

        data2 = [x for x in symbolCollection.find({'Expiry_Date': expiryDate}, {'_id':0, 'Time':1, 'Strike_Price':1, 'COI_Calls':1, 'COI_Puts':1})]
        allStikePrices = [x['Strike_Price'] for x in data2]
        allStikePrices = set(allStikePrices)
        allStikePrices = list(allStikePrices)
        allStikePrices.sort()
        if len(allStikePrices) > noOfStrikes*2:
            elementsToLeave = len(allStikePrices)-noOfStrikes*2
            requiredStrikePrices = allStikePrices[elementsToLeave//2:(-1)*(elementsToLeave//2)] 
        else:
            requiredStrikePrices = allStikePrices

        data2 = [x for x in data2 if x['Strike_Price'] in requiredStrikePrices]
        df2 = pd.DataFrame(data2)

        df2['S_COI_Calls'] = df2.groupby('Time')['COI_Calls'].transform('sum')
        df2['S_COI_Puts'] = df2.groupby('Time')['COI_Puts'].transform('sum')
        df2 = df2[['Time', 'S_COI_Calls', 'S_COI_Puts']]
        df2 = df2.drop_duplicates()
        df = pd.concat([df1.reset_index(drop=True), df2.reset_index(drop=True)], axis=1)

        df = df.sort_values('Time')
        # Replace np.nan with None
        df = df.replace({np.nan: None})
        data = df.to_dict(orient='records')[::timeInterval//2]
        # print(data)

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

        df = df.sort_values('Time')
        # Replace np.nan with None
        df = df.replace({np.nan: None})
        data = df.to_dict(orient='records')[::timeInterval//2]

    except:
        data = "Error"
    response = {"data": data}
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True,host="103.184.192.5")
    # app.run(debug=True)