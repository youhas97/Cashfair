from .models import db, User, PaymentAssociation, Group, GroupPaymentAssociation
from flask_jwt_extended import create_access_token

from .utils.controller import SWE_PHONENUM_RE, PASSWORD_RE, NICKNAME_RE, GROUPNAME_RE
from .utils.controller import strip_phone_num


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
      "msg": "Swedish format is required for phone number."
    }
  if not PASSWORD_RE.match(pword):
    return {
      "success": False,
      "msg": "Password needs to be between 8 and 128 characters, and can only contain letters, numbers, spaces and the following characters: @#$%^&+="
    }
  if not NICKNAME_RE.match(nickname):
    return {
      "success": False,
      "msg": "Nicknames need to be 2-30 characters long and can only contain letters, numbers, spaces, dashes and underscores."
    }

  phone_num = strip_phone_num(phone_num) # Get last 9 digits

  user = User.query.filter_by(phone_num=phone_num).first()
  if user:
    if(user.active):
      return {
        "success": False,
        "msg": "Phone number already exists."
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
  phone_num = strip_phone_num(phone_num)
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
      "msg": "Swedish format is required for phone number."
    }
  if not NICKNAME_RE.match(associate_nickname):
    return {
      "success": False,
      "msg": "Nicknames need to be 2-30 characters long and can only contain letters, numbers, spaces, dashes and underscores."
    }
  try:
    int(amount)
  except ValueError:
    return {
      "success": False,
      "msg": "Amount is not a valid integer."
    }

  user_phone = strip_phone_num(user_phone)

  user = User.query.filter_by(phone_num=user_phone).first()
  if not user:
    return {
      "success": False,
      "msg": "User does not exist."
    }

  # associate = User.query.filter_by(phone_num=associate_phone).first()
  # if not associate:
  #   # Create placeholder until a user registers with associate_phone
  #   associate = User(phone_num=associate_phone, active=False)
  #   db.session.add(associate)
  #   db.session.commit()

  res = get_user_or_placeholder(associate_phone, associate_nickname)
  if not res["success"]:
    return res

  associate = res["user"]

  assoc = PaymentAssociation.query.filter_by(user_id=user.id, associate_id=associate.id).first()
  if assoc: # Check if associations already exist, and update balance if so.
    # Update balance for user association to associate
    assoc.balance += int(amount)
    assoc.associate_nickname=associate_nickname # Update associate_nickname

    # Update balance for the associate association to user
    associate_assoc = PaymentAssociation.query.filter_by(user_id=associate.id, associate_id=user.id).first()
    associate_assoc.balance += -int(amount)
  else:
    # Create associations for both user and associate(to associate and to user, respectively)
    user_association = PaymentAssociation(
      user_id=user.id,
      associate_id=associate.id,
      associate_nickname=associate_nickname,
      balance=int(amount)
    )

    associate_association = PaymentAssociation(
      user_id=associate.id,
      associate_id=user.id,
      associate_nickname=user.nickname,
      balance=-int(amount)
    )

    db.session.add_all([user_association, associate_association])

  db.session.commit()

  return {
    "success": True,
    "msg": "Payment successfully registered."
  }


def get_balance(phone_num):
  phone_num = strip_phone_num(phone_num) # Get last 9 digits
  user = User.query.filter_by(phone_num=phone_num).first()
  if not user:
    return {
      "success": False,
      "msg": "User does not exist."
    }

  associates = [{
    "nickname": asc.associate_nickname,
    "phone_num": "0"+User.query.filter_by(id=asc.associate_id).first().phone_num,
    "balance": asc.balance
    } for asc in user.associations]
  return {
    "success": True,
    "associates": associates
  }


def get_user_or_placeholder(phone_num, nickname):
  """
  Get user from database or create a placeholder
  if the user dose not exist yet.
  """
  if not SWE_PHONENUM_RE.match(phone_num):
    return {
      "success": False,
      "msg": "Swedish format is required for phone number."
    }

  if not NICKNAME_RE.match(nickname):
    return {
      "success": False,
      "msg": "Nicknames need to be 2-30 characters long and can only contain letters, numbers, spaces, dashes and underscores."
    }

  phone_num = strip_phone_num(phone_num) # Get last 9 digits
  user = User.query.filter_by(phone_num=phone_num).first()
  if not user:
    # Create placeholder until a user registers with associate_phone
    user = User(phone_num=phone_num, active=False)
    if not NICKNAME_RE.match(nickname):
      return {
        "success": False,
        "msg": "Not a valid nickname."
      }
    user.nickname = nickname

    db.session.add(user)
    db.session.commit()

  return {
    "success": True,
    "user": user
  }



