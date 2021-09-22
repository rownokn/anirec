from config import DBConfig
import pandas as pd

class AnimeQuery:
    db_conn = DBConfig()

    @classmethod
    def create_pandas_table(cls, sql_query):
        with cls.db_conn as conn:
            table = pd.read_sql_query(sql_query, conn)
            return table

    @classmethod
    def get_anime_by_user_activity(cls):
        anime_query = cls.create_pandas_table("""
                        select a.id, user_id,
                        CAST((CASE 
                        WHEN u.score <= 10 THEN
                        (CAST(u.score as decimal) / 10) 
                        ELSE (CAST(u.score as decimal) /100) END) * 100 as INT) as score from anime a 
                        join user_anime_activity u on a.id=u.anime_id where score > 0;
                       """)
        return anime_query
    
    @classmethod
    def get_anime_by_user_reviews(cls):
        anime_review_query = cls.create_pandas_table("""
                                select a.id, a.name,  a.cover_image, r.score, r.user_id from review r join anime a on r.anime_id=a.id;
                              """)
        return anime_review_query