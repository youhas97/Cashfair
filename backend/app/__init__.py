from flask import Flask

#from flask_jwt_extended import JWTManager
from flask_migrate import Migrate

from dotenv import load_dotenv
from .config import DevelopmentConfig

load_dotenv() # Get all env variables from .env

def create_app():
  app = Flask(__name__)
  app.config.from_object(DevelopmentConfig)

  from .models import db

  with app.app_context():

    db.init_app(app)
    migrate = Migrate(app, db)

    from . import views

  return app

if __name__ == '__main__':
  app = create_app()
  app.run(host='0.0.0.0', port=30006, debug=True)