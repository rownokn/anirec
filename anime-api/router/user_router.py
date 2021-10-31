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
    try:
        account = UserInfo.authenticate(username, password)
        if account:
            access_token = create_access_token(identity = account.username)
            refresh_token = create_refresh_token(identity = account.username)
            account.session_id = access_token
            account.update()
            return jsonify({"session_id": access_token, "user_id": account.id,
                            "username": account.username, "auth":True})
    except TypeError:
        return jsonify({"session_id": "",
                    "username": "", "msg": "Invalid Username or Password"}), 401
    
    
@app.route('/users', methods=['GET'])
def display_users():
    users = UserInfo.display_all_user()
    return jsonify(users)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    password = UserInfo.hash_password(data.get('password'))
    session_id = data.get('session_id')
    UserInfo.register(email,session_id,username,password)
    return jsonify({"msg": "Register Successful", "username": username})

@app.route('/manage_activity', methods=['POST'])
@jwt_required()
def manage_activity():
    data = request.get_json()
    status = data.get('status')
    score = data.get('score')
    progress = data.get('episode_watched')
    user_id = data.get('user_id')
    anime_id = data.get('anime_id')
    activities = UserInfo.display_user_activity_by_anime(anime_id, user_id)
    UserInfo.upsert(status, progress, score, user_id, anime_id)

    if activities:
        return jsonify({"msg": "Anime Activity Updated", "activities": {
                            "status": status,
                            "episode_watched": progress ,
                            "score" : score,
                            "user_id": user_id,
                            "anime_id" : anime_id                  
                        }})
    else:
        return jsonify({"msg": "Anime Activity Added to Library", "activities": {
                            "status": status,
                            "episode_watched": progress ,
                            "score" : score,
                            "user_id": user_id,
                            "anime_id" : anime_id                  
                        }})


@app.route('/display_activity', methods=['POST'])
@jwt_required()
def display_user_activity_anime():
    data = request.get_json()
    anime_id = data.get('anime_id')
    user_id = data.get('user_id')
    activities = UserInfo.display_user_activity_by_anime(user_id, anime_id)
    if activities:
        return jsonify({"activities": activities, 'exist': True})
    else:
        return jsonify({"activities": activities, 'exist': False})


@app.route('/delete_activity/<user_id>/<anime_id>', methods=['DELETE'])
@jwt_required()
def delete_user_activity(user_id, anime_id):
    UserInfo.delete_user_activity(user_id, anime_id)
    return jsonify({'msg': 'Activity Deleted'})

@app.route('/add_favorite', methods=['POST'])
@jwt_required()
def add_favorite():
    data = request.get_json()
    user_id = data.get('user_id')
    anime_id = data.get('anime_id')
    if UserInfo.favorite_exist(user_id, anime_id):
        return jsonify({'msg': 'Anime Already Added', "exist": True}), 403
    else:
        UserInfo.add_to_favorite(user_id, anime_id)
        return jsonify({'msg': 'Anime Added To Favorites', "exist": False})
   

@app.route('/delete_favorite/<user_id>/<anime_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(user_id, anime_id):
    if UserInfo.favorite_exist(user_id, anime_id):
        UserInfo.delete_favorite(user_id, anime_id)
        return jsonify({'msg': 'Anime Deleted From Favorites', "exist": True})
    else:
        return jsonify({'msg': 'Anime Does Not Exist In Favorites', "exist": False}), 404

@app.route('/favorite_exist/<user_id>/<anime_id>', methods=['GET'])
@jwt_required()
def fav_exist(user_id, anime_id):
    if UserInfo.favorite_exist(user_id, anime_id):
        return jsonify({"exist": True})
    else:
        return jsonify({"exist": False}), 404


    
@app.route('/user_activity', methods=['POST'])
@jwt_required()
def display_activity():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        name = data.get('name')
        user_activity_data = UserInfo.display_user_activity_by_user(user_id, name)
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

@app.route('/add_review', methods=['POST'])
@jwt_required()
def add_review():
    data = request.get_json()
    description = data.get('description')
    summary = data.get('summary')
    rating = data.get('rating')
    score = data.get('score')
    user_id = data.get('user_id')
    anime_id = data.get('anime_id')
    UserInfo.add_review(description, summary, rating, score, user_id, anime_id)
    return jsonify({'msg': 'Review Successfully Added'})


@app.route("/logout/<session_id>", methods=["GET"])
def logout(session_id):
    account = UserInfo.token_authenticate(session_id)
    account.session_id = ""
    account.update()
    return jsonify({})



