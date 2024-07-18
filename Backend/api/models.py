from django.db import models
from db_connection import db

# Define MongoDB collections and their schemas

# Collection for users
users_collection = db["users"]

# Collection for products
products_collection = db["products"]

# Collection for orders
orders_collection = db["orders"]
