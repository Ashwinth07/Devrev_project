import queue
from flask import jsonify, request
from models.User import User
from mongoengine import DoesNotExist
from bcrypt import hashpw, gensalt
import datetime
from pymongo import MongoClient,InsertOne
import bcrypt
import threading 
from queue import Queue

def add_user():
    try:
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(request.json['confirmpassword'].encode('utf-8'), salt)
        
        new_user = User(
            employeeId=request.json['employeeId'],
            name=request.json['name'],
            email=request.json['email'],
            password=hashed_password.decode('utf-8'),
            confirmpassword=hashed_password.decode('utf-8'),
            contact=request.json['contact'],
            isAdmin=False,
            dailyFoodCount=0,
            lastDailyUpdate=(datetime.datetime.now() - datetime.timedelta(days=1))
        )
        new_user.save()

        serialized_user = {
            '_id': str(new_user.id),
            'employeeId': new_user.employeeId,
            'name': new_user.name,
            'email': new_user.email,
            'contact': new_user.contact,
            'isAdmin': new_user.isAdmin,
            'dailyFoodCount': new_user.dailyFoodCount,
            'lastDailyUpdate': new_user.lastDailyUpdate.strftime('%Y-%m-%d') if new_user.lastDailyUpdate else None
        }

        return jsonify({"status": "success", "data": serialized_user}), 200
    except:
        return jsonify({"status": "failed", "error": "Registration failed. Please check your input and try again."}), 400

def add_user_bulk():
    client = MongoClient('mongodb://localhost:27017/foodbookingprod')
    db = client['foodbookingprod']
    collection = db['user']

    salt = bcrypt.gensalt()
    num_records = 10000

    for i in range(num_records):
        hashed_password = bcrypt.hashpw(f"password{i}".encode('utf-8'), salt)
        
        new_user = {
            'employeeId': f"EMP",
            'name': f"User",
            'email': f"user{i}@example.com",
            'password': hashed_password.decode('utf-8'),
            'confirmpassword': hashed_password.decode('utf-8'),
            'contact': f"Contact",
            'isAdmin': False,
            'dailyFoodCount': 0,
            'lastDailyUpdate': datetime.datetime.now() - datetime.timedelta(days=1)
        }

        collection.insert_one(new_user)

    return {"status": "success", "message": "inserted successfully."}

def login():
    try:
        user = User.objects.get(email=request.json['email'])
        if user and bcrypt.checkpw(request.json['password'].encode('utf-8'), user.password.encode('utf-8')):
            serialized_user = {
                '_id': str(user.id),
                'employeeId': user.employeeId,
                'name': user.name,
                'email': user.email,
                'contact': user.contact,
                'isAdmin': user.isAdmin,
                'dailyFoodCount': user.dailyFoodCount,
                'lastDailyUpdate': user.lastDailyUpdate.strftime('%Y-%m-%d') if user.lastDailyUpdate else None
            }
            return jsonify({"status": "Success", "data": serialized_user}), 200
    except:
        return jsonify({"message": "User not found"}), 404

def get_users():
    users = User.objects.all()
    serialized_users = []

    for user in users:
        serialized_user = {
            '_id': str(user.id),
            'employeeId': user.employeeId,
            'name': user.name,
            'email': user.email,
            'contact': user.contact,
            'isAdmin': user.isAdmin,
            'dailyFoodCount': user.dailyFoodCount,
            'lastDailyUpdate': user.lastDailyUpdate.strftime('%Y-%m-%d') if user.lastDailyUpdate else None
        }
        serialized_users.append(serialized_user)

    return jsonify({"status": "Success", "data": serialized_users}), 200

def increment_route(user_id):
    check_result = check_daily_update(user_id)
    print(check_result[1])
    if check_result[1] == 200:
        increment_result = increment_daily_food_count(user_id)
        return increment_result
    else:
        return jsonify({"message": "Daily update already performed"}), 403

def get_user():
    user_id = request.args.get('_id')
    page = request.args.get('page',type=int)
    page_size = request.args.get('page_size',type=int)

    response_data = {}

    if user_id:
        user_data = User.objects.filter(id=user_id).first()
        if user_data:
            users_before = User.objects.filter(id__lt=user_id).count()
            users_in_page = users_before // page_size + 1
            print(users_before)
            print(users_in_page)
            
            if users_in_page == page:
                response_data = {
                    'user_id': str(user_data.id),
                    'name': user_data.name,
                    'email': user_data.email,
                    'contact': user_data.contact,
                    'isAdmin': user_data.isAdmin,
                    'dailyFoodCount': user_data.dailyFoodCount,
                    'lastDailyUpdate': user_data.lastDailyUpdate.strftime('%Y-%m-%d') if user_data.lastDailyUpdate else None
                }
                return jsonify({"status": "Success", "data": response_data}),200
            else:
                return jsonify({"message": "User is not in the range of the requested page","status": "Error"})
        else:
            return jsonify({"status": "Error", "message":"User not found"}), 404

