from models.User import User
import datetime
import bcrypt
from flask import jsonify

def register(data):
    try:
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(data['confirmpassword'].encode('utf-8'), salt)
        
        new_user = User(
            employeeId=data['employeeId'],
            name=data['name'],
            email=data['email'],
            password=hashed_password.decode('utf-8'),
            confirmpassword=hashed_password.decode('utf-8'),
            contact=data['contact'],
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
                
    except Exception as e:
        return jsonify({"status": "failure", "message": f"Registration failed: {str(e)}"}), 500
