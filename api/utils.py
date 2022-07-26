from pymongo import MongoClient

connection_string = 'mongodb+srv://Guillaume:guigui845@cluster0.qicsa.mongodb.net/?retryWrites=true&w=majority'

client = MongoClient(connection_string)

db = client['TaskListManager']

collection = db['Lists']