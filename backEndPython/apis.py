from flask import Flask, jsonify, request, Response
from flask_cors import CORS
from pymongo import MongoClient
import requests
import pandas as pd
import numpy as np
from nsepython import nsefetch
import bcrypt
from datetime import datetime, timedelta
import pytz


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://103.184.192.5:3000"}})
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

    subscriber = subscribers_collection.find_one({'email': email},{'_id':0})
    if subscriber:
        subscribers_collection.update_many({'email':email}, {'$set': new_subscriber})
    else:
        subscribers_collection.insert_one(new_subscriber)

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
        return jsonify({"status": False})
    else:
        return jsonify({"status": True})

@app.route('/stocks', methods=['GET'])
def getStocks():

    with open("/root/stockapp2/backEndPython/symbols.txt") as f:
        data = f.readlines()
    symbols = [i.strip('\n') for i in data][4:]
    response = {'data': symbols}
    return jsonify(response)

@app.route('/expirydates', methods=['POST'])
def expiryDates():
    try:
        request_data = request.get_json()
        symbol = request_data.get('symbol')
        date = request_data.get('date')
        if date:
            date = datetime.strptime(date, '%Y-%m-%d').strftime('%d-%b-%Y')
        else:
            date = datetime.now(pytz.timezone('Asia/Kolkata')).strftime("%d-%b-%Y")
        print(symbol,date)

        symbolCollection = db[symbol]
        data = [x for x in symbolCollection.find({'Date': date}, {'_id':0})]
        data = [x['Expiry_Date'] for x in data] 
        data = list(set(data))
    except:
        data = "Error"
    response = {"data": data}
    return jsonify(response)

