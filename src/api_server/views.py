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

# Local Database
SERVER_IDS = [1000]
MAX_SERVERID = 1005
ADMIN_SERVERID = {}
ONLINEUSERS_SERVERID = {}

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


def generate_serverId():
    """
    Generates serverId and keeps track of it in the database(local for now)
    """
    serverId = SERVER_IDS[-1] + 1
    if serverId > MAX_SERVERID:
        return None
    SERVER_IDS.append(serverId)
    return str(serverId)


@ service_blueprint.route("/", methods=["GET"])
def index():
    """
    Main landing page
    """
    print("Index Called")

    if SESSION_LOGGEDIN not in session:
        session[SESSION_LOGGEDIN] = False
    elif session[SESSION_LOGGEDIN]:
        return render_template("home.html")

    if SESSION_SERVERID not in session:
        session[SESSION_SERVERID] = {}

    serverId = request.args.get("serverId", None)
    if serverId is not None:
        # Check if serverID is valid
        if serverId in SERVER_IDS:
            session[SESSION_SERVERID].update({serverId: 1})

    session.modified = True
    return render_template("index.html")


@ service_blueprint.route("/chatroom/<serverId>", methods=["GET"])
@ cross_origin()
def chatroom(serverId=0):
    """
    Landing page for chatroom
    """
    print("Chatroom Called")

    if not session.get(SESSION_LOGGEDIN, False):
        print('Session not logged in')
        return redirect(url_for(".index", serverId=serverId))

    if not session.get(SESSION_ID_KEY, False):
        print('No username')
        return redirect(url_for(".index", serverId=serverId))

    if session.get(SESSION_SERVERID, None) != None:
        # TODO: Check valid active serverId
        if int(serverId) not in SERVER_IDS:
            print('ServerId did not match')
            return redirect(url_for(".index", serverId=serverId))

    session[SESSION_SERVERID].update({serverId: session[SESSION_ID_KEY]})
    session.modified = True

    # Add user to online user if he is the not Admin
    if ADMIN_SERVERID[serverId] != session[SESSION_ID_KEY]:
        if serverId not in ONLINEUSERS_SERVERID:
            ONLINEUSERS_SERVERID[serverId] = []

        if session[SESSION_ID_KEY] not in ONLINEUSERS_SERVERID[serverId]:
            ONLINEUSERS_SERVERID[serverId].append(session[SESSION_ID_KEY])
        print(ONLINEUSERS_SERVERID[serverId])

    return render_template("chatroom.html")


@ service_blueprint.route("/home", methods=["GET", "POST"])
@ cross_origin()
def home():
    """
    Landing page for home
    """
    print("Home Called")

    # Check if the session is logged in, if not redirect to index
    if not session.get(SESSION_LOGGEDIN, False):
        print('Session not logged in')
        return redirect(url_for(".index"))

    return render_template("home.html")


@ api_blueprint.route("/login", methods=["POST"])
@ cross_origin()
def login():
    """
    Internal API for handeling Login Request
    """
    print("Login Called")

    data = json.loads(request.data)
    username = data.get("username", None)
    password = data.get("password", None)

    if username != None and password != None:
        if auth_login(username, password):
            return jsonify({"status": True})

    return jsonify({"status": False})


@ api_blueprint.route("/createServer", methods=["POST"])
@ cross_origin()
def createServer():
    """
    Internal API for handeling CreateServer Request
    """
    print("Create server")

    username = session[SESSION_ID_KEY]

    if username != None:
        if SESSION_SERVERID not in session:
            session[SESSION_SERVERID] = {}

        # generate server ID
        serverId = generate_serverId()
        session[SESSION_SERVERID].update({serverId: username})
        session.modified = True

        print(session[SESSION_SERVERID])
        ADMIN_SERVERID[serverId] = username

        return jsonify({"serverId": serverId, "status": True})

    return jsonify({"serverId": -1, "status": False})


@ api_blueprint.route("/joinServer", methods=["POST"])
@ cross_origin()
def joinServer():
    """
    Internal API for handling JoinServer Request
    """
    print("Join Server")

    return jsonify({"status": True})


@ api_blueprint.route("/logout", methods=["POST"])
@ cross_origin()
def logout():
    """
    Internal API for handling Logout Request
    """
    print("Logout called")

    # Logout the session
    session[SESSION_LOGGEDIN] = False

    # Delete the active chatrooms
    session[SESSION_SERVERID].clear()
    session[SESSION_ID_KEY] = ''
    session.modified = True

    return jsonify({"status": True})
