from python_graphql_client import GraphqlClient
from model import Character, AnimeCharacter, Anime

url = GraphqlClient(endpoint='https://graphql.anilist.co')

class CharacterData:
    @staticmethod
    def character_data(page):
        query = """
                query ($page: Int)  {
                Page(page:$page  , perPage: 500) {
                    pageInfo {
                    total
                    perPage
                    } 
                    characters{
                        id,
                        name {
                        full
                        native
                        },
                        image {
                        large
                        },
                        gender,
                        description,
                        media (type:ANIME) {
                            nodes {
                            id,
                            title {
                                english
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
        return data['data']['Page']


    @staticmethod
    def insert_anime_character():
        page = 0
        character = CharacterData.character_data(page)
        while page < 3000:
            for ch in character['characters']:
                for ani in ch['media']['nodes']:
                    charact = Character.find_by_id(ch['id'] )
                    anime = Anime.find_by_id(ani['id'])
                    ani_Ch = AnimeCharacter.get_by_anime_id(ani['id'])
                    if anime and charact and not AnimeCharacter.get_by_anime_character(ani['id'], ch['id']):
                        ch_insert = AnimeCharacter(ani['id'], ch['id'])     
                        print(ani['id'])   
                        print(ch['name'])                                  
                        ch_insert.insert()

            page += 1
            character = CharacterData.character_data(page)

    @staticmethod
    def insert_into_ch_database():
        page = 2626
        character = CharacterData.character_data(page)
        while page < 3000:
            
            for ch in character['characters']:
                charact = Character.find_by_id(ch['id'] )
                ch_insert = Character(ch['id'],
                                    ch['name']['full'],
                                    ch['image']['large'],
                                    ch['gender'],
                                    ch['description'],
                                    ch['name']['native'],
                                    )
                if ch['id'] > 300718:                    
                    if not charact:
                        print(ch['id'])
                        print(ch['name']['full'])
                        ch_insert.insert()
                    else:
                        ch_insert.update()
        

            page += 1
            character = CharacterData.character_data(page)