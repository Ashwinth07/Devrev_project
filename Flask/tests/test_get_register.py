import sys
import os

current_dir = os.path.dirname(__file__)
root_dir = os.path.abspath(os.path.join(current_dir, '..'))
sys.path.append(root_dir)
from app import app

def test_get_register_endpoint():
    with app.test_client() as client:
        response = client.get('http://localhost:4000/api/auth/register')
        assert response.status_code == 200
        assert 'status' in response.json
        assert response.json['status'] == 'Success'

