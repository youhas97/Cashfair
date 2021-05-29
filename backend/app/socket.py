import functools
from flask_socketio import disconnect, emit, SocketIO
import json

from . import controller as con
from . import whitelist
from . import redis
from .auth import authenticated_only
from .models import User

from flask import request

from flask_jwt_extended import jwt_required, get_jwt_identity

socketio = SocketIO(cors_allowed_origins=whitelist, logger=True, engineio_logger=True, always_connect=True)

@socketio.on("disconnect")
def disconnect_handler():
  print("---------------- DISCONNECTED ----------------")

  phone_num = redis.get(request.sid)
  redis.delete(phone_num)
  redis.delete(request.sid)

@socketio.on("connect")
@jwt_required(locations=["cookies"])
def connect_handler():
  print("---------------- CONNECTED ----------------")

  user = User.query.get(get_jwt_identity())

  """
  Save phone numbers with corresponding sid, so that server
  can push updates to clients that are connected
  """
  redis.set(user.phone_num, request.sid)
  redis.set(request.sid, user.phone_num)

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
    payment_phone = payload["payment_phone"][-1:-10:-1][::-1] # Get last 9 digits
    sid = redis.get(payment_phone).decode("utf-8") if redis.get(payment_phone) else None
    if sid:
      emit("balance_update", json.dumps(con.get_balance(payload["payment_phone"])), to=sid)


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