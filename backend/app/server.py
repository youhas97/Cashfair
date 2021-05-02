import functools
from flask import Flask, request
from flask_login import current_user
from flask_socketio import disconnect, emit, SocketIO

secret_key = 'ZrBXTvPcZpntfyL5J1GU7gABNXYJGwd6o92RY6TLHRflOcmCy5R68JDfyrr2Syk0'

#app = Flask(__name__)
#app.config['SECRET_KEY'] = secret_key

# TODO: Set up JWT for token management
# For future reference
#app.config['JWT_SECRET_KEY'] = secret_key
#app.config['JWT_BLACKLIST_ENABLED'] = True
#app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']

#socketio = SocketIO(app)
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
  global secret_key
  app.config['SECRET_KEY'] = secret_key

  # TODO: Set up JWT for token management
  # For future reference
  #app.config['JWT_SECRET_KEY'] = secret_key
  #app.config['JWT_BLACKLIST_ENABLED'] = True
  #app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']

  socketio = SocketIO(app, cors_allowed_origins='*')

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