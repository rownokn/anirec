from service import UserInfo, UserNotFoundError
from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'xo8R7i5fjFkUoNQr_wP8ZG7zw3JwRwwaz9_i4146YAM'
jwt = JWTManager(app)
CORS(app)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = UserInfo.hash_password(data.get('password'))

    account = UserInfo.authenticate(username, password)
    if account:
        access_token = create_access_token(identity = account.username)
        refresh_token = create_refresh_token(identity = account.username)
        account.session_id = access_token
        account.update()
        return jsonify({"session_id": access_token, "user_id": account.id,
                        "username": account.username, "auth":True})
    return jsonify({"session_id": "",
                    "username": "", "msg": "Invalid Username or Password"}), 401

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    password = UserInfo.hash_password(data.get('password'))
    session_id = data.get('session_id')
    UserInfo.register(email,session_id,username,password)
    return jsonify({"msg": "Register Successful", "username": username})

@app.route('/manage_activity/<user_id>/<anime_id>', methods=['POST'])
def manage_activity(user_id, anime_id):
    data = request.get_json()
    id = data.get('id')
    status = data.get('status')
    score = data.get('score')
    progress = data.get('episode_watched')
    UserInfo.manage_user_activity(status, progress, score, user_id, anime_id, id)
    return jsonify({"msg": "You have now added this anime to your library"})

@app.route('/add_favorite', methods=['POST'])
@jwt_required()
def add_favorite():
    data = request.get_json()
    user_id = data.get('user_id')
    anime_id = data.get('anime_id')
    UserInfo.add_to_favorite(user_id, anime_id)
    return jsonify({'msg': 'Anime Added To Favorites'})

@app.route('/delete_favorite/<user_id>/<anime_id>/<id>', methods=['DELETE'])
def delete_favorite(user_id, anime_id):
    UserInfo.delete_favorite(user_id, anime_id, id)
    return jsonify({'msg': 'Anime Deleted From Favorites'})
    
@app.route('/delete_favorite/<user_id>/<anime_id>/<id>', methods=['DELETE'])
def delete_user_activity(user_id, anime_id):
    UserInfo.delete_user_activity(user_id, anime_id, id)
    return jsonify({'msg': 'Activity Deleted'})
    
@app.route('/user_activity', methods=['POST'])
@jwt_required()
def display_activity():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        user_activity_data = UserInfo.display_user_activity_by_user(user_id)
        return jsonify({"users": user_activity_data})
    except UserNotFoundError:
        return jsonify({"msg": "User Not Found"}), 404

@app.route('/user_favorite', methods=['POST'])
@jwt_required()
def display_favorites():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        user_favorite_data = UserInfo.display_user_favorites(user_id)
        return jsonify({"users": user_favorite_data})
    except UserNotFoundError:
        return jsonify({"msg": "User Not Found"}), 404

@app.route('/user_review', methods=['POST'])
@jwt_required()
def display_review():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        user_review_data = UserInfo.user_anime_reviews(user_id)
        return jsonify({"users": user_review_data})
    except UserNotFoundError:
        return jsonify({"msg": "User Not Found"}), 404

@app.route("/logout/<session_id>", methods=["GET"])
def logout(session_id):
    account = UserInfo.token_authenticate(session_id)
    account.session_id = ""
    account.update()
    return jsonify({})



