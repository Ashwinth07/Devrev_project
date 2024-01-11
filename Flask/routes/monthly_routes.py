from flask import Blueprint
from controllers.monthly_controller import bulk_upload_employees

monthly_routes = Blueprint('monthly_routes', __name__)

monthly_routes.route('/api/month/bulk-upload', methods=['POST'])(bulk_upload_employees)