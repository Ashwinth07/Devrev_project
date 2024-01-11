from flask import Flask
import json,os
from app import app
from models.User import User
def test_register_endpoint():
    with app.test_client() as client:
        #Arrange
        data = {
            "employeeId": "PTIitt33e",
            "name": "Gandha",
            "email": "Ganaaa33e@example.com",
            "password": "password1234",
            "confirmpassword": "password1234",
            "contact": 12345678900
        }
        # Act
        try:
            response = client.post('http://localhost:4000/api/auth/register', json=data)
        except Exception as e:
            print("Exception occurred:", e)

        # Assert
        assert response.status_code == 200
        assert 'status' in response.json
        assert response.json['status'] == 'success'
        assert 'data' in response.json
        assert 'employeeId' in response.json['data']
        assert response.json['data']['employeeId'] == "PTIitt33e"
        assert response.json['data']['name'] == "Gandha"
        assert response.json['data']['email'] == "Ganaaa33e@example.com"
        assert response.json['data']['contact'] == 12345678900

def test_login_endpoint():
    with app.test_client() as client:
        # Arrange
        login_data = {
            "email": "Ganaaa33e@example.com",
            "password": "password1234"
        }

        # Act
        try:
            response = client.post('http://localhost:4000/api/auth/login', json=login_data)
        except Exception as e:
            print("Exception occurred:", e)
        assert response.status_code == 200
        assert 'status' in response.json
        assert response.json['status'] == 'Success'

def test_get_register_endpoint():
    with app.test_client() as client:
        response = client.get('http://localhost:4000/api/auth/register')
        assert response.status_code == 200

def test_increment_route():
    with app.test_client() as client:
        response = client.put(f'http://localhost:4000/api/auth/users/{userid}/increment')
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['message'] == 'Daily food count updated'

def test_decrement_route():
    with app.test_client() as client:
        response = client.put(f'http://localhost:4000/api/auth/users/{userid}/decrement')
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['message'] == 'Daily food count decremented'
def test_update_daily_food_count_to_zero():
    with app.test_client() as client:

        response = client.put('http://localhost:4000/api/auth/users/update')

        assert response.status_code == 200
        assert response.json['message'] == 'Daily food counts updated to zero for all users'

        updated_users = User.objects.all()

        for user in updated_users:
            assert user.dailyFoodCount == 0
if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True)
