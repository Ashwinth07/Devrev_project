from mongoengine import Document, StringField, BooleanField, IntField, DateTimeField
from datetime import datetime, timedelta

class User(Document):
    employeeId = StringField(required=True)
    name = StringField(required=True)
    email = StringField(required=True)
    password = StringField(required=True)
    confirmpassword = StringField(required=True)
    contact = IntField(required=True)
    isAdmin = BooleanField(default=False)
    dailyFoodCount = IntField(default=0)
    lastDailyUpdate = DateTimeField(default=lambda: datetime.now() - timedelta(days=1))

    def __repr__(self):
        return f"User('{self.name}', '{self.email}')"
