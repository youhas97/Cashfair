import functools
from flask_socketio import disconnect, emit, SocketIO
import re
import json

from . import controller as con
from . import whitelist
from .auth import authenticated_only
from .models import User

from flask import request

from flask_jwt_extended import jwt_required, get_jwt_identity

socketio = SocketIO(cors_allowed_origins=whitelist, logger=True, engineio_logger=True)

@socketio.on("disconnect")
def disconnect_handler():
  print("---------------- DISCONNECTED ----------------")

@socketio.on("connect")
@jwt_required(locations=["cookies"])
def connect_handler():
  # if current_user.is_authenticated:
  #   emit('my response',
  #     {'message': '{0} has joined'.format(current_user.name)},
  #     broadcast=True)
  # else:
  #   return False  # not allowed here
  print("---------------- CONNECTED ----------------")

@socketio.on("protected")
@jwt_required(locations=["cookies"])
def protected_handler():
  print("USER: " + User.query.get(get_jwt_identity()).phoneNum)