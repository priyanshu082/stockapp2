import pymongo

def drop_database(database_name, host='localhost', port=27017):
    # Establish connection to MongoDB
    client = pymongo.MongoClient(host, port)
    
    # List all available databases
    database_names = client.list_database_names()

    # Check if the specified database exists
    if database_name in database_names:
        # Drop the specified database
        client.drop_database(database_name)
        print(f"Database '{database_name}' dropped successfully.")
    else:
        print(f"Database '{database_name}' does not exist.")

    # Close the connection
    client.close()

if __name__ == "__main__":
    # Change these parameters as per your MongoDB setup
    database_name = "optionChainData"
    host = "localhost"
    port = 27017

    # Call the function to drop the database
    drop_database(database_name, host, port)
