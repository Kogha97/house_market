import random
from faker import Faker
from app import app, db, House

fake = Faker("en_GB")


def generate_house_data(num=1000):
    houses = []
    for _ in range(num):
        address = fake.street_address()
        city = fake.city()
        price = random.randint(100000, 1000000)
        house = House(address=address,city=city, price=price)
        houses.append(house)
    return houses


def seed_database():
    houses = generate_house_data()
    db.session.bulk_save_objects(houses)
    db.session.commit()
    print(f"Inserted {len(houses)} fake houses into the database.")


if __name__ == "__main__":
    with app.app_context():
        db.drop_all()
        db.create_all()
        seed_database()
