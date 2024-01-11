from dotenv import load_dotenv
from mongoengine import connect
from pymongo import MongoClient
import os

load_dotenv()

def establish_mongo_connection():
    ENV = os.environ.get('FLASK_ENV', 'dev')

    if ENV == 'dev':
        PROD_URL = os.environ.get('PROD_URL')
        connect('foodbookingprod', host=PROD_URL)
        mongo_client = MongoClient(PROD_URL)
        mongo_db = mongo_client.foodbookingprod

        if mongo_db is not None:
            print("Connected to MongoDB")
        else:
            print("Failed to connect to MongoDB")
    else:
        PROD_URL = ''

    return mongo_db