import flask
import mysql.connector
from flask import Flask, jsonify, r

# Connect to MySQL database
def get_db_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",  # Your MySQL username
        password="",  # Your MySQL password
        database="food_delivery"  # Your database name
    )
    return connection

# Get food menu
@app.route('/api/menu', methods=['GET'])
def get_menu():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM menu')
    menu_items = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(menu_items)

# Add item to cart
@app.route('/api/cart', methods=['POST'])
def add_to_cart():
    item_data = request.json
    food_id = item_data['food_id']
    quantity = item_data['quantity']

    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute('INSERT INTO cart (food_id, quantity) VALUES (%s, %s)', (food_id, quantity))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'Item added to cart!'})

# Get all items in the cart
@app.route('/api/cart', methods=['GET'])
def get_cart():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM cart')
    cart_items = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(cart_items)

# Place an order
@app.route('/api/orders', methods=['POST'])
def place_order():
    order_data = request.json
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute('INSERT INTO orders (user_id, total_price) VALUES (%s, %s)', (order_data['user_id'], order_data['total_price']))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'Order placed successfully'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
