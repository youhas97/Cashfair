from flask import Flask

#from flask_jwt_extended import JWTManager
from flask_migrate import Migrate

from dotenv import load_dotenv
from .config import DevelopmentConfig

from flask_bcrypt import Bcrypt

from flask_redis import FlaskRedis

load_dotenv() # Get all env variables from .env

whitelist = ["http://localhost:3000"]

redis = FlaskRedis()

def create_app():
  app = Flask(__name__)
  app.config.from_object(DevelopmentConfig)

  with app.app_context():
    from .models import db
    from .auth import jwt
    from .socket import socketio

    db.init_app(app)
    migrate = Migrate(app, db)
    bcrypt = Bcrypt(app)

    jwt.init_app(app)
    socketio.init_app(app)
    redis.init_app(app)

    from . import routes
    from . import socket
    from . import models
    from . import controller

  return app

if __name__ == '__main__':
  app = create_app()
  app.run(host='0.0.0.0', port=30006, debug=True)