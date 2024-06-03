import pymongo
import pandas as pd

# Replace the following with your MongoDB connection details
mongo_uri = 'mongodb://localhost:27017/'
database_name = 'optionChainData'
symbol = 'BANDHANBNK'
csv_file_name = 'output.csv'

# Connect to MongoDB
client = pymongo.MongoClient(mongo_uri)

# Access the database
db = client[database_name]

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
# If the collection is empty, handle it
if not data:
    print("No data found in the collection.")
else:
    # Create a DataFrame from the data
    df = pd.DataFrame(data)

    # Drop the MongoDB specific _id field if it exists
    if '_id' in df.columns:
        df = df.drop(columns=['_id'])

    # Write the DataFrame to a CSV file
    df.to_csv(csv_file_name, index=False)

    print(f"Data has been successfully written to {csv_file_name}")

# Close the MongoDB connection
client.close()
