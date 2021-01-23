from flask import render_template, Blueprint, jsonify, request
from flask_cors import cross_origin

hello_blueprint = Blueprint('hello',__name__)
test_blueprint = Blueprint("test", __name__)

@hello_blueprint.route('/')
@hello_blueprint.route('/hello')
def index():
	return render_template('index.html')
	
@test_blueprint.route("/test", methods=["GET", "POST"])
@cross_origin()
def test():
    return jsonify({"success": True, "type": request.method})
