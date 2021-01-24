from flask import Flask
from flask_cors import CORS


app = Flask(__name__,
 	static_folder = './static',
 	template_folder='./templates')

CORS(app)
app.config['CORS_HEADER'] = 'Content-Type'


from .hello.views import hello_blueprint, test_blueprint, login_blueprint, chatroom_blueprint

# register the blueprints
app.register_blueprint(hello_blueprint)
app.register_blueprint(test_blueprint)
app.register_blueprint(login_blueprint)
app.register_blueprint(chatroom_blueprint)
