from flask_bcrypt import generate_password_hash, check_password_hash
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)
import os

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# https://docs.sqlalchemy.org/en/14/orm/basic_relationships.html#association-object
class PaymentAssociation(db.Model):
  """
  Payment associations between accounts. These will have double entries
  for every payment association so that Users can set different nicknames
  for others. This is also useful for displaying balance.

  Example: for an association where a user has a positive balance,
  there will be another association where this balance is negative
  for the other user.
  """
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
  associate_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
  associate_nickname = db.Column(db.String(40), nullable=False)
  balance = db.Column(db.Float, nullable=False)


  """
  TODO:
  This should be used to differentiate payments and loans,
  but was not implemented due to time constraints
  """
  # type = db.Column(db.Enum, nullable=False)


class GroupPaymentAssociation(db.Model):
  """
  Similar to PaymentAssociation for User, but now also contains group id.
  """
  group_id = db.Column(db.Integer, db.ForeignKey('group.id'), primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
  associate_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
  associate_nickname = db.Column(db.String(40), nullable=False)
  balance = db.Column(db.Float, nullable=False)

  """
  TODO:
  This should be used to differentiate payments and loans,
  but was not implemented due to time constraints
  """
  # type = db.Column(db.Enum, nullable=False)


groups = db.Table('groups',
  db.Column('group_id', db.Integer, db.ForeignKey('group.id'), primary_key=True),
  db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
)


class User(db.Model):
  """
  User accounts have a phone number, password, and a nickname.

  User objects can serve as a placeholder for a number if a user
  wants to register payments with someone that has not registered on
  the website. Such accounts have an active status set to False.
  This is also why password and nickname are nullable, these are set
  once a User registers an account properly with the corresponding
  phone number.

  Correctly registered Users will have an active status set to True.
  """
  id = db.Column(db.Integer, primary_key=True)
  phone_num = db.Column(db.String(9), unique=True, nullable=False)
  password_hash = db.Column(db.String(256), nullable=True)
  nickname = db.Column(db.String(40), nullable=True)

  active = db.Column(db.Boolean, default=False, nullable=False)

  groups = db.relationship(
    'Group',
    secondary=groups,
    lazy='dynamic',
    back_populates="members"
  )

  associations = db.relationship(
    'PaymentAssociation',
    foreign_keys=[PaymentAssociation.user_id],
    lazy='dynamic',
    backref=db.backref('user', lazy=True)
  )

  group_associations = db.relationship(
    'GroupPaymentAssociation',
    foreign_keys=[GroupPaymentAssociation.user_id],
    lazy='dynamic',
    backref=db.backref('user', lazy=True)
  )

  def check_password(self, password):
    if self.password_hash is None:
      return False
    return check_password_hash(self.password_hash, password)

  def set_password(self, password):
    self.password_hash = generate_password_hash(password).decode("utf-8")


class Group(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(40), nullable=False)

  members = db.relationship('User',
    secondary=groups,
    lazy="dynamic",
    back_populates="groups"
  )

  associations = db.relationship(
    'GroupPaymentAssociation',
    foreign_keys=[GroupPaymentAssociation.group_id],
    lazy='dynamic',
    backref=db.backref('group', lazy=True)
  )