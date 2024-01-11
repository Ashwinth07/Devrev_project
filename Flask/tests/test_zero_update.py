import sys
import os,json

current_dir = os.path.dirname(__file__)
root_dir = os.path.abspath(os.path.join(current_dir, '..'))
sys.path.append(root_dir)
from models.User import User
from app import app
def test_update_daily_food_count_to_zero():
    with app.test_client() as client:

        response = client.put('http://localhost:4000/api/auth/users/update')

        assert response.status_code == 200
        assert response.json['message'] == 'Daily food counts updated to zero for all users'

        updated_users = User.objects.all()

        for user in updated_users:
            assert user.dailyFoodCount == 0