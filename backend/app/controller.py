from functools import wraps
import os

from datetime import timedelta

from .models import db, User, Association
from flask_jwt_extended import create_access_token

import re
SWE_PHONENUM_RE = re.compile("^((\+?46)|\\d)\\d{9}$")
PASSWORD_RE = re.compile("[A-Za-z0-9@#\$%\^&\+=]{8,128}")
NICKNAME_RE = re.compile(r"[\w0-9]{5,30}")

ACCESS_EXPIRES = timedelta(minutes=60)
PW_RESET_EXPIRES = timedelta(minutes=15)


def create_user(phoneNum, pword, nickname):
  """
  Register users with their phone nr, password and nickname.
  Phone numbers are validated before they are stored on the database,
  with the use of regex (only Swedish numbers allowed).
  Phone numbers are stored with their last 9 digits, meaning users
  can choose to register with numbers beginning with (+)46 or 0,
  these will all look the same on the database.
  """
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
    nickname=nickname,
    active=True
  )

  user.set_password(pword)

  db.session.add(user)
  db.session.commit()

  return {
    "success": True,
    "msg": "User successfully registered."
  }


def login_user(phoneNum, pword):
  """
  Login user with their credentials, and return an access_token
  if the credentials are correct.
  """
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

  # # if user already has a session, expire that token before returning new one
  # cached_user_jti = redis_store.get(phoneNum)
  # if cached_user_jti:
  #     redis_store.set(cached_user_jti, 'true', ACCESS_EXPIRES * 1)

  # redis_store.set(phoneNum, token_jti)

  return {
    "success": True,
    "msg": "User logged in",
    "token": token
  }


def register_payment(userPhone, affiliatePhone, affiliateNickname, amount):
  """
  Register payments between individual users. If the affiliate user does not exist
  that the requesting user wants to register payments with, then a placeholder
  will be created. All registered payments will have custom nicknames assigned
  by the requesting user.

  If a registered payment already exists between two users, then the balance
  of that association will be updated accordingly.
  """
  if not SWE_PHONENUM_RE.match(affiliatePhone) or not SWE_PHONENUM_RE.match(userPhone):
    return {
      "success": False,
      "msg": "Not a swedish phonenum."
    }
  if not NICKNAME_RE.match(affiliateNickname):
    return {
      "success": False,
      "msg": "Not a valid nickname."
    }
  try:
    int(amount)
  except ValueError:
    return {
      "success": False,
      "msg": "Amount is not a valid integer."
    }

  userPhone = userPhone[-1:-10:-1][::-1] # Get last 9 digits
  affiliatePhone = affiliatePhone[-1:-10:-1][::-1] # Get last 9 digits

  user = User.query.filter_by(phoneNum=userPhone).first()
  if not user:
    return {
      "success": False,
      "msg": "User does not exist."
    }

  affiliate = User.query.filter_by(phoneNum=affiliatePhone).first()
  if not affiliate:
    # Create placeholder until a user registers with affiliatePhone
    affiliate = User(phoneNum=affiliatePhone, active=False)
    db.session.add(affiliate)
    db.session.commit()

  assoc = Association.query.filter_by(user_id=user.id, affiliate_id=affiliate.id).first()
  if assoc: # Check if associations already exist, and update balance if so.
    assoc.balance += int(amount)
    affiliate_assoc = Association.query.filter_by(user_id=affiliate.id, affiliate_id=user.id).first()
    affiliate_assoc.balance += -int(amount)
    db.session.commit()
  else:
    user_association = Association(user_id=user.id, affiliate_id=affiliate.id, affiliate_nickname=affiliateNickname, balance=int(amount))
    affiliate_association = Association(user_id=affiliate.id, affiliate_id=user.id, affiliate_nickname=user.nickname, balance=-int(amount))
    db.session.add_all([user_association, affiliate_association])
    db.session.commit()

  return {
    "success": True,
    "msg": "Payment successfully registered."
  }


def get_balance(phoneNum):
  phoneNum = phoneNum[-1:-10:-1][::-1] # Get last 9 digits
  user = User.query.filter_by(phoneNum=phoneNum).first()
  if not user:
    return {
      "success": False,
      "msg": "User does not exist."
    }

  affiliates = {asc.affiliate_nickname: asc.balance for asc in user.affiliates}

  return {
    "success": True,
    "affiliates": affiliates
  }