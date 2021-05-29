import functools
from flask_socketio import disconnect, emit, SocketIO
import json

from . import controller as con
from . import whitelist
from .auth import authenticated_only
from .models import User

from flask import request

from flask_jwt_extended import jwt_required, get_jwt_identity

socketio = SocketIO(cors_allowed_origins=whitelist, logger=True, engineio_logger=True, always_connect=True)

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
  user = User.query.get(get_jwt_identity())
  print("---------------- CONNECTED ----------------")

  payload = {
    "phone_num": user.phone_num,
    "nickname": user.nickname
  }
  emit("user_data", json.dumps(payload))


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
def get_balance(phone_num):
  emit("balance_update", json.dumps(con.get_balance(phone_num)))


@socketio.on("create_group")
def create_group(payload):
  payload = json.loads(payload)
  resp = con.create_group(
    payload["name"],
    payload["members"]
  )

  print("GROUP_RESP: ", json.dumps(resp))
  emit("create_group_response", json.dumps(resp))


@socketio.on("get_groups")
def get_groups(phone_num):
  phone_num = json.loads(phone_num)
  con.get_groups(phone_num)