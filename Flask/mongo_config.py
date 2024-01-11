import os
from dotenv import load_dotenv
load_dotenv()
ENVV = os.environ.get('FLASK_ENV', 'dev')
MONGODB_SETTINGS = {
    'db': 'foodbooking',
    'host': os.environ.get('MONGO_URL'),
    'connect': False
}
MONGODB_PROD_SETTINGS={
    'db': 'foodbookingprod',
    'host': os.environ.get('PROD_URL'),
    'connect': False
}
MONGODB_DEV_SETTINGS={
    'db': 'foodbookingdev',
    'host': os.environ.get('DEV_URL'),
    'connect': False
}