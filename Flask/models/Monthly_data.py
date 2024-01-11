from mongoengine import Document, IntField, ListField

class MonthlyEmployeeData(Document):
    month = IntField(required=True)
    year = IntField(required=True)
    employees = ListField(required=True)

    def __repr__(self):
        return f"MonthlyEmployeeData('{self.month}', '{self.year}')"
