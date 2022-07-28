from pymongo import MongoClient
import os

connection_string = os.environ.get("MONGO_URI")

client = MongoClient(f"{connection_string}")

db = client['TaskListManager']

collection = db['Lists']