import psycopg2

class DBConfig:
    def __init__(self, conn=None):
        self.host = "localhost"
        self.database = 'anime'
        self.user = "rownoknowrose"
        self.password = "dbtenchi"
        self.port = '5433'
        self.conn = conn
       
       
    
    def __enter__(self):
        self.conn = psycopg2.connect(
                host=self.host,
                database=self.database,
                user=self.user,
                password=self.password,
                port=self.port)

        return self.conn
    
    def __exit__(self, exc_type, exc_value, traceback):
        if not exc_type:
            self.conn.commit()
        self.conn.close()



   


