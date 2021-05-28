from flask_bcrypt import generate_password_hash, check_password_hash
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)
import os

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  phoneNum = db.Column(db.String(9), unique=True, nullable=False)
  password_hash = db.Column(db.String(256), nullable=False)
  nickname = db.Column(db.String(40), nullable=True)

  def check_password(self, password):
    return check_password_hash(self.password_hash, password)

  def set_password(self, password):
    self.password_hash = generate_password_hash(password).decode("utf-8")

  def generate_auth_token(self,expiration = 3600):
    s = Serializer(os.environ['SECRET_KEY'], expires_in=expiration)
    return s.dumps({'id':self.id})