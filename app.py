from flask import Flask, render_template, request, jsonify
from database import init_db, db
from models import Subscriber

app = Flask(__name__)
init_db(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.json
    full_name = data.get('full_name')
    email = data.get('email')

    if not full_name or not email:
        return jsonify({"error": "Full name and email are required"}), 400

    try:
        new_subscriber = Subscriber(full_name=full_name, email=email)
        db.session.add(new_subscriber)
        db.session.commit()
        return jsonify({"message": "Subscription successful"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
