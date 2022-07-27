from pymongo import MongoClient
import os

connection_string = os.environ.get("MONGO_URI", 'dev default value')

client = MongoClient(f"{connection_string}")

print(client)

db = client['TaskListManager']

collection = db['Lists']