import pytest
from unittest.mock import patch
from controllers.monthly_controller import bulk_upload_employees
from models.Monthly_data import MonthlyEmployeeData
from datetime import datetime
from flask import Flask

class MockResponse:
    def __init__(self, json_data, status_code):
        self.json_data = json_data
        self.status_code = status_code

    def json(self):
        return self.json_data

@pytest.fixture
def app():
    return Flask(__name__)

@pytest.fixture
def mock_requests_get(monkeypatch):
    def mock_get(*args, **kwargs):
        return MockResponse([
            {
                'employeeId': '123',
                'name': 'John Doe',
                'email': 'john@example.com',
                'contact': '1234567890',
                'dailyFoodCount': 3
            },
        ], 200)
    monkeypatch.setattr("controllers.monthly_controller.requests.get", mock_get)

@pytest.mark.parametrize('is_first_day', [True, False])
def test_bulk_upload_employees(app, mock_requests_get, monkeypatch, is_first_day):
    monkeypatch.setattr("datetime.datetime", lambda: datetime(2023, 1, 1) if is_first_day else datetime(2023, 1, 15))
    
    with patch('controllers.monthly_controller.requests.post') as mock_post:
        mock_post.return_value.status_code = 200
        
        with app.app_context():
            response = bulk_upload_employees()
    
    assert response[1] == 200
    assert response[0]['status'] == 'success' if is_first_day else 'info'
