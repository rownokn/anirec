from model import ORM
from analysis import AnimeActivityRec, AnimeReviewRec
import json

class Anime(ORM):
    tablename = 'anime'
    columns = ['id', 'name', 'jap_name', 'season', 'episodes', 'status', 'format', 'start_date', 'end_date', 'average_score', 'cover_image', 'banner_image', 'summary', 'english_name']

    def __init__(self, id, name, jap_name, season, episodes, status, format, start_date, end_date, average_score, cover_image, banner_image,summary, english_name):
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
        self.english_name = english_name

    
    @classmethod
    def update_anime(cls, english_name, id):
        with cls.db_conn as conn:
            cursor = conn.cursor()
            sql = f'UPDATE {cls.tablename} SET english_name=%s  where id=%s '
            values = [english_name, id]
            cursor.execute(sql,values)

    @classmethod
    def get_similar_anime_by_user_activity(cls, anime_id):  
        with cls.db_conn as conn:
            cursor = conn.cursor()
            animes = AnimeActivityRec.get_similar_anime(anime_id)
            anime_ids = ', '.join(map(str, animes))
            sql = f"select id, name, cover_image, english_name from {cls.tablename} where id in ({anime_ids}) "
            cursor.execute(sql)
            return cursor.fetchall()
    
    @classmethod
    def get_similar_anime_by_reviews(cls, anime_id):  
        with cls.db_conn as conn:
            cursor = conn.cursor()
            animes = AnimeReviewRec.get_similar_anime(anime_id)
            anime_ids = ', '.join(map(str, animes))
            sql = f"select id, name, cover_image, english_name from {cls.tablename} where id in ({anime_ids}) "
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
            sql = f"select id, name, cover_image, english_name from {cls.tablename} where id in ({anime_ids}) "
            cursor.execute(sql)
            return cursor.fetchall()
    
    @classmethod
    def get_anime_by_category(cls, name):
         with cls.db_conn as conn:
            cursor = conn.cursor()
            sql = f"""
                    select distinct a.id, a.name, cover_image, english_name from {cls.tablename} a join anime_genre ag on a.id=ag.anime_id join anime_tag at 
                    on at.anime_id=a.id join tag t on t.id=at.tag_id
                    where ag.name=%s or t.name=%s;      
                   """
            values = [name, name]
            cursor.execute(sql,values)
            return cursor.fetchall()
    
    @classmethod
    def get_anime_by_studio(cls, name):
         with cls.db_conn as conn:
            cursor = conn.cursor()
            sql = f"""
                    select distinct a.id, a.name, cover_image, english_name from {cls.tablename} a 
                    join anime_studio astud on a.id=astud.anime_id  
                    where astud.studio_name=%s;      
                   """
            values = [name]
            cursor.execute(sql,values)
            return cursor.fetchall()
        

    
    @classmethod
    def get_anime_by_name(cls, anime_name):
        with cls.db_conn as conn:
            cursor = conn.cursor()
            sql = f"select id, name, cover_image, english_name from {cls.tablename} where name ilike %s or english_name ilike %s  "
            values = ['%' + anime_name + '%', '%' + anime_name + '%']
            cursor.execute(sql,values)
            return cursor.fetchall()
    
    @classmethod
    def get_anime_format(cls):
        with cls.db_conn as conn:
            cursor = conn.cursor()
            sql = f"select distinct(format) from {cls.tablename} where format is not null"
            cursor.execute(sql)
            return cursor.fetchall()
    
    @classmethod
    def get_anime_status(cls):
        with cls.db_conn as conn:
            cursor = conn.cursor()
            sql = f"select distinct(status) from {cls.tablename} where status is not null"
            cursor.execute(sql)
            return cursor.fetchall()


    @classmethod
    def detailed_anime(cls, name, genre, tag, year, season, format, status, start_date, end_date):
         with cls.db_conn as conn:
            cursor = conn.cursor()
            sql = f"""select distinct a.id, a.name, cover_image, english_name 
                      from {cls.tablename} a 
                      JOIN anime_genre ag ON A.ID = ag.anime_id
	                  JOIN anime_tag AT ON AT.anime_id = A.ID 
                      JOIN tag t on t.id=at.tag_id 
                      JOIN anime_studio ast ON AST.anime_id = A.ID 
                      where 1=1  """
            
            values = []

            if name:
                sql += ' and a.name ilike ANY (array[%s, %s, %s]) or a.english_name ilike ANY (array[%s, %s, %s])'
                values.append('%' + name + '%')
                values.append(name + '%')
                values.append('%' + name)
                values.append('%' + name + '%')
                values.append(name + '%')
                values.append('%' + name)

            if genre:
                sql += " and ag.name=%s"
                values.append(genre)
            
            if tag:
                sql += ' and t.name=%s'
                values.append(tag)
            
            if year != 'N/A':
                sql += ' and a.season ilike %s'
                values.append('%' + year)
            
            if season:
                sql += ' and a.season ilike %s'
                values.append(season + "%")
            
            if format:
                sql += ' and a.format = %s'
                values.append(format)
            
            if status:
                sql += ' and a.status = %s'
                values.append(status)
            
            if start_date :
                sql += ' and a.start_date >= %s'
                values.append(start_date)
            
            if end_date :
                sql += ' and a.end_date <= %s'
                values.append(end_date)
            cursor.execute(sql,values)
            return cursor.fetchall()



   