@app.route('/strikeprices', methods=['POST'])
def strikePrices():
    try:
        request_data = request.get_json()
        symbol = request_data.get('symbol')
        date = request_data.get('date')
        if date:
            date = datetime.strptime(date, '%Y-%m-%d').strftime('%d-%b-%Y')
        else:
            date = datetime.now(pytz.timezone('Asia/Kolkata')).strftime("%d-%b-%Y")
        expiryDate = request_data.get('expiryDate')
        noOfStrikes = int(request_data.get('noOfStrikes'))

        symbolCollection = db[symbol]
        data = [x for x in symbolCollection.find({'Date':date, 'Expiry_Date': expiryDate}, {'_id':0})]
        allStikePrices = [x['Strike_Price'] for x in data]
        allStikePrices = set(allStikePrices)
        allStikePrices = list(allStikePrices)
        allStikePrices.sort()
        if len(allStikePrices) - noOfStrikes*2 > 1:
            elementsToLeave = len(allStikePrices)-noOfStrikes*2
            requiredStrikePrices = allStikePrices[elementsToLeave//2:(-1)*(elementsToLeave//2)] 
        else:
            requiredStrikePrices = allStikePrices

        data = requiredStrikePrices
    except:
        data = "Error"
    response = {"data": data}
    return jsonify(response)

@app.route('/banner', methods=['GET'])
def getBanner():

    try:

        with open("/root/stockapp2/backEndPython/symbols.txt") as f:
            data = f.readlines()
        symbols = [i.strip('\n') for i in data][4:]

        data = []
        i=0
        for symbol in symbols:
            symbolCollection = db[symbol]
            dates = symbolCollection.distinct('Date')

            date_objects = [datetime.strptime(date, "%d-%b-%Y") for date in dates]

            # Sort the datetime objects in descending order
            sorted_date_objects = sorted(date_objects, reverse=True)

            # Convert the sorted datetime objects back to strings
            sorted_date_strings = [date.strftime("%d-%b-%Y") for date in sorted_date_objects]

            

            # Execute the aggregation pipeline
            currentPrice = symbolCollection.find({'Date': sorted_date_strings[0]}).sort('Time', -1).limit(1).next()['underlyingValue']
            prevClosePrice = symbolCollection.find({'Date': sorted_date_strings[1]}).sort('Time', -1).limit(1).next()['underlyingValue']

            data.append({})
            data[i]['symbol'] = symbol
            data[i]['underlyingValue'] = round(currentPrice,2)
            data[i]['change'] = round(currentPrice-prevClosePrice, 2)
            data[i]['pchange'] = round(((currentPrice-prevClosePrice)/prevClosePrice),2)
            i+=1

    except:
        data = "Error"
    response = {"data": data}
    return jsonify(response)

@app.route('/all', methods=['POST'])
def allData():
    try:
        request_data = request.get_json()
        symbol = request_data.get('symbol')
        date = request_data.get('date')
        if date:
            date = datetime.strptime(date, '%Y-%m-%d').strftime('%d-%b-%Y')
        else:
            date = datetime.now(pytz.timezone('Asia/Kolkata')).strftime("%d-%b-%Y")
        expiryDate = request_data.get('expiryDate')
        noOfStrikes = int(request_data.get('noOfStrikes'))
        timeRange = request_data.get('timeRange')
       

        startTime, endTime = timeRange.split('-')
        symbolCollection = db[symbol]

        data = [x for x in symbolCollection.find({'Date':date, 'Expiry_Date': expiryDate, 'Time': {"$gte": startTime, '$lte': endTime }}, {'_id':0, 'OpenInterest_Putss':0, 'OpenInterest_Puts':0})]
        allStikePrices = [x['Strike_Price'] for x in data]
        allStikePrices = set(allStikePrices)
        allStikePrices = list(allStikePrices)
        allStikePrices.sort()
        if len(allStikePrices) - noOfStrikes*2 > 1:
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
        df['R_S_COI'] = np.where(df["S_COI_Calls"] != 0, df['S_COI_Puts'] / df["S_COI_Calls"], 0) 

        data = df.to_dict(orient='records')
    except:
        data = "Error"
    response = {"data": data}
    return jsonify(response)

@app.route('/download', methods=['POST'])
def downloadData():
    try:
        request_data = request.get_json()
        symbol = request_data.get('symbol')
        date = request_data.get('date')
        if date:
            date = datetime.strptime(date, '%Y-%m-%d').strftime('%d-%b-%Y')
        else:
            date = datetime.now(pytz.timezone('Asia/Kolkata')).strftime("%d-%b-%Y")
        expiryDate = request_data.get('expiryDate')
        noOfStrikes = int(request_data.get('noOfStrikes'))

        symbolCollection = db[symbol]

        data = [x for x in symbolCollection.find({'Date':date, 'Expiry_Date': expiryDate}, {'_id':0})]
        allStikePrices = [x['Strike_Price'] for x in data]
        allStikePrices = set(allStikePrices)
        allStikePrices = list(allStikePrices)
        allStikePrices.sort()
        if len(allStikePrices) - noOfStrikes*2 > 1:
            elementsToLeave = len(allStikePrices)-noOfStrikes*2
            requiredStrikePrices = allStikePrices[elementsToLeave//2:(-1)*(elementsToLeave//2)] 
        else:
            requiredStrikePrices = allStikePrices

        data = [x for x in data if x['Strike_Price'] in requiredStrikePrices]
        df = pd.DataFrame(data)
        splitted_dfs = []
        for i in df["Time"].unique().tolist():

            temp_df = df[df["Time"]==i].reset_index(drop=True)

            temp_df['S_C_Calls'] = temp_df['C_Calls'].sum()
            temp_df['S_C_Puts'] = temp_df['C_Puts'].sum()
            temp_df['S_COI_Calls'] = temp_df['COI_Calls'].sum()
            temp_df['S_COI_Puts'] = temp_df['COI_Puts'].sum()
            temp_df['R_S_COI'] = np.where(temp_df["S_COI_Calls"] != 0, temp_df['S_COI_Puts'] / temp_df["S_COI_Calls"], np.nan)


            index_of_current_strikePrice = (temp_df['Strike_Price'] - temp_df['underlyingValue']).abs().idxmin()

            temp_df.loc[temp_df.index != index_of_current_strikePrice,['S_C_Calls', 'S_C_Puts', 'S_COI_Calls', 'S_COI_Puts', 'R_S_COI'] ] = np.nan

            temp_df = temp_df.replace({np.nan: ''})

            temp_df = temp_df.style.background_gradient(cmap='Blues', subset = ['COI_Calls', 'COI_Puts'])
            temp_df = temp_df.map(lambda s: 'background-color: yellow; color: black;', subset = pd.IndexSlice[index_of_current_strikePrice, :])
            temp_df = temp_df.map(lambda s: 'background-color: Tomato;', subset = pd.IndexSlice[0:index_of_current_strikePrice-1, ['C_Amt_Calls_Cr']])
            temp_df = temp_df.map(lambda s: 'background-color: MediumSeaGreen;', subset = pd.IndexSlice[index_of_current_strikePrice+1:, ['C_Amt_Puts_Cr']])

            def getColor(s):

                if s == 'Short Buildup ↓':
                    color = 'Tomato'
                elif s == 'Long Unwinding ↑':
                    color = 'orange'
                elif s == 'Short Covering ↑':
                    color = 'lightblue'
                elif s == 'Long Buildup ↓':
                    color = 'MediumSeaGreen'
                else:
                    color = 'None'

                return  f'background-color: {color};'

            temp_df.map(getColor, subset=['Long_Short_Calls', 'Long_Short_Puts'])

            temp_df.format(precision = 2)

            temp_df.set_properties(**{"border": "1px solid black"})

            splitted_dfs.append(temp_df) 


        result_df = splitted_dfs[0]
        for i in splitted_dfs[1:]:
            result_df = result_df.concat(i)
        html = result_df.to_html() # convert the DataFrame to HTML
        data = html.encode("utf-8")# encode the HTML string to bytes
    except Exception as e:
        data = (f"<p>Error: {e}</p>").encode("utf-8")
    response = Response(data, content_type='text/html')
    response.headers['Content-Disposition'] = 'attachment; filename=data.html'
    return response


@app.route('/commutativesum', methods=['POST'])
def CommutativeSumData():
    try:
        request_data = request.get_json()
        symbol = request_data.get('symbol')
        date = request_data.get('date')
        if date:
            date = datetime.strptime(date, '%Y-%m-%d').strftime('%d-%b-%Y')
        else:
            date = datetime.now(pytz.timezone('Asia/Kolkata')).strftime("%d-%b-%Y")
        expiryDate = request_data.get('expiryDate')
        noOfStrikes = int(request_data.get('noOfStrikes'))
        timeInterval = int(request_data.get('timeInterval'))#2 4 6 8 10

        symbolCollection = db[symbol]
        
        data = [x for x in symbolCollection.find({'Date':date, 'Expiry_Date': expiryDate}, {'_id':0})]
        allStikePrices = [x['Strike_Price'] for x in data]
        allStikePrices = set(allStikePrices)
        allStikePrices = list(allStikePrices)
        allStikePrices.sort()
        if len(allStikePrices) - noOfStrikes*2 > 1:
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
        df['PC_Calls'] = np.where(df["S_COI_Calls"] != 0, (df['S_C_Calls']/df['S_COI_Calls']).abs(), 0)
        df['PC_Puts'] = np.where(df["S_COI_Puts"] != 0, (df['S_C_Puts']/df['S_COI_Puts']).abs(), 0)

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
        date = request_data.get('date')
        if date:
            date = datetime.strptime(date, '%Y-%m-%d').strftime('%d-%b-%Y')
        else:
            date = datetime.now(pytz.timezone('Asia/Kolkata')).strftime("%d-%b-%Y")
        expiryDate = request_data.get('expiryDate')
        noOfStrikes = int(request_data.get('noOfStrikes'))
        symbolCollection = db[symbol]

        data = [x for x in symbolCollection.find({'Date':date, 'Expiry_Date': expiryDate}, {'_id':0})]
        allStikePrices = [x['Strike_Price'] for x in data]
        allStikePrices = set(allStikePrices)
        allStikePrices = list(allStikePrices)
        allStikePrices.sort()
        if len(allStikePrices) - noOfStrikes*2 > 1:
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
        df['R_S_COI'] = np.where(df["S_COI_Calls"] != 0, df['S_COI_Puts'] / df["S_COI_Calls"], 0)
        df = df[['Time', 'R_S_COI', 'underlyingValue']]

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
        date = datetime.now(pytz.timezone('Asia/Kolkata')).strftime("%d-%b-%Y")


        with open("/root/stockapp2/backEndPython/symbols.txt") as f:
            data = f.readlines()

        symbols = [i.removesuffix('\n') for i in data]

        result = []
        i=0
        for symbol in symbols:
            symbolCollection = db[symbol]
            expiryDates = [x for x in symbolCollection.find({'Date': date}, {'_id':0})]
            expiryDates = [x['Expiry_Date'] for x in data]    
            expiryDates.sort()
            expiryDate=expiryDates[0]
            data = [x for x in symbolCollection.find({'Date':date, 'Expiry_Date': expiryDate} ,{'_id':0})]
            allStikePrices = [x['Strike_Price'] for x in data]
            allStikePrices = set(allStikePrices)
            allStikePrices = list(allStikePrices)
            allStikePrices.sort()
            if len(allStikePrices) - noOfStrikes*2 > 1:
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
            df['R_S_COI'] = np.where(df["S_COI_Calls"] != 0, df['S_COI_Puts'] / df["S_COI_Calls"], 0).round(2)

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
        date = request_data.get('date')
        if date:
            date = datetime.strptime(date, '%Y-%m-%d').strftime('%d-%b-%Y')
        else:
            date = datetime.now(pytz.timezone('Asia/Kolkata')).strftime("%d-%b-%Y")

        symbolCollection = db[symbol]
        data = [x for x in symbolCollection.find({'Date':date}, {'_id':0, "Time":1,  'underlyingValue':1})]
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
        date = request_data.get('date')
        if date:
            date = datetime.strptime(date, '%Y-%m-%d').strftime('%d-%b-%Y')
        else:
            date = datetime.now(pytz.timezone('Asia/Kolkata')).strftime("%d-%b-%Y")
        expiryDate = request_data.get('expiryDate')
        strikePrice = int(request_data.get('strikePrice'))
        timeInterval = int(request_data.get('timeInterval'))#2 4 6 8 10
        noOfStrikes = int(request_data.get('noOfStrikes'))


        symbolCollection = db[symbol]

        data = [x for x in symbolCollection.find({'Date':date, 'Expiry_Date': expiryDate}, {'_id':0, 'Time':1, 'Strike_Price':1, 'COI_Calls':1, 'COI_Puts':1,'underlyingValue':1})]
        allStikePrices = [x['Strike_Price'] for x in data]
        allStikePrices = set(allStikePrices)
        allStikePrices = list(allStikePrices)
        allStikePrices.sort()
        if len(allStikePrices) - noOfStrikes*2 > 1:
            elementsToLeave = len(allStikePrices)-noOfStrikes*2
            requiredStrikePrices = allStikePrices[elementsToLeave//2:(-1)*(elementsToLeave//2)] 
        else:
            requiredStrikePrices = allStikePrices

        data = [x for x in data if x['Strike_Price'] in requiredStrikePrices]
        df = pd.DataFrame(data)

        df['S_COI_Calls'] = df.groupby('Time')['COI_Calls'].transform('sum')
        df['S_COI_Puts'] = df.groupby('Time')['COI_Puts'].transform('sum')
        df = df[df['Strike_Price']==strikePrice]
        df = df[['Time', 'S_COI_Calls', 'S_COI_Puts', 'COI_Calls', 'COI_Puts','underlyingValue']]
        df = df.sort_values('Time')

        data = df.to_dict(orient='records')[::timeInterval//2]
        # dd(data)

    except:
        data = "Error"
    response = {"data": data}
    return jsonify(response) 

@app.route('/buysell', methods=['POST'])
def buySellData():
    try:
        request_data = request.get_json()
        symbol = request_data.get('symbol')
        date = request_data.get('date')
        if date:
            date = datetime.strptime(date, '%Y-%m-%d').strftime('%d-%b-%Y')
        else:
            date = datetime.now(pytz.timezone('Asia/Kolkata')).strftime("%d-%b-%Y")
        expiryDate = request_data.get('expiryDate')
        strikePrice = int(request_data.get('strikePrice'))
        timeInterval = int(request_data.get('timeInterval'))#2 4 6 8 10
        
        symbolCollection = db[symbol]
        
        data = [x for x in symbolCollection.find({'Date':date, 'Expiry_Date': expiryDate, 'Strike_Price': strikePrice}, {'_id':0, 'Time':1,'TotalBuyQuantity_Calls':1, 'TotalSellQuantity_Calls':1, 'TotalBuyQuantity_Puts':1, 'TotalSellQuantity_Puts':1})]
        df = pd.DataFrame(data)

        df = df.sort_values('Time')

        data = df.to_dict(orient='records')[::timeInterval//2]

    except:
        data = "Error"
    response = {"data": data}
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True,host="103.184.192.5")
    # app.run(debug=True)