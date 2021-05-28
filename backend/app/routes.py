from flask import current_app as app, request, session, make_response
from markupsafe import escape

from flask_jwt_extended import set_access_cookies

from . import controller as con
from . import whitelist


@app.after_request
def add_cors_headers(response):
  """
  Allow only whitelisted origins. These are needed for jwt cookies
  to work. Append necessary headers after each request.
  """
  r = request.referrer[:-1]
  if r in whitelist:
    response.headers.add('Access-Control-Allow-Origin', r)
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Headers', 'Cache-Control')
    response.headers.add('Access-Control-Allow-Headers', 'X-Requested-With')
    response.headers.add('Access-Control-Allow-Headers', 'Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  return response

@app.route("/register", methods=["POST"])
def register():
  phoneNum = escape(request.json["phoneNum"])
  nickname = escape(request.json["nickname"])
  password = request.json["password"] # will be hashed before stored in db, no need for escape
  return con.create_user(phoneNum, password, nickname)

@app.route("/login", methods=["POST"])
def login():
  """
  Login a user and return cookies for authentication use.
  Mostly used for socket connection authentication,
  but can also be used for other protected endpoints if
  there is a need (e.g. change password).
  """
  phoneNum = escape(request.json["phoneNum"])
  password = request.json["password"]
  resp = con.login_user(phoneNum, password)
  token = resp["token"]
  del resp["token"]
  flask_response = make_response(resp)
  set_access_cookies(flask_response, token)
  return flask_response