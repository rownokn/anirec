from model import ORM

class Users(ORM):
    tablename = 'users'
    columns = ['id', 'email', 'session_id', 'username', 'password']

    def __init__(self, email, session_id, username, password, id=None):
        self.email = email
        self.session_id = session_id
        self.username = username
        self.password = password
        self.id = id
    
    def insert(self):
        with self.db_conn as conn:
            cursor = conn.cursor()  
            sql = f"""INSERT INTO {self.tablename}(
                 id, email, session_id, username, password) 
                 VALUES (nextval('user_sequence'), %s, %s, %s, %s)"""
            values = [self.email, self.session_id, self.username, self.password]
            cursor.execute(sql,values)
    

    @classmethod
    def verify(cls, username, password):
        with cls.db_conn as conn:
            cursor= conn.cursor()
            sql = f'select id, email, session_id, username, password from {cls.tablename} where username=%s and password=%s'
            values = [username, password]
            cursor.execute(sql, values)
            user_data = cursor.fetchone()
            return cls(*user_data[1:], user_data[0])
    
    @classmethod
    def token_authenticate(cls, session_id):
        with cls.db_conn as conn:
            cur = conn.cursor()
            sql = f"select  id, email, session_id, username, password from {cls.tablename} where session_id=%s"
            cur.execute(sql, [session_id,])
            user_data = cur.fetchone()
            return cls(*user_data[1:], user_data[0])
    
class UserAnimeActivity(ORM):
    tablename = 'user_anime_activity'
    columns = ['status', 'episode_watched', 'score', 'user_id', 'anime_id', 'id']
    primary_key = 'id'

    def __init__(self, status, episode_watched, score, user_id, anime_id, id=None):
        self.status = status
        self.episode_watched = episode_watched
        self.score = score
        self.user_id = user_id
        self.anime_id = anime_id
        self.id = id


    def insert(self):
        with self.db_conn as conn:
            cursor = conn.cursor()  
            sql = f"""INSERT INTO {self.tablename}(
                 id, status, episode_watched, score, user_id, anime_id) 
                 VALUES (nextval('user_act_seq'), %s, %s, %s, %s, %s)"""
            values = [self.status, self.episode_watched, self.score, self.user_id, self.anime_id]            
            cursor.execute(sql,values)
    
    def delete_by_animeid_userid(self):
        with self.db_conn as conn:
            cursor = conn.cursor()
            sql = f"delete from {self.tablename} where anime_id=%s and user_id=%s"
            values = [self.anime_id, self.user_id]
            cursor.execute(sql, values)
    
    def update_by_animeid_userid(self):
        with self.db_conn as conn:
            cursor = conn.cursor()
            sql = f'''
                    update {self.tablename} set status=%s, 
                    episode_watched=%s, score=%s, 
                    id=%s where anime_id=%s and user_id=%s
                   '''
            values = [self.status, self.episode_watched, self.score, self.id, self.anime_id, self.user_id]
            print(sql)
            print(values)
            cursor.execute(sql, values)
    
    @classmethod
    def get_by_userid(cls, user_id, name):
        with cls.db_conn as conn:
            cur = conn.cursor()
            sql = f'''
                      select a.cover_image, a.name, ua.status,  
                      ua.episode_watched || '/' || a.episodes as progress,  
                      ua.score, ua.anime_id, a.english_name from {cls.tablename} ua 
                      join anime a on ua.anime_id=a.id 
                      where  ua.user_id=%s
                   '''
            values = [user_id]

            if name:
                sql += ' and (a.name ilike %s or a.english_name ilike %s)'
                values.append('%' + name + '%')
                values.append('%' + name + '%')

            cur.execute(sql, values)
            return cur.fetchall()
            
    
    @classmethod
    def find_by_animeid_and_userid(cls,anime_id, user_id):
        with cls.db_conn as conn:
            cursor = conn.cursor()
            sql = f'''select status, episode_watched, score, 
                      id from {cls.tablename}
                      where anime_id=%s'''
            values = [anime_id]
            if user_id != 'undefined':
                 sql += ' and user_id=%s'
                 values.append(user_id)
            cursor.execute(sql, values)
            return cursor.fetchone()


class UserFavoriteAnime(ORM):
    tablename = 'user_favorite_anime'
    columns = ['user_id', 'anime_id']
    primary_key = 'id'

    def __init__(self, user_id, anime_id, id=None):
        self.user_id = user_id
        self.anime_id = anime_id
        self.id = id
    
    def delete_by_animeid_userid(self):
        with self.db_conn as conn:
            cursor = conn.cursor()
            sql = f"delete from {self.tablename} where anime_id=%s and user_id=%s"
            values = [self.anime_id, self.user_id]
            cursor.execute(sql, values)

    @classmethod
    def get_by_animeid_userid(cls, anime_id, user_id):
        with cls.db_conn as conn:
            cursor = conn.cursor()
            sql = f"select  * from {cls.tablename} where anime_id=%s"
            values = [anime_id]
            if user_id != 'undefined':
                 sql += ' and user_id=%s'
                 values.append(user_id)
            cursor.execute(sql, values)
            return cursor.fetchone()

    @classmethod
    def get_by_userid(cls, user_id):
        with cls.db_conn as conn:
            cursor = conn.cursor()
            sql = f"""
                select  a.cover_image, a.name, a.id,  a.english_name from anime a 
                join {cls.tablename} af 
                on a.id=af.anime_id 
                where af.user_id=%s;
            """
            values = [user_id]
            cursor.execute(sql, values)
            return cursor.fetchall()



    