import re


db = {}
uid = 0
token = 0
db["users"] = {}
db["tokens"] = {}

SWE_PHONENUM_RE = re.compile("^((\+?46)|\\d)\\d{9}$")
PASSWORD_RE = re.compile("[A-Za-z0-9@#\$%\^&\+=]{8,128}")

def register(phoneNumber, password):
  print(phoneNumber, SWE_PHONENUM_RE.fullmatch(phoneNumber))
  print(password, PASSWORD_RE.fullmatch(password))
  if not SWE_PHONENUM_RE.fullmatch(phoneNumber) \
    or not PASSWORD_RE.fullmatch(password):
    return False
    
  global uid
  db["users"] = {uid: {
    "phoneNumber": phoneNumber[-1:-10:-1][::-1], # omit the first part of phonenum (+46 or 0)
    "password": password
  }}
  uid+=1
  return True

def login(phoneNumber, password):
  users = db["users"]
  for uid, user in users.items():
    if user["phoneNumber"] == phoneNumber and user["password"] == password:
      global token
      db["tokens"][token] = uid
      cur_token = token
      token += 1
      return cur_token

  return None