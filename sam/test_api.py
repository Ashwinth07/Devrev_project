import unittest
from app import app
import json
from models.User import User
from models.Monthly_data import MonthlyEmployeeData


class TestEndpoints(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()
        self.client.testing = True
        self.userid = None

    def test_register_endpoint(self):
        data = {
            "employeeId": "P12345678",
            "name": "Gandha",
            "email": "qqqwertyssss12345678@example.com",
            "password": "password1234",
            "confirmpassword": "password1234",
            "contact": 123456789004
        }

        response = self.client.post('http://localhost:4000/api/auth/register', json=data)
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['status'], 'success')
        self.assertIn('data', response.json)
        user_data = response.json['data']
        self.assertEqual(user_data['employeeId'], "P12345678")
        self.assertEqual(user_data['name'], "Gandha")
        self.assertEqual(user_data['email'], "qqqwertyssss12345678@example.com")
        self.assertEqual(user_data['contact'], 12345678900)

    # def login_user(self, email, password):
    #     login_data = {
    #         "email": email,
    #         "password": password
    #     }

    #     response = self.client.post('http://localhost:4000/api/auth/login', json=login_data)

    #     self.assertEqual(response.status_code, 200)
    #     self.assertEqual(response.json['status'], 'Success')
    #     self.userid = response.json["data"]["_id"]

    # def test_increment_route(self):
    #     self.login_user("qqqwertyssss1234567@example.com", "password1234")
    #     response = self.client.put(f'http://localhost:4000/api/auth/users/{self.userid}/increment')
    #     self.assertEqual(response.status_code, 200)
    #     data = json.loads(response.data)
    #     self.assertEqual(data['message'], 'Daily food count updated')

    # def test_decrement_route(self):
    #     self.login_user("qqqwertyssss1234567@example.com", "password1234")

    #     response = self.client.put(f'http://localhost:4000/api/auth/users/{self.userid}/decrement')
    #     self.assertEqual(response.status_code, 200)
    #     data = json.loads(response.data)
    #     self.assertEqual(data['message'], 'Daily food count decremented')

        
    # def test_faile_increment_route(self):
    #     self.login_user("qqqwertyssss1234567@example.com", "password1234")
    #     response = self.client.put(f'http://localhost:4000/api/auth/users/876543zxbciovjxkbd/increment')
    #     self.assertEqual(response.status_code, 200)
    #     data = json.loads(response.data)
    #     self.assertEqual(data['message'], 'Daily food count updated')

    # def test_login_and_get_register_endpoint(self):
    #     self.login_user("qqqwertyssss1234567@example.com", "password1234")

    #     response = self.client.get('http://localhost:4000/api/auth/register')
    #     self.assertEqual(response.status_code, 200)
    # def test_login_failure(self):
    #     self.login_user("qqqwertyssss1234567@example.com", "password1234")

    #     response = self.client.get('http://localhost:4000/api/auth/register')
    #     self.assertEqual(response.status_code, 200)
    # def test_update_daily_food_count_to_zero(self):
    #     self.login_user("qqqwertyssss1234567@example.com", "password1234")

    #     response = self.client.put('http://localhost:4000/api/auth/users/update')
    #     self.assertEqual(response.status_code, 200)
    #     self.assertEqual(response.json['message'], 'Daily food counts updated to zero for all users')
    #     updated_users = User.objects.all()
    #     for user in updated_users:
    #         self.assertEqual(user.dailyFoodCount, 0)
    # def test_bulk_upload_employees_route(self):
    #     sample_data = [
    #         {
    #             'month': 12,
    #             'year': 2023,
    #             'employees': [
    #                 {
    #                     'employeeId': '123',
    #                     'name': 'John Doe',
    #                     'email': 'john@example.com',
    #                     'contact': '1234567890',
    #                     'dailyFoodCount': 3
    #                 },
    #             ]
    #         },
    #     ]

    #     payload = json.dumps(sample_data)
    #     headers = {'Content-Type': 'application/json'}

    #     response = self.client.post('http://localhost:4000/api/month/bulk-upload', data=payload, headers=headers)

    #     self.assertEqual(response.status_code, 200)
    #     stored_data = MonthlyEmployeeData.objects(month=12, year=2023).first()
    #     self.assertIsNotNone(stored_data) 

if __name__ == '__main__':
    unittest.main()
