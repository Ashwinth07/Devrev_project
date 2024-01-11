from flask import Flask, jsonify
from flask_cors import CORS
from routes.auth_routes import auth_routes
from routes.monthly_routes import monthly_routes
from Connections.prodconnect import establish_mongo_connection

app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/api/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE"]}})
mongo_db = establish_mongo_connection()
@app.route('/api/check-connection')
def test_connection():
    try:
        if mongo_db:
            return jsonify({"message": "Connected to MongoDB"})
        else:
            return jsonify({"message": "Failed to connect to MongoDB"}), 500
    except Exception as e:
        return jsonify({"message": "Failed to connect to MongoDB", "error": str(e)}), 500
app.register_blueprint(auth_routes)
app.register_blueprint(monthly_routes)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=4000, debug=True)