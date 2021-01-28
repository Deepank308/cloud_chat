from .hello.views import hello_blueprint, chatroom_blueprint, create_server_blueprint
from flask import Flask
from flask_cors import CORS


app = Flask(__name__,
            static_folder='./static',
            template_folder='./templates')

CORS(app)
app.config['CORS_HEADER'] = 'Content-Type'


# register the blueprints
app.register_blueprint(hello_blueprint)
app.register_blueprint(chatroom_blueprint)
app.register_blueprint(create_server_blueprint)
