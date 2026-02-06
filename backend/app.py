from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
from models import mysql, create_tables
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
mysql.init_app(app)

# create tables
with app.app_context():
    create_tables(app)

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    car_number = data.get("carNumber")

    # Validation
    if not all([name, email, password, car_number]):
        return jsonify({"error": "All fields are required"}), 400

    hashed_password = generate_password_hash(password)

    cursor = mysql.connection.cursor()
    try:
        cursor.execute(
            "INSERT INTO users (name, email, password, car_number) VALUES (%s, %s, %s, %s)",
            (name, email, hashed_password, car_number)
        )
        mysql.connection.commit()
        return jsonify({"message": "Registration successful"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
    user = cursor.fetchone()
    cursor.close()

    if user and check_password_hash(user[3], password):
        return jsonify({
            "message": f"Welcome back, {user[1]}!",
            "name": user[1],
            "carNumber": user[4]
        })
    return jsonify({"error": "Invalid credentials"}), 401

@app.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.json
    email = data.get("email")
    new_password = data.get("newPassword")

    hashed_password = generate_password_hash(new_password)

    cursor = mysql.connection.cursor()
    cursor.execute("UPDATE users SET password=%s WHERE email=%s", (hashed_password, email))
    mysql.connection.commit()
    cursor.close()
    return jsonify({"message": "Password updated successfully"})

@app.route("/feedback", methods=["POST"])
def feedback():
    data = request.json
    name = data.get("name")
    car_num = data.get("carNumber")  # optional
    message = data.get("message")

    if not name or not message:
        return jsonify({"error": "Name and feedback message are required"}), 400

    cursor = mysql.connection.cursor()
    try:
        cursor.execute(
            "INSERT INTO feedback (name, car_num, message) VALUES (%s, %s, %s)",
            (name, car_num, message)
        )
        mysql.connection.commit()
        return jsonify({"message": "Feedback submitted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()



if __name__ == "__main__":
    app.run(debug=True)
