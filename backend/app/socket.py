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
  phoneNum = User.query.get(get_jwt_identity()).phoneNum
  print("USER: " + phoneNum)
  print("---------------- CONNECTED ----------------")

  emit("balance", con.get_balance(phoneNum))


@socketio.on("register_payment")
def register_payment(payload):
  payload = json.loads(payload)
  resp = con.register_payment(
    payload["user_phone"],
    payload["payment_phone"],
    payload["payment_nickname"],
    payload["payment_amount"]
  )
  emit("register_payment_response", json.dumps(resp))

  if resp["success"]:
    emit("balance_update", json.dumps(con.get_balance(payload["user_phone"])))



@socketio.on("get_balance")
def get_balance(phoneNum):
  emit("balance_update", json.dumps(con.get_balance(phoneNum)))
