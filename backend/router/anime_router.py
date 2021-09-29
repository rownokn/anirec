from service import AnimeInfo, AnimeBrowseInfo, AnimeNotFoundError,CharacterNotFoundError, UserInfo
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager


app = Flask(__name__)
app.config['SECRET_KEY'] = 'xo8R7i5fjFkUoNQr_wP8ZG7zw3JwRwwaz9_i4146YAM'
jwt = JWTManager(app)
CORS(app)

@app.route('/profile/<anime_id>/<user_id>', methods=['GET'])
def anime_profile(anime_id, user_id):
    try:
        anime_data = AnimeInfo.anime_profile(anime_id)
        activities = UserInfo.display_user_activity_by_anime(anime_id, user_id)

        return jsonify({"anime": anime_data, "activities": activities})
    except AnimeNotFoundError:
        return jsonify({"error": "Anime Not Found"}), 404

@app.route('/episodes/<id>', methods=['GET'])
def anime_episodes(id):
    try:
        anime_ep_data = AnimeInfo.anime_episodes(id)
        return jsonify({"anime_episodes": anime_ep_data})
    except AnimeNotFoundError:
        return jsonify({"error": "Anime Not Found"}), 404

@app.route('/tags/<id>', methods=['GET'])
def anime_tags(id):
    try:
        anime_tag_data = AnimeInfo.anime_tags(id)
        return jsonify({"anime_tags": anime_tag_data})
    except AnimeNotFoundError:
        return jsonify({"error": "Anime Not Found"}), 404 

@app.route('/reviews/<id>', methods=['GET'])
def anime_reviews(id):
    try:
        anime_review_data = AnimeInfo.anime_reviews(id)
        return jsonify({"anime_reviews": anime_review_data})
    except AnimeNotFoundError:
        return jsonify({"error": "Anime Not Found"}), 404 

@app.route('/characters_list/<id>', methods=['GET'])
def anime_characters(id):
    try:
        anime_character_data = AnimeInfo.anime_characters(id)
        return jsonify({"anime_characters": anime_character_data})
    except AnimeNotFoundError:
        return jsonify({"error": "Anime Not Found"}), 404

@app.route('/character/<id>', methods=['GET'])
def character_data(id):
    try:
        character_data = AnimeInfo.character_profile(id)
        return jsonify({"character": character_data})
    except CharacterNotFoundError:
        return jsonify({"error": "Character Not Found"}), 404

@app.route('/recommendation_within_api/<id>', methods=['GET'])
def anime_recommendation_data(id):
    try:
        rec_data = AnimeInfo.anime_recommedation_based_on_anime(id)
        return jsonify({"recommendation": rec_data})
    except AnimeNotFoundError:
        return jsonify({"error": "Anime Not Found"}), 404

@app.route('/populartrend', methods=['GET'])
def anime_popular():
    pop_anime_data = AnimeBrowseInfo.popular_anime()
    trend_anime_data = AnimeBrowseInfo.trending_anime()
    return jsonify({"popular": pop_anime_data, "trend": trend_anime_data})


@app.route('/recommendation/<id>', methods=['GET'])
def similar_anime_user_reviewid(id):
    try:
        anime_rev = AnimeInfo.similar_anime_by_user_review(int(id))
        anime_usr_act = AnimeInfo.similar_anime_by_user_activities(int(id))
        return jsonify({"review": anime_rev, "user_activity": anime_usr_act})
    except AnimeNotFoundError:
        return jsonify({"error": "Anime Not Found"}), 404

@app.route('/quick_search/<name>', methods=['GET'])
def anime_quick_search(name):
    search_anime = AnimeInfo.quick_search(name)
    return jsonify({"anime": search_anime})
  
"""
@app.route('/rec_by_user/<id>', methods=['GET'])
def similar_anime_rec_by_user(id):
    try:
        anime = AnimeBrowseInfo.similar_anime_reccomendations_by_user(int(id))
        return jsonify(anime)
    except AnimeNotFoundError:
        return jsonify({"error": "Anime Not Found"}), 404

"""


