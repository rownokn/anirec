from model import ORM

class Tag(ORM):
    tablename = 'tag'
    columns = ['id', 'name', 'description', 'category']

    def __init__(self, id, name, description, category):
        self.id = id
        self.name = name
        self.description = description
        self.category = category
    
    @classmethod
    def get_by_anime_id(cls, anime_id):
        with cls.db_conn as conn:
            cursor = conn.cursor()
            sql = f"select * from {cls.tablename} t join anime_tag at on t.id=at.tag_id where at.anime_id=%s and category <> 'Sexual Content'"
            values = [anime_id]
            cursor.execute(sql, values)
            return cursor.fetchall()