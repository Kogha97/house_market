import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)


DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class House(db.Model):
    __tablename__ = 'houses'
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'address': self.address,
            'city': self.city,
            'price': self.price
        }


@app.route('/api/houses', methods=['GET'])
def get_houses():
    houses = House.query.all()
    return jsonify([house.to_dict() for house in houses])

@app.route('/api/search', methods=['GET'])
def search_houses():
    query = request.args.get('query', '').strip()

    if not query:
        return jsonify([])
    
    results = House.query.filter(House.address.ilike(f'%{query}%')).all()
    return jsonify([house.to_dict() for house in results])

if __name__ == '__main__':
    app.run(debug=False)
