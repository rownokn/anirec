from service import AnimeInfo, AnimeBrowseInfo, AnimeNotFoundError,CharacterNotFoundError, UserInfo, CategoryNotFoundError, StudioNotFoundError
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager


app = Flask(__name__)
app.config['SECRET_KEY'] = 'xo8R7i5fjFkUoNQr_wP8ZG7zw3JwRwwaz9_i4146YAM'
jwt = JWTManager(app)
CORS(app)

@app.route('/profile/<anime_id>/<user_id>', methods=['GET'])
def anime_profile(anime_id, user_id):
    activites_exist = False
    favorite_exist = False
    try:
        anime_data = AnimeInfo.anime_profile(anime_id)
        activities = UserInfo.display_user_activity_by_anime(anime_id, user_id)
        rec_data = AnimeInfo.anime_recommedation_based_on_anime(anime_id)
        fav_data =  UserInfo.favorite_exist(user_id, anime_id)
        if activities:
            activites_exist = True
        if fav_data:
            favorite_exist = True
        return jsonify({"anime": anime_data, 
                        "activities": activities, 
                        "recommendation": rec_data,
                        "activity_exist": activites_exist,
                        "favorite_exist": favorite_exist})
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
  

@app.route('/rec_by_user/<id>', methods=['GET'])
def similar_anime_rec_by_user(id):
    try:
        anime = AnimeBrowseInfo.similar_anime_reccomendations_by_user(int(id))
        return jsonify(anime)
    except AnimeNotFoundError:
        return jsonify({"error": "Anime Not Found"}), 404

@app.route('/anime_by_category/<name>', methods=['GET'])
def anime_by_category(name):
    try:
        anime = AnimeInfo.category_link(name)
        return jsonify(anime)
    except CategoryNotFoundError:
        return jsonify({"error": "Category Not Found"}), 404

@app.route('/anime_by_studio/<name>', methods=['GET'])
def anime_by_studio(name):
    try:
        anime = AnimeInfo.studio_link(name)
        return jsonify(anime)
    except StudioNotFoundError:
        return jsonify({"error": "Studio Not Found"}), 404

@app.route('/advanced_anime_search', methods=['POST'])
def advanced_search():
    try:
        data = request.get_json()
        name = data.get('name')
        genre = data.get('genre')
        tag = data.get('tag')
        year = data.get('year')
        season = data.get('season')
        season = data.get('season')

        format = data.get('format')
        status = data.get('status')
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        anime = AnimeInfo.advanced_search(name, genre, tag, year, season, format, status, start_date, end_date)
        dropdown = AnimeInfo.dropdown_data()
        return jsonify({'anime': anime, 'dropdown': dropdown})
    except AnimeNotFoundError:
        return jsonify({"error": "Anime Not Found"}), 404
    except StudioNotFoundError:
        return jsonify({"error": "Studio Not Found"}), 404
    except CategoryNotFoundError:
        return jsonify({"error": "Category Not Found"}), 404






