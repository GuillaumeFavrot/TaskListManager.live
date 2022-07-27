from pymongo import MongoClient
import os

connection_string = os.environ.get("MONGO_URI", 'dev default value')

print(connection_string)

client = MongoClient(connection_string)

db = client['TaskListManager']

collection = db['Lists']