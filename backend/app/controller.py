from flask import request, current_app
from functools import wraps
import os
import json


from datetime import timedelta

from base64 import b64encode, b64decode

from .models import db, User

ACCESS_EXPIRES = timedelta(minutes=60)
PW_RESET_EXPIRES = timedelta(minutes=15)


def find_user(email):
    return User.query.filter_by(email=email).first()


def create_user(email, pword, firstname, familyname, city, country, gender):
    user = User(
        email=email,
        firstname=firstname,
        familyname=familyname,
        city=city,
        country=country,
        gender=gender
    )

    user.set_password(pword)

    db.session.add(user)
    db.session.commit()


# def login_user(email, pword):
#     user = find_user(email)
#     if not user:
#         return {
#             'success':'false',
#             'message':'user does not exist'
#         }

#     if not user.check_password(pword):
#         return {
#             'success':'false',
#             'message':'wrong password'
#         }

#     token = create_access_token(identity=user.email)
#     token_jti = get_jti(encoded_token=token)
#     redis_store.set(token_jti, 'false', ACCESS_EXPIRES * 1)

#     # if email already has a session, expire that token before returning new one
#     cached_user_jti = redis_store.get(email)
#     if cached_user_jti:
#         redis_store.set(cached_user_jti, 'true', ACCESS_EXPIRES * 1)

#     redis_store.set(email, token_jti)

#     return {
#         'success':'true',
#         'message':'user logged in',
#         'data': token
#     }