def check_daily_update(user_id):
        user = User.objects.get(id=user_id)
        print("hi")
        if user:
            today = datetime.datetime.now()
            print(today)
            if user.lastDailyUpdate and str(user.lastDailyUpdate.strftime('%Y-%m-%d')) == today.strftime('%Y-%m-%d'):
                return jsonify({"message": "Daily update already performed"}), 403
            else:
                return jsonify({}), 200

def increment_daily_food_count(user_id):
        user = User.objects.get(id=user_id)
        if user:
            user.dailyFoodCount += 1
            user.lastDailyUpdate = datetime.datetime.now()
            user.save()
            serialized_user = {
                '_id': str(user.id),
                'employeeId': user.employeeId,
                'name': user.name,
                'email': user.email,
                'contact': user.contact,
                'isAdmin': user.isAdmin,
                'dailyFoodCount': user.dailyFoodCount,
                'lastDailyUpdate': user.lastDailyUpdate.strftime('%Y-%m-%d') if user.lastDailyUpdate else None
            }
            return jsonify({"message": "Daily food count updated", "user": serialized_user}), 200

def decrement_route(user_id):
    check_result = check_updated(user_id)
    if check_result[1] != 403:
        decrement_result = decrement_daily_food_count(user_id)
        return decrement_result
    else:
        return jsonify({"message": "Decrement already performed"}), 403

def check_updated(user_id):
        user = User.objects.get(id=user_id)
        today = datetime.datetime.now()
        if user.lastDailyUpdate and str(user.lastDailyUpdate.strftime('%Y-%m-%d')) != today.strftime('%Y-%m-%d'):
            return jsonify({"message": "You have not booked today"}), 403
        return jsonify({"message": "Proceeding with the request"}), 200

def decrement_daily_food_count(user_id):
        user = User.objects.get(id=user_id)
        if user:
            user.dailyFoodCount -= 1
            user.lastDailyUpdate = datetime.datetime.now() - datetime.timedelta(days=1)
            user.save()
            serialized_user = {
                '_id': str(user.id),
                'employeeId': user.employeeId,
                'name': user.name,
                'email': user.email,
                'contact': user.contact,
                'isAdmin': user.isAdmin,
                'dailyFoodCount': user.dailyFoodCount,
                'lastDailyUpdate': user.lastDailyUpdate.strftime('%Y-%m-%d') if user.lastDailyUpdate else None
            }
            return jsonify({"message": "Daily food count decremented", "user": serialized_user}), 200

def update_daily_food_count_to_zero():
        users = User.objects.all()
        for user in users:
            user.dailyFoodCount = 0
            user.lastDailyUpdate = (datetime.datetime.now() - datetime.timedelta(days=1))
            user.save()
        serialized_users = [{
            '_id': str(user.id),
            'employeeId': user.employeeId,
            'name': user.name,
            'email': user.email,
            'contact': user.contact,
            'isAdmin': user.isAdmin,
            'dailyFoodCount': user.dailyFoodCount,
            'lastDailyUpdate': user.lastDailyUpdate.strftime('%Y-%m-%d') if user.lastDailyUpdate else None
        } for user in users]
        
        return jsonify({"message": "Daily food counts updated to zero for all users", "users": serialized_users}), 200

def get_users_by_page():
    try:
        page = request.args.get('page',type=int)
        print(page)
        page_size = 20
        
        if page < 1:
            return jsonify({"status": "Error", "message": "Page number should be greater than 0"}), 400

        offset = (page - 1) * page_size
        users = User.objects.skip(offset).limit(page_size)

        serialized_users = [{
            '_id': str(user.id),
            'employeeId': user.employeeId,
            'name': user.name,
            'email': user.email,
            'contact': user.contact,
            'isAdmin': user.isAdmin,
            'dailyFoodCount': user.dailyFoodCount,
            'lastDailyUpdate': user.lastDailyUpdate.strftime('%Y-%m-%d') if user.lastDailyUpdate else None
        } for user in users]

        return jsonify({"status": "Success", "data": serialized_users}), 200

    except:
        return jsonify({"status": "Error", "message": "Invalid page number or page size"}), 40