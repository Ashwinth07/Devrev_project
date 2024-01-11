import sys
import os,json

current_dir = os.path.dirname(__file__)
root_dir = os.path.abspath(os.path.join(current_dir, '..'))
sys.path.append(root_dir)
from models.User import User
from app import app

def test_decrement_route():
    with app.test_client() as client:
        response = client.put(f'http://localhost:4000/api/auth/users/6594ffce6b26c49e4d7d778a/decrement')
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['message'] == 'Daily food count decremented'

def test_failure_decrement_route():
    with app.test_client() as client:
        response = client.put(f'http://localhost:4000/api/auth/users/6594ffce6b26c49e4d7d778a/decrement')
        assert response.status_code == 403
        data = json.loads(response.data)
        assert data['message'] == 'Decrement already performed'

