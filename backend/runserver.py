"""
from flask import Flask, render_template
from flask_socketio import SocketIO

from app import create_app()

app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

if __name__ == '__main__':
    socketio.run(create_app())
"""

from gevent.pywsgi import WSGIServer
from app import create_app

from geventwebsocket.handler import WebSocketHandler

import os

port = int(os.environ.get("PORT", 5000))

http_server = WSGIServer(('', port), create_app(), handler_class=WebSocketHandler)
http_server.serve_forever()