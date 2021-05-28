from functools import wraps
import os

from datetime import timedelta

from .models import db, User
from flask_jwt_extended import create_access_token

import re
SWE_PHONENUM_RE = re.compile("^((\+?46)|\\d)\\d{9}$")
PASSWORD_RE = re.compile("[A-Za-z0-9@#\$%\^&\+=]{8,128}")
NICKNAME_RE = re.compile(r"[\w0-9]{5,30}")

ACCESS_EXPIRES = timedelta(minutes=60)
PW_RESET_EXPIRES = timedelta(minutes=15)


def create_user(phoneNum, pword, nickname):
  # Validate credentials
  if not SWE_PHONENUM_RE.match(phoneNum):
    return {
      "success": False,
      "msg": "Not a valid Swedish phonenumber."
    }
  if not PASSWORD_RE.match(pword):
    return {
      "success": False,
      "msg": "Not a valid password."
    }
  if not NICKNAME_RE.match(nickname):
    return {
      "success": False,
      "msg": "Not a valid nickname."
    }

  phoneNum = phoneNum[-1:-10:-1][::-1] # Get last 9 digits

  user = User(
    phoneNum=phoneNum,
    nickname=nickname
  )

  user.set_password(pword)

  db.session.add(user)
  db.session.commit()

  return {
    "success": True,
    "msg": "User successfully registered."
  }


def login_user(phoneNum, pword):
  phoneNum = phoneNum[-1:-10:-1][::-1] # Get last 9 digits
  user = User.query.filter_by(phoneNum=phoneNum).first()
  if not user:
    return {
      "success": False,
      "msg": "User does not exist."
    }

  if not user.check_password(pword):
    return {
      "success": False,
      "msg": "Wrong password."
    }

  token = create_access_token(identity=user.id)
  # token_jti = get_jti(encoded_token=token)
  # redis_store.set(token_jti, 'false', ACCESS_EXPIRES * 1)

  # # if email already has a session, expire that token before returning new one
  # cached_user_jti = redis_store.get(email)
  # if cached_user_jti:
  #     redis_store.set(cached_user_jti, 'true', ACCESS_EXPIRES * 1)

  # redis_store.set(email, token_jti)

  return {
    "success": True,
    "msg": "User logged in",
    "token": token
  }