import sys
import os

current_dir = os.path.dirname(__file__)
root_dir = os.path.abspath(os.path.join(current_dir, '..'))
sys.path.append(root_dir)
from app import app


def test_register_endpoint():
    with app.test_client() as client:
        #Arrange
        data = {
            "employeeId": "goo",
            "name": "Gandha",
            "email": "G@example.com",
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
        assert response.json['data']['employeeId'] == "goo"
        assert response.json['data']['name'] == "Gandha"
        assert response.json['data']['email'] == "G@example.com"
        assert response.json['data']['contact'] == 12345678900

def test_register_failure_endpoint():
    with app.test_client() as client:
        #Arrange
        data = {
            "employeeId": "PTIN0010",
            "name": "Sabi",
            "email": "sabi@gmail.com",
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
        assert response.status_code == 400
        assert 'status' in response.json
        assert response.json['status'] == 'failed'
        assert 'error' in response.json


# from flask import Flask
# import sys
# import os

# current_dir = os.path.dirname(__file__)
# root_dir = os.path.abspath(os.path.join(current_dir, '..'))
# sys.path.append(root_dir)
# from TestController.test_auth_controller import register

# def test_register_endpoint():
#     with Flask(__name__).test_request_context():
#         # Arrange
#         data = {
#             "employeeId": "PTIitt33ee",
#             "name": "Gandha",
#             "email": "Ganaaa33ee@example.com",
#             "password": "password1234",
#             "confirmpassword": "password1234",
#             "contact": 12345678900
#         }
#         # Act
#         response, _ = register(data)

#         # Assert
#         assert response.status_code == 200
#         assert 'status' in response.json
#         assert response.json['status'] == 'success'
#         assert 'data' in response.json
#         assert 'employeeId' in response.json['data']
#         assert response.json['data']['employeeId'] == "PTIitt33ee"
#         assert response.json['data']['name'] == "Gandha"
#         assert response.json['data']['email'] == "Ganaaa33ee@example.com"
#         assert response.json['data']['contact'] == 12345678900

