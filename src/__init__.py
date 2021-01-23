from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin


app = Flask(__name__,
 	static_folder = './static',
 	template_folder='./templates')

CORS(app)
app.config['CORS_HEADER'] = 'Content-Type'


from .hello.views import hello_blueprint

# register the blueprints
app.register_blueprint(hello_blueprint)
