import functools
from flask_socketio import disconnect
from flask_jwt_extended import JWTManager
from flask import request

jwt = JWTManager()

# Wrapper than only lets through authenticated users
def authenticated_only(f):
  @functools.wraps(f)
  def wrapped(*args, **kwargs):
    print(request.headers)
    # if not current_user.is_authenticated:
    #   disconnect()
    # else:
    return f(*args, **kwargs)
  return wrapped