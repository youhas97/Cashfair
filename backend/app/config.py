import os


  #app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

  # app.config['JWT_SECRET_KEY'] = os.environ['SECRET_KEY']
  # app.config['JWT_BLACKLIST_ENABLED'] = True
  # app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access']

from dotenv import load_dotenv
load_dotenv()

class Config:
  SECRET_KEY = os.environ["SECRET_KEY"]
  SQLALCHEMY_DATABASE_URI = 'postgresql://{}:{}@localhost'.format(os.environ["DB_USERNAME"], os.environ["DB_PASSWORD"])
  LIVESERVER_TIMEOUT = 10
  DEBUG = False
  TESTING = False
  SQLALCHEMY_TRACK_MODIFICATIONS = False

  JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]
  JWT_TOKEN_LOCATION = ["cookies"]


class ProductionConfig(Config):
  ENV = "production"

class DevelopmentConfig(Config):
  ENV = "development"
  DEBUG = True
  SQLALCHEMY_TRACK_MODIFICATIONS = True
  JWT_COOKIE_SECURE = False
  JWT_COOKIE_SAMESITE = "Lax"