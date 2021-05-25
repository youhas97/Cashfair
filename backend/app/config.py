import os


  #app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

  # app.config['JWT_SECRET_KEY'] = os.environ['SECRET_KEY']
  # app.config['JWT_BLACKLIST_ENABLED'] = True
  # app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access']


class Config:
  SECRET_KEY = os.environ["SECRET_KEY"]
  SQLALCHEMY_DATABASE_URI = 'postgresql://{}:{}@localhost'.format(os.environ["DB_USERNAME"], os.environ["DB_PASSWORD"])
  LIVESERVER_TIMEOUT = 10
  DEBUG = False
  TESTING = False
  SQLALCHEMY_TRACK_MODIFICATIONS = False

class ProductionConfig(Config):
  ENV = "production"

class DevelopmentConfig(Config):
  ENV = "development"
  DEBUG = True
  SQLALCHEMY_TRACK_MODIFICATIONS = True