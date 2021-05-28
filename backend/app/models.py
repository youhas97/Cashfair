from flask_bcrypt import generate_password_hash, check_password_hash
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)
import os

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# https://docs.sqlalchemy.org/en/14/orm/basic_relationships.html#association-object
class Association(db.Model):
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
  affiliate_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
  affiliate_nickname = db.Column(db.String(40), nullable=False)
  balance = db.Column(db.Integer, nullable=False)


class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  phoneNum = db.Column(db.String(9), unique=True, nullable=False)
  password_hash = db.Column(db.String(256), nullable=True)
  nickname = db.Column(db.String(40), nullable=True)

  active = db.Column(db.Boolean, default=False, nullable=False)

  affiliates = db.relationship(
    'Association',
    foreign_keys=[Association.user_id],
    lazy='subquery',
    backref=db.backref('user', lazy=True)
  )

  def check_password(self, password):
    if self.password_hash is None:
      return False
    return check_password_hash(self.password_hash, password)

  def set_password(self, password):
    self.password_hash = generate_password_hash(password).decode("utf-8")


