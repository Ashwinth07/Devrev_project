from flask import jsonify, request
import requests
from models.Monthly_data import MonthlyEmployeeData
from datetime import datetime

def bulk_upload_employees():
        current_date = datetime.now()
        previous_month = current_date.month
        previous_year = current_date.year
        response = requests.get('http://localhost:4000/api/auth/register')
        previous_month_data = response.json()
        today = datetime.now()
        is_first_day_of_month = 1
        
        mapped_data = [{
            'employeeId': employee['employeeId'],
            'name': employee['name'],
            'email': employee['email'],
            'contact': employee['contact'],
            'dailyFoodCount': employee['dailyFoodCount']
        } for employee in previous_month_data]

        if is_first_day_of_month:
            new_monthly_data = MonthlyEmployeeData(
                month=today.month,
                year=today.year,
                employees=[]
            )
            new_monthly_data.employees.extend(mapped_data)
            new_monthly_data.save()
            
            serialized_data = {
                'status': 'success',
                'data': {
                    'month': new_monthly_data.month,
                    'year': new_monthly_data.year,
                    'employees': [
                        {
                            'employeeId': emp['employeeId'],
                            'name': emp['name'],
                            'email': emp['email'],
                            'contact': emp['contact'],
                            'dailyFoodCount': emp['dailyFoodCount']
                        } for emp in new_monthly_data.employees
                    ]
                }
            }
            
            return jsonify({"status": "success", "data": serialized_data}), 200


