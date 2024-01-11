import sys
import os

current_dir = os.path.dirname(__file__)
root_dir = os.path.abspath(os.path.join(current_dir, '..'))
sys.path.append(root_dir)
from app import app

def test_login_endpoint():
    with app.test_client() as client:
        login_data = {
            "email": "G@example.com",
            "password": "password1234"
        }
        try:
            response = client.post('http://localhost:4000/api/auth/login', json=login_data)
        except Exception as e:
            print("Exception occurred:", e)
        assert response.status_code == 200
        assert 'status' in response.json
        assert response.json['status'] == 'Success'
        
def test_login_failure_endpoint():
    with app.test_client() as client:
        login_data = {
            "email": "Goo@example.com",
            "password": "password1234"
        }
        try:
            response = client.post('http://localhost:4000/api/auth/login', json=login_data)
        except Exception as e:
            print("Exception occurred:", e)
        assert response.status_code == 404
        assert 'message' in response.json
        assert response.json['message'] == 'User not found'