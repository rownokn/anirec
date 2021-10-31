from python_graphql_client import GraphqlClient

url = GraphqlClient(endpoint='https://graphql.anilist.co')

class AnimeInfoUtil:
    @staticmethod
    def recommendation_data(anime_id):
        query = """
            query($animeId:Int)  {
                Page(page:1 , perPage: 100) {
                    pageInfo {
                    total
                    perPage
                } 
                            
                recommendations(mediaId: $animeId)  {
                        mediaRecommendation{
                        id,
                        title {
                            userPreferred,
                            english
                        }, 
                        coverImage {
                            medium,
                            large
                        }   
                    }
                }
              }
            }
        """

        variables = {
            'animeId': anime_id
        }
        data = url.execute(query=query, variables=variables)
        return data['data']['Page']['recommendations']
    
    @staticmethod
    def most_popular_anime():
        query = """
            query   {
                Page(page:1 , perPage: 50) {
                    pageInfo {
                        total
                        perPage
                    },
                                            
                    media (type:ANIME, sort: [ POPULARITY_DESC, SCORE_DESC]) {
                        id,
                        title {
                            userPreferred,
                            english
                        },
                        coverImage {
                            medium,
                            large
                        }, 
                        averageScore,
      			        popularity,
      			        favourites       
                    }
                }
            }
        """
        data = url.execute(query=query)
        return data['data']['Page']['media']

    @staticmethod
    def anime_trends_data():
        query = """
            query   {
                Page(page:1 , perPage: 50) {
                    pageInfo {
                        total
                        perPage
                    },
                                            
                    media (type:ANIME, sort: [ TRENDING_DESC]) {
                        id,
                        title {
                            userPreferred,
                            english
                        }, 
                        coverImage {
                            medium,
                            large
                        },
                        trending,
                        favourites,
                        averageScore        
                    }
                }
            }
        """
        data = url.execute(query=query)
        return data['data']['Page']['media']

    