def create_group(name, members):
  if not GROUPNAME_RE.match(name):
    return {
      "success": False,
      "msg": "Group names need to be 2-50 characters long and can only contain letters, numbers, spaces, dashes and underscores."
    }
  group = Group(name=name)

  for user_data in members:
    res = get_user_or_placeholder(user_data["phone_num"], user_data["nickname"])
    if not res["success"]:
      return res

    user = res["user"]

    group.members.append(user)

  db.session.add(group)
  db.session.commit()

  # Create initial group associations.
  for user in group.members:
    for associate_data in members:
      associate = User.query.filter_by(phone_num=strip_phone_num(associate_data["phone_num"])).first()
      if user.id == associate.id:
        continue
      register_group_associations(group.id, user, associate, associate_data["nickname"], 0)

  db.session.commit()

  return {
    "success": True,
    "msg": "Group has been created."
  }


def get_groups(phone_num):
  """
  Get all groups that user with phone_num is part of,
  together with all their payment associations
  for the user.
  """
  phone_num = strip_phone_num(phone_num) # Get last 9 digits
  user = User.query.filter_by(phone_num=phone_num).first()
  print("USER NAME: ", user.nickname, " --------- USER NUMBER: ", user.phone_num)

  if not user:
    return {
      "success": False,
      "msg": "User does not exist."
    }

  payload = {}
  payload["groups"] = []
  groups = user.groups
  for group in groups:
    group_dict = {
      "id": group.id,
      "name": group.name
    }

    members = [{
      "nickname": user.nickname,
      "phone_num": "0" + user.phone_num,
      "balance": None
    }]
    for assoc in user.group_associations:
      if assoc.group_id != group.id:
        continue

      associate = User.query.filter_by(id=assoc.associate_id).first()

      members.append({
        "nickname":  assoc.associate_nickname,
        "phone_num": '0' + associate.phone_num,
        "balance": assoc.balance
      })

    group_dict["members"] = members
    payload["groups"].append(group_dict)

  return {
    "success": True,
    "groups" : payload["groups"]
  }



def register_group_associations(group_id, requester: User, associate: User, associate_nickname, amount):
  """
  Helper class for creating group payment associations.
  """

  assoc = GroupPaymentAssociation.query.filter_by(
    group_id=group_id,
    user_id=requester.id,
    associate_id=associate.id
  ).first()

  if assoc: # Check if associations already exist, and update balance if so.
    # Update balance for user association to associate
    assoc.balance += int(amount)
    assoc.associate_nickname=associate.nickname # Update associate_nickname

    # Update balance for the associate association to user
    associate_assoc = GroupPaymentAssociation.query.filter_by(
      group_id=group_id,
      user_id=associate.id,
      associate_id=requester.id
    ).first()

    associate_assoc.balance += -int(amount)
  else:
    # Create associations for both user and associate(to associate and to user, respectively)
    user_association = GroupPaymentAssociation(
      group_id=group_id,
      user_id=requester.id,
      associate_id=associate.id,
      associate_nickname=associate_nickname,
      balance=int(amount)
    )

    associate_association = GroupPaymentAssociation(
      group_id=group_id,
      user_id=associate.id,
      associate_id=requester.id,
      associate_nickname=requester.nickname,
      balance=-int(amount)
    )

    db.session.add_all([user_association, associate_association])



def register_group_payment(group_id, requester_phone_num, associates, amount):
  """
  Register a payment on a number of associates that are part of group (with id==group.id).

  Similar to register_payment.

  Assumptions: All users already exist in database from create_group (this will
  usually be called before requester can even register payments inside a group.)

  associates should be a list of dicts on the form:
  {
    "phone_num": "xxx",
    "nickname": "yyy"
  }

  amount will be split evenly among the associates.
  """

  group = Group.query.filter_by(id=group_id).first()
  if not group:
    return {
      "success": False,
      "msg": "Group not found."
    }
  if not SWE_PHONENUM_RE.match(requester_phone_num):
    return {
      "success": False,
      "msg": "Requester does not have a valid Swedish phone number."
    }
  requester_phone_num = strip_phone_num(requester_phone_num)
  requester = User.query.filter_by(phone_num=requester_phone_num).first()
  if not requester:
    return {
      "success": False,
      "msg": "Requester is not registered on the website."
    }

  # Check that all associates are part of the group:
  for associate in associates:
    phone_num = strip_phone_num(associate["phone_num"])

    if not group.users.filter_by(phone_num):
      return {
        "success": False,
        "msg": "An associate (number: {}) is not part of this group with group id: {}".format(associate["phone_num"], group_id)
      }


  # Now create group payment associations for all users
  even_amount = amount/len(associates)
  for associate in associates:
    associate_user = User.query.filter_by(phone_num=associate["phone_num"]).first()
    register_group_associations(group_id, requester, associate_user, associate["nickname"], even_amount)

  db.session.commit()

  return {
    "success": True,
    "msg": "Group payment successfully created!"
  }
