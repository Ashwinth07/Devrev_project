from dotenv import load_dotenv
from mongoengine import connect
from pymongo import MongoClient
import os

load_dotenv()

def establish_mongo_connection():
    ENV = os.environ.get('FLASK_ENV', 'dev')

    if ENV == 'dev':
        MONGO_URI = os.environ.get('MONGO_URI')
        connect('foodbooking', host=MONGO_URI)
        mongo_client = MongoClient(MONGO_URI)
        mongo_db = mongo_client.foodbooking

        if mongo_db is not None:
            print("Connected to MongoDB")
        else:
            print("Failed to connect to MongoDB")
    else:
        MONGO_URI = ''

    return mongo_db 
