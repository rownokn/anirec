from model import ORM

class Character(ORM):
    tablename = 'character'
    columns = ['id', 'name', 'image', 'gender', 'description', 'jap_name']

    def __init__(self, id, name, image, gender, description, jap_name):
        self.id = id
        self.name = name
        self.image = image
        self.gender = gender
        self.description = description
        self.jap_name = jap_name
    
    @classmethod
    def get_by_anime_id(cls, anime_id):
        with cls.db_conn as conn:
            cursor = conn.cursor()
            sql = f'''
                    select c.id, c.name, c.image from 
                    {cls.tablename} c join 
                    anime_character ac on 
                    c.id=ac.character_id 
                    where ac.anime_id=%s
                   '''
            cursor.execute(sql, [anime_id])
            return cursor.fetchall()
    
    



class AnimeStaff(ORM):
    tablename = 'anime_staff'
    columns = ['staff_name', 'language', 'character_id']

    def __init__(self,staff_name, language, character_id, id=None):
        self.staff_name = staff_name
        self.language = language
        self.character_id = character_id
        self.id = id
    
    def get_by_character_id(character_id):
        pass

    
