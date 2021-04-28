import functools
from flask import request
from flask_login import current_user
from flask_socketio import disconnect, emit

# Wrapper than only lets through authenticated users
def authenticated_only(f):
  @functools.wraps(f)
  def wrapped(*args, **kwargs):
    if not current_user.is_authenticated:
      disconnect()
    else:
      return f(*args, **kwargs)
  return wrapped

def create_app():
  app = Flask(__name__)

  @socketio.on("connect")
  def connect_handler():
    # if current_user.is_authenticated:
    #   emit('my response',
    #     {'message': '{0} has joined'.format(current_user.name)},
    #     broadcast=True)
    # else:
    #   return False  # not allowed here
    emit("welcome_response",
    {"message": "Hello and welcome to your API server."})

  return app