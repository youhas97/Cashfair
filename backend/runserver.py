"""
from flask import Flask, render_template
from flask_socketio import SocketIO

from app import create_app()

app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

if __name__ == '__main__':
    socketio.run(create_app())
"""

from app import create_app
import eventlet
from eventlet import wsgi

import os

port = int(os.environ.get("PORT", 5000))

dirname = os.path.dirname(__file__)
certfile_path = os.path.join(dirname, "certs/server.crt")
keyfile_path = os.path.join(dirname, "certs/server.key")
wsgi.server(eventlet.wrap_ssl(
            eventlet.listen(('', port)),
            certfile=certfile_path,
            keyfile=keyfile_path,
            server_side=True,
        ),
    create_app())