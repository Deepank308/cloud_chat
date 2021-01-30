from flask import (
    render_template,
    Blueprint,
    jsonify,
    request,
    redirect,
    url_for,
    session,
)
from flask_cors import cross_origin
import json

service_blueprint = Blueprint("service", __name__)
api_blueprint = Blueprint("api", __name__, url_prefix="/api")

SERVER_ID = "1001"

# user session data
SESSION_ID_KEY = "username"
SESSION_LOGGEDIN = "LOGGED_IN"
SESSION_SERVERID = "serverID"


def auth_login(username, password):
    """
    To authenicate login and update session data
    """
    session[SESSION_ID_KEY] = username
    session[SESSION_LOGGEDIN] = True

    return True


@service_blueprint.route("/", methods=["GET"])
def index():
    """
    Main landing page
    """
    print("Index Called")

    if SESSION_LOGGEDIN not in session:
        session[SESSION_LOGGEDIN] = False

    serverId = request.args.get("serverId", None)
    if serverId is not None:
        # TODO: check if serverID is valid
        session[SESSION_SERVERID] = serverId
    else:
        session.pop(SESSION_SERVERID, None)

    return render_template("index.html")


@service_blueprint.route("/chatroom/<serverId>", methods=["GET"])
@cross_origin()
def chatroom(serverId=0):
    """
    Landing page for chatoom
    """
    print("Chatroom Called")

    if not session.get(SESSION_LOGGEDIN, False):
        return redirect(url_for(".index", serverId=serverId))

    if not session.get(SESSION_ID_KEY, False):
        return redirect(url_for(".index", serverId=serverId))

    if session.get(SESSION_SERVERID, None) != None:
        if session[SESSION_SERVERID] != serverId:
            return redirect(url_for(".index", serverId=serverId))

    session[SESSION_SERVERID] = serverId
    return render_template("chatroom.html")


@api_blueprint.route("/createServer", methods=["POST"])
@cross_origin()
def createServer():
    """
    Internal API for handeling CreateServer Request
    """
    print("Create server called")

    data = json.loads(request.data)
    username = data.get("username", None)
    password = data.get("password", None)

    if username != None and password != None:
        if auth_login(username, password):
            # generate server ID
            serverId = SERVER_ID
            session[SESSION_SERVERID] = serverId
            return jsonify({"serverId": serverId, "status": True})

    return jsonify({"serverId": -1, "status": False})


@api_blueprint.route("/joinServer", methods=["POST"])
@cross_origin()
def joinServer():
    """
    Internal API for handling JoinServer Request
    """
    print("Join Server called")

    data = json.loads(request.data)
    username = data.get("username", None)
    password = data.get("password", None)

    if username != None and password != None:
        if auth_login(username, password):
            return jsonify({"status": True})

    return jsonify({"status": False})
