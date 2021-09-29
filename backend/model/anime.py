from model import ORM
from analysis import AnimeActivityRec, AnimeReviewRec
import json

class Anime(ORM):
    tablename = 'anime'
    columns = ['id', 'name', 'jap_name', 'season', 'episodes', 'status', 'format', 'start_date', 'end_date', 'average_score', 'cover_image', 'banner_image', 'summary' ]

    def __init__(self, id, name, jap_name, season, episodes, status, format, start_date, end_date, average_score, cover_image, banner_image,summary):
        self.id = id
        self.name = name
        self.jap_name = jap_name
        self.season = season
        self.episodes = episodes
        self.status = status
        self.format = format
        self.start_date = start_date
        self.end_date = end_date
        self.average_score = average_score
        self.cover_image = cover_image
        self.banner_image = banner_image
        self.summary = summary

    
    @classmethod
    def get_similar_anime_by_user_activity(cls, anime_id):  
        with cls.db_conn as conn:
            cursor = conn.cursor()
            animes = AnimeActivityRec.get_similar_anime(anime_id)
            anime_ids = ', '.join(map(str, animes))
            sql = f"select id, name, cover_image from {cls.tablename} where id in ({anime_ids}) "
            cursor.execute(sql)
            return cursor.fetchall()
    
    @classmethod
    def get_similar_anime_by_reviews(cls, anime_id):  
        with cls.db_conn as conn:
            cursor = conn.cursor()
            animes = AnimeReviewRec.get_similar_anime(anime_id)
            anime_ids = ', '.join(map(str, animes))
            sql = f"select id, name, cover_image from {cls.tablename} where id in ({anime_ids}) "
            cursor.execute(sql)
            return cursor.fetchall()
    
    @classmethod
    def get_similar_anime_by_similar_users(cls, user_id):  
        with cls.db_conn as conn:
            cursor = conn.cursor()
            anime_activity = AnimeActivityRec(user_id)
            similar_user_idx = anime_activity.similar_users()
            anime_rec = json.loads(anime_activity.recommend_item(similar_user_idx))
            animeid = []
            for id in anime_rec['data']:
                animeid.append(id['id'])
            anime_ids = ', '.join(map(str, animeid))
            sql = f"select id, name, cover_image from {cls.tablename} where id in ({anime_ids}) "
            cursor.execute(sql)
            return cursor.fetchall()
    
    @classmethod
    def get_anime_by_name(cls, anime_name):
        with cls.db_conn as conn:
            cursor = conn.cursor()
            sql = f"select id, name, cover_image from {cls.tablename} where name ilike %s  "
            values = ['%' + anime_name + '%']
            cursor.execute(sql,values)
            return cursor.fetchall()


    def detailed_anime(cls, search):
        pass



   



