import functools
from flask import Flask, request, current_app as app
from flask.globals import current_app
from flask_login import current_user
from flask_socketio import disconnect, emit, SocketIO
import re

from . import controller as con

# Wrapper than only lets through authenticated users
def authenticated_only(f):
  @functools.wraps(f)
  def wrapped(*args, **kwargs):
    if not current_user.is_authenticated:
      disconnect()
    else:
      return f(*args, **kwargs)
  return wrapped


socketio = SocketIO(app, cors_allowed_origins='*', logger=True, engineio_logger=True)
@socketio.on("disconnect")
def disconnect_handler():
  print("---------------- DISCONNECTED ----------------")

@socketio.on("connect")
def connect_handler():
  # if current_user.is_authenticated:
  #   emit('my response',
  #     {'message': '{0} has joined'.format(current_user.name)},
  #     broadcast=True)
  # else:
  #   return False  # not allowed here
  print("---------------- CONNECTED ----------------")

@socketio.on("register")
def register_handler(phoneNumber, password):
  if not con.register(phoneNumber, password):
    emit("register_fail")
  else:
    emit("register_success")
  disconnect()

@socketio.on("login")
def login_handler(phoneNumber, password):
  token = con.login(phoneNumber, password)
  if not token:
    emit("login_fail")
    disconnect()
  else:
    emit("login_success", token)