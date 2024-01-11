from dotenv import load_dotenv
from mongoengine import connect
from pymongo import MongoClient
import os

load_dotenv()

def establish_mongo_connection():
    ENV = os.environ.get('FLASK_ENV', 'dev')

    if ENV == 'dev':
        DEV_URL = os.environ.get('DEV_URL')
        connect('foodbookingdev', host=DEV_URL)
        mongo_client = MongoClient(DEV_URL)
        mongo_db = mongo_client.foodbookingdev

        if mongo_db is not None:
            print("Connected to MongoDB")
        else:
            print("Failed to connect to MongoDB")
    else:
        DEV_URL = ''

    return mongo_db 
