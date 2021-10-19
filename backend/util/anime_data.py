from python_graphql_client import GraphqlClient
from model import Anime,Tag, AnimeGenre, AnimeStudio, AnimeTag, AnimeEpisodes
import datetime

url = GraphqlClient(endpoint='https://graphql.anilist.co')

class AnimeData:
    @staticmethod
    def anime_data(page):
        query = """
                query ($page: Int)  {
                Page(page:$page  , perPage: 500) {
                    pageInfo {
                    total
                    perPage
                    } 
                    media(type: ANIME) {
                    id,
                    title {
                        userPreferred,
                        native,
                        english              
                    },
                    streamingEpisodes {
                        title,
                        url,
                        site
                    }
                    season,
                    description,
                    seasonYear,
                    episodes,
                    status,
                    genres,
                    format,
                    tags {
                    id
                    },
                    startDate {
                        year
                        month
                        day
                    },
                    endDate {
                        year
                        month
                        day
                    },
                    averageScore,
                    coverImage {
                        large
                    },
                    bannerImage,
                    studios {
                        nodes {
                            name
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
    def tag_data():
        query = """
        query  {
        MediaTagCollection(status: 10) {
            id,
            name,
            description,
            category
        }  
    }
        """
        data = url.execute(query=query)
        return data['data']['MediaTagCollection']

    @staticmethod
    def anime_episodes():
        page = 1
        anime = AnimeData.anime_data(page)
        while page < 334:
            for ani in anime['media']:
                existing_anime_data=Anime.find_by_id(ani['id'])
                if existing_anime_data:
                    for ep in ani['streamingEpisodes']:
                        print(ep['title'])
                        print(ep['url'])
                        print(ep['site'])
                        ani_ep = AnimeEpisodes.get_by_anime_id(ani['id'])
                        anime_ep = AnimeEpisodes(ep['title'],ep['url'], ep['site'], ani['id'] )
                        if not ani_ep:
                            anime_ep.insert()

            page += 1
            anime = AnimeData.anime_data(page)




    @staticmethod
    def import_anime_tag():
        page = 328
        anime = AnimeData.anime_data(page)
        while page < 334:
            for ani in anime['media']:
                existing_anime_data=Anime.find_by_id(ani['id'])
                if existing_anime_data:
                    for tag in ani['tags']:
                        print(ani['id'])
                        print(tag['id'])
                        a_tag = AnimeTag.get_by_anime_id(ani['id'])
                        ani_tag = AnimeTag(tag['id'], ani['id'])
                        if not a_tag and ani['id'] > 138723:
                            ani_tag.insert()
            page += 1
            anime = AnimeData.anime_data(page)

    @staticmethod
    def import_studio():
        page = 328
        anime = AnimeData.anime_data(page)
        while page < 334:
            for ani in anime['media']:
                existing_anime_data=Anime.find_by_id(ani['id'])
                if existing_anime_data:
                    for std in ani['studios']['nodes']:
                        print(ani['id'])
                        print(std['name'])
                        s_tag = AnimeStudio.get_by_anime_id(ani['id'])
                        ani_studio = AnimeStudio(ani['id'],std['name'] )
                        if ani['id'] > 138717:
                            ani_studio.insert()
                
            page += 1
            anime = AnimeData.anime_data(page)


    @staticmethod
    def import_genre():
        page = 329
        anime = AnimeData.anime_data(page)
        while page < 334:
            for ani in anime['media']:
                existing_anime_data=Anime.find_by_id(ani['id'])
                if existing_anime_data:
                    print(ani['genres'])
                    genres = ani['genres']
                    for g in genres:
                        print(ani)
                        g_tag = AnimeStudio.get_by_anime_id(ani['id'])
                        ani_genre = AnimeGenre(g,ani['id'] )
                        if not g_tag and ani['id'] >= 138882:
                            ani_genre.insert()
            page += 1
            anime = AnimeData.anime_data(page)
            


    @staticmethod
    def import_tag_data():
        tags = AnimeData.tag_data()
        for tag in tags:
            t = Tag(tag['id'], tag['name'], tag['description'], tag['category'])
            t.insert()


    @staticmethod
    def insert_into_database():
        page = 0
        anime = AnimeData.anime_data(page)
        
        while page < 400:
            
            for ani in anime['media']:
                existing_anime_data=Anime.find_by_id(ani['id'])
                """
                start_date = None
                end_date = None
                season = None
                if ani['season'] or ani['seasonYear']:
                    season = ani['season'] + ' ' + str(ani['seasonYear'])

                if ani['endDate']['year'] and ani['endDate']['month'] and ani['endDate']['day']:
                    end_date = datetime.date(ani['endDate']['year'], ani['endDate']['month'], ani['endDate']['day'])

            
                
                if ani['startDate']['year'] and ani['startDate']['month'] and ani['startDate']['day']:
                    start_date = datetime.date(ani['startDate']['year'], ani['startDate']['month'], ani['startDate']['day'])

                """       
                    
                if existing_anime_data:
                    Anime.update_anime(ani['title']['english'] ,ani['id'] )
                    """
                    else:
                        anime_insert = Anime(ani['id'],
                                        ani['title']['userPreferred'],
                                        ani['title']['native'],
                                        ani['description'].replace("\'", "") if ani['description'] else "",
                                        season,
                                        ani['episodes'] if ani['episodes'] else 0, 
                                        ani['status'],
                                        ani['format'],
                                        start_date if start_date else None,
                                        end_date if end_date else None, 
                                        ani['averageScore'],
                                        ani['coverImage']['large'],
                                        ani['bannerImage'])
                        anime_insert.insert()
                    """
            page += 1
            anime = AnimeData.anime_data(page)

            



