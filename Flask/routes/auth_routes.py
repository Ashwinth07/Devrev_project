from flask import Blueprint
from controllers.auth_controller import add_user, login, get_user, update_daily_food_count_to_zero, decrement_daily_food_count,increment_route,decrement_route,get_users,add_user_bulk,get_users_by_page
auth_routes = Blueprint('auth_routes', __name__)

auth_routes.route('/user', methods=['POST'])(add_user)
auth_routes.route('/userbulk', methods=['POST'])(add_user_bulk)
auth_routes.route('/userlogin', methods=['POST'])(login)
auth_routes.route('/users', methods=['GET'])(get_users_by_page)
# auth_routes.route('/users', methods=['GET'])(get_users)
auth_routes.route('/user', methods=['GET'])(get_user)
auth_routes.route('/user', methods=['PUT'])(update_daily_food_count_to_zero)
auth_routes.route('/users/<user_id>/increment', methods=['PUT'])(increment_route)
auth_routes.route('/users/<user_id>/decrement', methods=['PUT'])(decrement_route)