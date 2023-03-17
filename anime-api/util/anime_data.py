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
                                              
                        if not AnimeEpisodes.get_episode(ep['title'], ep['url'], ep['site']):
                            anime_ep = AnimeEpisodes(ep['title'],ep['url'], ep['site'], ani['id'] )
                            anime_ep.insert()
                        

            page += 1
            anime = AnimeData.anime_data(page)




    @staticmethod
    def import_anime_tag():
        page = 0
        anime = AnimeData.anime_data(page)
        while page < 800:
            for ani in anime['media']:
                existing_anime_data=Anime.find_by_id(ani['id'])
                if existing_anime_data:
                    for tag in ani['tags']:
                        a_tag = AnimeTag.get_by_anime_id(ani['id'])
                        ani_tag = AnimeTag(tag['id'], ani['id'])
                        if not a_tag:
                            print(ani['id'])
                            print(tag['id'])
                            ani_tag.insert()
            page += 1
            anime = AnimeData.anime_data(page)

    @staticmethod
    def import_studio():
        page = 0
        anime = AnimeData.anime_data(page)
        while page < 800:
            for ani in anime['media']:
                existing_anime_data=Anime.find_by_id(ani['id'])
                if existing_anime_data:
                    for std in ani['studios']['nodes']:
                        s_tag = AnimeStudio.get_by_anime_id(ani['id'])
                        ani_studio = AnimeStudio(ani['id'],std['name'] )
                        if not s_tag:
                            print(ani['id'])
                            print(std['name'])
                            ani_studio.insert()
                
            page += 1
            anime = AnimeData.anime_data(page)


    @staticmethod
    def import_genre():
        page = 0
        anime = AnimeData.anime_data(page)
        while page < 900:
            for ani in anime['media']:
                existing_anime_data=Anime.find_by_id(ani['id'])
                if existing_anime_data:
                    genres = ani['genres']
                    for g in genres:
                        g_tag = AnimeGenre.get_by_anime_id(ani['id'])
                        ani_genre = AnimeGenre(g,ani['id'] )
                        if not g_tag:
                            print(ani['genres'])
                            ani_genre.insert()
            page += 1
            anime = AnimeData.anime_data(page)
            


    @staticmethod
    def import_tag_data():
        tags = AnimeData.tag_data()
        for tag in tags:
            t = Tag(tag['id'], tag['name'], tag['description'], tag['category'])
            tagdata = Tag.find_by_id(tag['id'])
            if not tagdata:
                t.insert()


    @staticmethod
    def insert_into_database():
        page = 0
        anime = AnimeData.anime_data(page)
        
        while page < 400:
            
            for ani in anime['media']:
                existing_anime_data=Anime.find_by_id(ani['id'])
                
                start_date = None
                end_date = None
                season = None
                if ani['season'] or ani['seasonYear']:
                    season = ani['season'] + ' ' + str(ani['seasonYear'])

                if ani['endDate']['year'] and ani['endDate']['month'] and ani['endDate']['day']:
                    end_date = datetime.date(ani['endDate']['year'], ani['endDate']['month'], ani['endDate']['day'])

            
                
                if ani['startDate']['year'] and ani['startDate']['month'] and ani['startDate']['day']:
                    start_date = datetime.date(ani['startDate']['year'], ani['startDate']['month'], ani['startDate']['day'])
                
                anime_modify = Anime(ani['id'],
                                    ani['title']['userPreferred'],
                                    ani['title']['native'],
                                    season,
                                    ani['episodes'] if ani['episodes'] else 0, 
                                    ani['status'],
                                    ani['format'],
                                    start_date if start_date else None,
                                    end_date if end_date else None, 
                                    ani['averageScore'],
                                    ani['coverImage']['large'],
                                    ani['bannerImage'], ani['description'].replace("\'", "") if ani['description'] else "", ani['title']['english'] if ani['title']['english'] else "")

                if existing_anime_data:
                    anime_modify.update()
                else:    
                    anime_modify.insert()
                    print(f"{ani['id']} {ani['title']['english']}")
                    
            page += 1
            anime = AnimeData.anime_data(page)

            



