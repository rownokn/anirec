from config import DBConfig
from datetime import  date



class ORM:
    db_conn = DBConfig()
    tablename = ''
    columns = []
    primary_key = 'id'

    def insert(self):
        with self.db_conn as conn:
            cursor = conn.cursor()  
            percent_s = ','.join(['%s' for _ in self.columns])
            col = ",".join([k for k in self.columns])
            sql = f"""INSERT INTO {self.tablename}(
                {col}) VALUES ({percent_s})"""
            values = [getattr(self,v) for v in self.columns]
            cursor.execute(sql,values)
    
    def update(self):
        with self.db_conn as conn:
            cursor = conn.cursor()
            data_update = ", ".join([f"{k}=%s" for k in self.__dict__.keys()])
            where_clause = f'{self.primary_key}={self.__dict__.get(self.primary_key)}'
            sql = f'UPDATE {self.tablename} SET {data_update} where {where_clause} '
            values = [v for v in self.__dict__.values()]
            print(sql)
            print(values)
            cursor.execute(sql,values)
    
    def delete(self):
        with self.db_conn as conn:
            cursor = conn.cursor()
            where_clause = f'{self.primary_key}={self.__dict__.get(self.primary_key)}'
            sql = f"""DELETE FROM {self.tablename} WHERE {where_clause}"""
            values = [v for v in self.__dict__.values()]
            cursor.execute(sql,values)
    
    @classmethod
    def find_by_id(cls, id):
        with cls.db_conn as conn:
            cursor = conn.cursor()
            where_clause = f'{cls.primary_key}={id}'
            sql = f"SELECT * FROM {cls.tablename} WHERE {where_clause}"
            cursor.execute(sql, [id])
            return  cursor.fetchone()
    
    @classmethod
    def select_all(cls):
         with cls.db_conn as conn:
            cursor = conn.cursor()
            sql = f"""SELECT * FROM {cls.tablename}"""
            cursor.execute(sql)
            return cursor.fetchall()
    




