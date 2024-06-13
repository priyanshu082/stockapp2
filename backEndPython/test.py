from pymongo import MongoClient
from datetime import datetime, timedelta
import pytz

with open("/root/stockapp2/backEndPython/symbols.txt") as f:
    data = f.readlines()

symbols = [i.strip('\n') for i in data]
client = MongoClient('mongodb://localhost:27017/')
db = client['optionChainData']

date = datetime.now(pytz.timezone('Asia/Kolkata')).strftime("%d-%b-%Y")

for i in symbols:
    symbolCollection = db[i]
    symbolCollection.update_many({}, {"$set":{'Date':date}})
