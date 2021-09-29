from model import ORM

class Review(ORM):
    tablename = 'review'
    columns = ['id', 'description', 'summary', 'rating', 'score', 'anime_id', 'user_id']

    def __init__(self, id, description, summary, rating, score, anime_id, user_id):
        self.id = id
        self.description = description
        self.summary = summary
        self.rating = rating
        self.score = score
        self.anime_id = anime_id
        self.user_id = user_id
    
    @classmethod
    def find_by_animeid_or_userid(cls, anime_id=None, user_id=None):
        with cls.db_conn as conn:
            cursor = conn.cursor()
            clause = ''
            values = []
            if anime_id:
                clause += f' and anime_id=%s '
                values.append(anime_id)

            if user_id:
                clause += f' and user_id=%s '
                values.append(user_id)
            
            sql = f'select a.name, r.description, r.summary, r.score, r.anime_id, a.cover_image from {cls.tablename} r join anime a on r.anime_id=a.id where  1=1 {clause}'
            cursor.execute(sql, values)
            return cursor.fetchall()
    