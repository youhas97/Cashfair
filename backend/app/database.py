db = {}
uid = 0
token = 0
db["users"] = {}
db["tokens"] = {}

def register(username, password):
  db["users"] = {uid.copy(): {
    "username": username,
    "password": password
  }}
  uid+=1

def login(username, password):
  users = db["users"]
  for uid, user in users.items()
    if user["username"] == username and user["password"] == password
      db["tokens"][token.copy()] = uid
      cur_token = token
      token += 1
      return cur_token

  return "user does not exist"