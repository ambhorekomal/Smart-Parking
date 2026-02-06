from flask_mysqldb import MySQL
from werkzeug.security import generate_password_hash, check_password_hash

mysql = MySQL()

def create_tables(app):
    cursor = mysql.connection.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(200) NOT NULL,
            car_number VARCHAR(20) NOT NULL
        )
    """)
    mysql.connection.commit()
    cursor.close()
