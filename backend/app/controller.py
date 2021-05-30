from functools import wraps
import os

from datetime import timedelta

from .models import db, User, PaymentAssociation, Group
from flask_jwt_extended import create_access_token

import re
SWE_PHONENUM_RE = re.compile("^((\+?46)|\\d)\\d{9}$")
PASSWORD_RE = re.compile("[A-Za-z0-9@#\$%\^&\+=]{8,128}")
NICKNAME_RE = re.compile(r"[\w0-9\-]{5,30}")
GROUPNAME_RE = re.compile(r"[\w0-9\-]{5,50}")

ACCESS_EXPIRES = timedelta(minutes=60)
PW_RESET_EXPIRES = timedelta(minutes=15)


def create_user(phone_num, pword, nickname):
  """
  Register users with their phone nr, password and nickname.
  Phone numbers are validated before they are stored on the database,
  with the use of regex (only Swedish numbers allowed).
  Phone numbers are stored with their last 9 digits, meaning users
  can choose to register with numbers beginning with (+)46 or 0,
  these will all look the same on the database.
  """
  # Validate credentials
  if not SWE_PHONENUM_RE.match(phone_num):
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

  phone_num = phone_num[-1:-10:-1][::-1] # Get last 9 digits

  user = User.query.filter_by(phone_num=phone_num).first()
  if user:
    if(user.active):
      return {
        "success": False,
        "msg": "User already registered."
      }
    user.nickname = nickname
    user.active = True
  else:
    user = User(
      phone_num=phone_num,
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


def login_user(phone_num, pword):
  """
  Login user with their credentials, and return an access_token
  if the credentials are correct.
  """
  phone_num = phone_num[-1:-10:-1][::-1] # Get last 9 digits
  user = User.query.filter_by(phone_num=phone_num).first()
  if not user:
    return {
      "success": False,
      "msg": "User does not exist."
    }
  if not user.active:
    return {
      "success": False,
      "msg": "The user account registered with this phone number is not active. Please register an account with this phone number to login."
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
  # cached_user_jti = redis_store.get(phone_num)
  # if cached_user_jti:
  #     redis_store.set(cached_user_jti, 'true', ACCESS_EXPIRES * 1)

  # redis_store.set(phone_num, token_jti)

  return {
    "success": True,
    "msg": "User logged in",
    "token": token
  }


def register_payment(user_phone, associate_phone, associate_nickname, amount):
  """
  Register payments between individual users. If the associate user does not exist
  that the requesting user wants to register payments with, then a placeholder
  will be created. All registered payments will have custom nicknames assigned
  by the requesting user.

  If a registered payment already exists between two users, then the balance
  of that association will be updated accordingly.
  """
  if not SWE_PHONENUM_RE.match(associate_phone) or not SWE_PHONENUM_RE.match(user_phone):
    return {
      "success": False,
      "msg": "Not a swedish phonenum."
    }
  if not NICKNAME_RE.match(associate_nickname):
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

  user_phone = user_phone[-1:-10:-1][::-1] # Get last 9 digits
  associate_phone = associate_phone[-1:-10:-1][::-1] # Get last 9 digits

  user = User.query.filter_by(phone_num=user_phone).first()
  if not user:
    return {
      "success": False,
      "msg": "User does not exist."
    }

  associate = User.query.filter_by(phone_num=associate_phone).first()
  if not associate:
    # Create placeholder until a user registers with associate_phone
    associate = User(phone_num=associate_phone, active=False)
    db.session.add(associate)
    db.session.commit()

  assoc = PaymentAssociation.query.filter_by(user_id=user.id, associate_id=associate.id).first()
  if assoc: # Check if associations already exist, and update balance if so.
    assoc.balance += int(amount)
    affiliate_assoc = PaymentAssociation.query.filter_by(user_id=associate.id, associate_id=user.id).first()
    affiliate_assoc.balance += -int(amount)
    db.session.commit()
  else:
    user_association = PaymentAssociation(user_id=user.id, associate_id=associate.id, associate_nickname=associate_nickname, balance=int(amount))
    associate_association = PaymentAssociation(user_id=associate.id, associate_id=user.id, associate_nickname=user.nickname, balance=-int(amount))
    db.session.add_all([user_association, associate_association])
    db.session.commit()

  return {
    "success": True,
    "msg": "Payment successfully registered."
  }


def get_balance(phone_num):
  phone_num = phone_num[-1:-10:-1][::-1] # Get last 9 digits
  user = User.query.filter_by(phone_num=phone_num).first()
  if not user:
    return {
      "success": False,
      "msg": "User does not exist."
    }

  associates = {asc.associate_nickname: {
    "phone_num": "0"+User.query.filter_by(id=asc.associate_id).first().phone_num,
    "balance": asc.balance
    } for asc in user.associations}
  return {
    "success": True,
    "associates": associates
  }


def create_group(name, members):
  if not GROUPNAME_RE.match(name):
    return {
      "success": False,
      "msg": "Not a valid group name."
    }
  group = Group(name=name)

  for user_data in members:
    phone_num = user_data["phone_num"]
    if not SWE_PHONENUM_RE.match(phone_num):
      return {
        "success": False,
        "msg": "Not a valid phone number."
      }
    phone_num = phone_num[-1:-10:-1][::-1] # Get last 9 digits
    user = User.query.filter_by(phone_num=phone_num).first()
    if not user:
      # Create placeholder until a user registers with associate_phone
      user = User(phone_num=phone_num, active=False)
      if not NICKNAME_RE.match(user_data["nickname"]):
        return {
          "success": False,
          "msg": "Not a valid nickname."
        }
      user.nickname = user_data["nickname"]
      db.session.add(user)
      db.session.commit()

    group.members.append(user)

  db.session.commit()

  return {
    "success": True,
    "msg": "Group has been created."
  }


def get_groups(phone_num):
  phone_num = phone_num[-1:-10:-1][::-1] # Get last 9 digits
  user = User.query.filter_by(phone_num=phone_num).first()

  if not user:
    return {
      "success": False,
      "msg": "User does not exist."
    }

  payload = {}
  payload["groups"] = {}
  groups = user.groups
  for group in groups:
    payload["groups"][group.name] = [{"nickname": user.nickname, "phone_num": user.phone_num} for user in group.members]

  return {
    "success": True,
    "groups" : payload["groups"]
  }