import functools
from flask_socketio import disconnect
from flask_jwt_extended import JWTManager
from flask import request

jwt = JWTManager()