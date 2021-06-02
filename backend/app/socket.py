from re import I
from flask_socketio import disconnect, emit, SocketIO, join_room, send
import json

from . import controller as con
from . import whitelist
from . import redis
from .auth import authenticated_only
from .models import User

from flask import request

from flask_jwt_extended import jwt_required, get_jwt_identity

from .utils.controller import strip_phone_num

socketio = SocketIO(cors_allowed_origins=whitelist, logger=True, engineio_logger=True, always_connect=True)

@socketio.on("disconnect")
def disconnect_handler():
  """
  Disconnect handler for all socket connections.

  Will remove user phone number and socket id from redis cache.
  """
  print("---------------- DISCONNECTED ----------------")

  phone_num = redis.get(request.sid)
  redis.delete(phone_num)
  redis.delete(request.sid)

@socketio.on("connect")
@jwt_required(locations=["cookies"])
def connect_handler():
  """
  Connect handler for all socket connections.

  Will save user phone_num and socket id for all connections on redis cache.
  """
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
  """
  Socket endpoint for registering a payment between two users.

  Expects a json payload, with dict on the form:
  {
    "user_phone": "xxx",
    "payment_phone", "yyy",
    "payment_nickname", "zzz",
    "payment_amount", "ddd"
  }
  """
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
    payment_phone = strip_phone_num(payload["payment_phone"])
    sid = redis.get(payment_phone)
    if sid:
      emit("balance_update", json.dumps(con.get_balance(payload["payment_phone"])), room=sid)


@socketio.on("get_balance")
def get_balance(phone_num):
  """
  Socket endpoint for getting the total balance of a user

  Expects a phone_num of the requester.

  Total balance is all individual payment associations plus
  all group payment associations.
  """
  emit("balance_update", json.dumps(con.get_balance(phone_num)))

@socketio.on("create_group")
def create_group(payload):
  payload = json.loads(payload)
  resp = con.create_group(
    payload["name"],
    payload["members"]
  )

  if resp["success"]:
    for member in payload["members"]:
      phone_num = strip_phone_num(member["phone_num"])
      sid = redis.get(phone_num)
      if sid:
        emit("groups_update", json.dumps(con.get_groups(member["phone_num"])), room=sid)

  emit("create_group_response", json.dumps(resp))


@socketio.on("get_groups")
def get_groups(phone_num):
  """
  Socket endpoint for a user to fetch all groups it is a member of.

  Expects phone_num of user.
  """

  phone_num = json.loads(phone_num)
  resp = con.get_groups(phone_num)

  emit("groups_update", json.dumps(resp))


@socketio.on("register_group_payment")
def register_group_payment(payload):
  payload = json.loads(payload)
  requester = payload["requester_phone_num"]
  selected_group_id = payload["selected_group_id"]
  selected_members = payload["selected_members"]
  amount = payload["amount"]

  resp = con.register_group_payment(selected_group_id, requester, selected_members, amount)
  if resp["success"]:
    list_of_phonenums = [member["phone_num"] for member in payload["selected_members"]]
    for phone_num in list_of_phonenums:
      phone_num = strip_phone_num(phone_num)
      sid = redis.get(phone_num)
      if sid:
        emit("groups_update", json.dumps(con.get_groups(phone_num)), room=sid)

    if requester not in phone_num:
      emit("groups_update", json.dumps(con.get_groups(requester)))

  emit("register_group_payment_response", json.dumps(resp))


@socketio.on("pay_user")
def pay_user(payload):
  payload = json.loads(payload)
  payer = payload["payer"]
  payee = payload["payee"]
  amount = payload["amount"]
  pay_with_swish = payload["pay_with_swish"]

  resp = con.pay_user(payer, payee, amount)
  emit("payment_response", json.dumps(resp))
  if resp["success"]:
    emit("balance_update", json.dumps(con.get_balance(strip_phone_num(payer))))
    payee_sid = redis.get(strip_phone_num(payee))
    if payee_sid:
      emit("balance_update", json.dumps(con.get_balance(strip_phone_num(payee))), room=payee_sid)

@socketio.on("pay_group_user")
def pay_user(payload):
  payload = json.loads(payload)
  payer = payload["payer"]
  payee = payload["payee"]
  amount = payload["amount"]
  group_id = payload["group_id"]
  pay_with_swish = payload["pay_with_swish"]

  resp = con.pay_user(payer, payee, amount, group=True, group_id=group_id)
  emit("payment_response", json.dumps(resp))

  if resp["success"]:
    emit("groups_update", json.dumps(con.get_groups(strip_phone_num(payer))))
    payee_sid = redis.get(strip_phone_num(payee))
    if payee_sid:
      emit("groups_update", json.dumps(con.get_groups(strip_phone_num(payee))), room=payee_sid)
