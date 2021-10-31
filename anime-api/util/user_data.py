from python_graphql_client import GraphqlClient
from model import Anime, Users, UserAnimeActivity, Review, UserFavoriteAnime
from service import UserInfo

url = GraphqlClient(endpoint='https://graphql.anilist.co')

class UserData:

    @staticmethod
    def user_data(page):
        query = """
            query ($page:Int)   {
                Page(page:$page  , perPage: 100) {
                    pageInfo {
                    total
                    perPage
                    } 
                    users {
                        id,
                    name,
                    favourites {
                        anime {
                        nodes {
                            id,
                        
                        }
                        }
                    }
                    
                    
                    }
                }
                }
        """
        variables = {
            'page': page,
        }
        data = url.execute(query=query, variables=variables)
        return data['data']['Page']['users']


    @staticmethod
    def user_favorite_query(user_id):
        query = """
            query ($userId:Int) {
                User (id: $userId) {
                    id,
                    favourites{
                        anime {
                            nodes {
                            id
                            }
                        }
                    
                    }
                }
            }
        """

        variables = {
            'userId': user_id,
        }

        data = url.execute(query=query, variables=variables)
        return data['data']['User']

    @staticmethod
    def user_review_data(page):
        query = """
            query($page: Int)  {
                Page(page:$page , perPage: 100) {
                    pageInfo {
                    total
                    perPage
                    } 
                    reviews  {
                        id,
                        mediaId,
                        userId,
                        body,
                        summary,
                        rating,
                        score,
                        user {
                        id,
                        name,
                        favourites {
                        anime {
                        nodes {
                            id,
                        
                        }
                        }
                    }
                    }
                    }
                }
            }
        """
        variables = {
            'page': page,
        }
        data = url.execute(query=query, variables=variables)
        return data['data']['Page']['reviews']

    @staticmethod
    def user_activity_data(page):
        query = """
        query($page: Int)  {
            Page(page:$page , perPage: 100) {
                pageInfo {
                total
                perPage
                } 
                
                mediaList\   {
                    id,
                    mediaId,
                    userId,
                    progress,
                    score,
                    status,
                    user {
                        id,
                        name,
                        favourites {
                        anime {
                        nodes {
                            id,
                        
                        }
                        }
                        }
                    }
                    media {
                        id,
                        title{
                        userPreferred
                        }
                    }
                }

                
            }
            }

            
            """
        variables = {
            'page': page,
        }
        data = url.execute(query=query, variables=variables)
        return data['data']['Page']


        
                            
                    
                
    @staticmethod
    def import_users():
        page = 746
        users = UserData.user_data(page)
        while page <= 26904:
            for user in users:
                existing_users = Users.find_by_id(user['id'])

                if not existing_users:
                    print(user)
                    u = Users(user['id'], '{}@anilist.com'.format(user['name']), '', user['name'], UserInfo.hash_password('12345'))
                    u.insert()
                    if user['favourites']['anime']['nodes']:
                        for ani in user['favourites']['anime']['nodes']:
                            user_fav = UserFavoriteAnime(user['id'], ani['id'])
                            user_fav.insert()
                    
                        
                    
            page += 1
            users = UserData.user_data(page)


    @staticmethod
    def import_anime_favorites():
        users = Users.select_all()
        for user in users:
            existing_users = Users.find_by_id(user['id'])
            user_api = UserData.user_favorite_query(user[0])
            if existing_users and user_api['favourites']['anime']['nodes'] != []:
                for ani in user_api['favourites']['anime']['nodes']:
                    user_fav = UserFavoriteAnime(user_api['id'], ani['id'])
                    user_fav.insert()

    @staticmethod
    def import_review():
        page = 1
        anime_review = UserData.user_review_data(page)
    
        while page < 160:
            for rev in anime_review:
                existing_users = Users.find_by_id(rev['userId'])
                anime = Anime.find_by_id(rev['mediaId'])
                review_data = Review.find_by_id(rev['id'])
                if not existing_users:
                    u = Users(rev['user']['id'], '{}@anilist.com'.format(rev['user']['name']), '', rev['user']['name'], UserInfo.hash_password('12345'))
                    u.insert()
                    if rev['user']['favourites']['anime']['nodes']:
                        for ani in rev['user']['favourites']['anime']['nodes']:
                            user_fav = UserFavoriteAnime(rev['user']['id'], ani['id'])
                            user_fav.insert()


                if anime and not review_data:
                        ani_rev = Review(rev['id'], rev['body'], rev['summary'], rev['rating'], rev['score'], rev['mediaId'], rev['userId'])
                        ani_rev.insert()
                
            page += 1
            anime_review = UserData.user_review_data(page)
    
        
        
    @staticmethod
    def user_activty():
        page = 1
        users = UserData.user_activity_data(page)
        while page <= 15:
            for user in users['mediaList']:
                existing_users = Users.find_by_id(user['userId'])
                anime = Anime.find_by_id(user['mediaId'])
                user_Act = UserAnimeActivity.find_by_id(user['id'])
                if not existing_users and user['user']:
                    print(user['user'])
                    u = Users('{}@anilist.com'.format(user['user']['name']), '', user['user']['name'], UserInfo.hash_password('12345'), user['user']['id'])
                    u.insert()
                    if user['user']['favourites']['anime']['nodes']:
                        for ani in user['user']['favourites']['anime']['nodes']:
                            print(ani)
                            user_fav = UserFavoriteAnime(user['user']['id'], ani['id'])
                            user_fav.insert()
            
                if not user_Act and anime and user['user']:
                    print(user)
                    user_activity = UserAnimeActivity(user['status'], user['progress'], user['score'], user['userId'], user['mediaId'], user['id'])
                    user_activity.insert()
                
            page += 1
            users = UserData.user_activity_data(page)


