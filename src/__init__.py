from .api_server.views import service_blueprint, api_blueprint
from flask import Flask
from flask_cors import CORS


app = Flask(__name__, static_folder="./static", template_folder="./templates")

app.secret_key = "hakunamatata"

CORS(app)
app.config["CORS_HEADER"] = "Content-Type"
app.config["SESSION_PERMANENT"] = False


# register the blueprints
app.register_blueprint(service_blueprint)
app.register_blueprint(api_blueprint)
