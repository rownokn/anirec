from model import Users, UserAnimeActivity, UserFavoriteAnime, Review
from hashlib import sha256

class UserInfo:
    @staticmethod
    def hash_password(password):
        """Hash a given password to obtain the SHA256 has or a given 
        string value
        """
        hasher = sha256()
        hasher.update(password.encode())
        return hasher.hexdigest()
    
    
    @staticmethod
    def register(email, session_id, username, password):
        user = Users(email, session_id, username, password)
        user.insert()
    
    @staticmethod
    def authenticate(username, password):
        return Users.verify(username, password)
        
    @staticmethod
    def token_authenticate(token):
        return Users.token_authenticate(token)

    @staticmethod
    def display_all_user():
        user_list = []
        users = Users.select_all()
        for user in users:
            user_data = {}
            user_data['email'] = user[1]
            user_data['username'] = user[2]
            user_list.append(user_data)
        return user_list

            
    
    @staticmethod
    def display_user_activity_by_anime(anime_id, user_id=None):
        user_activity = UserAnimeActivity.find_by_animeid_and_userid(anime_id, user_id)

        user_active_dic = {}
        if user_activity:
            user_active_dic['status'] = user_activity[0]
            user_active_dic['episode_watched'] = user_activity[1]
            user_active_dic['score'] = user_activity[2]
            user_active_dic['id'] = user_activity[3]
        return user_active_dic
    

    
    @staticmethod
    def upsert(status, episode_watched, score, user_id, anime_id):
        user_activity = UserAnimeActivity.find_by_animeid_and_userid(anime_id, user_id)
        if user_activity:
            user_anime_activity = UserAnimeActivity(status,episode_watched,score,user_id,anime_id, user_activity[3])
            user_anime_activity.update() 
        else:
            user_anime_activity = UserAnimeActivity(status,episode_watched,score,user_id,anime_id)
            user_anime_activity.insert()
  
    
    @staticmethod
    def add_review(description, summary, rating, score, user_id, anime_id):
        review = Review(description,summary,rating,score,anime_id, user_id)
        review.insert()
    
    @staticmethod
    def display_user_activity_by_user(user_id,name):
        user_activity = UserAnimeActivity.get_by_userid(user_id, name)
        activities = []

        for user in user_activity:
            user_active_dic = {}
            user_active_dic['cover_image'] = user[0]
            user_active_dic['name'] = user[1]
            user_active_dic['status'] = user[2]
            user_active_dic['progress'] = user[3]
            user_active_dic['score'] = user[4]
            user_active_dic['anime_id'] = user[5]
            user_active_dic['eng_title'] = user[6]
            activities.append(user_active_dic)
        return activities
    
    @staticmethod
    def delete_user_activity(user_id, anime_id):
        user_activity = UserAnimeActivity("", 0, 0, user_id, anime_id)
        user_activity.delete_by_animeid_userid()

    @staticmethod
    def delete_favorite(user_id, anime_id):
        user_fav = UserFavoriteAnime(user_id, anime_id)
        user_fav.delete_by_animeid_userid()

    @staticmethod
    def add_to_favorite(user_id, anime_id):
        user_fav = UserFavoriteAnime(user_id, anime_id)
        user_fav.insert()
    
    @staticmethod
    def favorite_exist(user_id, anime_id):
        if UserFavoriteAnime.get_by_animeid_userid(anime_id, user_id):
            return True
        return False

    @staticmethod
    def display_user_favorites(user_id):
        user_favorite_query = UserFavoriteAnime.get_by_userid(user_id)
        favorites = []
        for user in user_favorite_query:
            user_fav = {}
            user_fav['image'] = user[0]
            user_fav['title'] = user[1]
            user_fav['id'] = user[2]
            user_fav['eng_title'] = user[3]

            favorites.append(user_fav)
        return favorites
    
    @staticmethod
    def user_anime_reviews(user_id):
        reviews = []
        ani_review = Review.find_by_animeid_or_userid(anime_id=None, user_id=user_id)
        for review in ani_review:
            review_dic = {}
            review_dic['name'] = review[0]
            review_dic['description'] = review[1]
            review_dic['sumary'] = review[2]
            review_dic['score'] = review[3]
            review_dic['anime_id'] = review[4]
            review_dic['cover_image'] = review[5]
            review_dic['eng_title'] = review[6]
            reviews.append(review_dic)
        return reviews



class UserNotFoundError(Exception):
    pass






        
