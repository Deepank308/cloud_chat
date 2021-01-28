from flask import render_template, Blueprint, jsonify, request, redirect, url_for
from flask_cors import cross_origin

hello_blueprint = Blueprint('hello', __name__)
login_blueprint = Blueprint('login', __name__)
chatroom_blueprint = Blueprint('chatroom', __name__)

'''
    Home page
'''


@hello_blueprint.route('/')
@hello_blueprint.route('/<serverId>')
def index(serverId=None):
    '''
        To Do : Check if serverId is valid
    '''
    print("Index Called", serverId)
    return render_template('index.html')


'''
    Chat Room
'''


@chatroom_blueprint.route('/chatroom/<serverId>', methods=["GET", "POST"])
@cross_origin()
def chatroom(serverId):
    '''
        To Do : Check if serverId, username, passwords are valid
    '''
    print("Chatroom Called")
    print(request, serverId)
    return render_template('chatroom.html')
