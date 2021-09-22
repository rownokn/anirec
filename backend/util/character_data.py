from python_graphql_client import GraphqlClient
from model import Character, AnimeCharacter, AnimeStaff, Anime

url = GraphqlClient(endpoint='https://graphql.anilist.co')

class CharacterData:
    @staticmethod
    def staff_data(page):
        query = '''
            query($page: Int)  {
                Page(page:$page  , perPage: 500) {
                    pageInfo {
                    total
                    perPage
                    } 
                    staff{
                        id,
                        name {
                        full
                        }, 
                        languageV2,
                        characters {
                        nodes {
                            id
                        }
                        }
                        
                        
                    }
                }
                }

        '''
        variables = {
            'page': page,
        }
        data = url.execute(query=query, variables=variables)
        return data['data']['Page']

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
    def insert_staff_data():
        page = 1
        staff = CharacterData.staff_data(page)
        while page < 1900:
            for s in staff['staff']:
                for ch in s['characters']['nodes']:
                    character = Character.find_by_id(ch['id'])
                    if character:
                        ani_ch = AnimeStaff.get_by_character_id(ch['id'])
                       
                        if ani_ch and ch['id'] > 246571:
                            print(s['name']['full'])
                            print(s['languageV2'])
                            print(ch['id'])
                            ani_staff = AnimeStaff(s['name']['full'],s['languageV2'], ch['id'] )
                            ani_staff.insert()
                
            page += 1
            staff = CharacterData.staff_data(page)

    @staticmethod
    def insert_anime_character():
        page = 2239
        character = CharacterData.character_data(page)
        while page < 2300:
            for ch in character['characters']:
                for ani in ch['media']['nodes']:
                    charact = Character.find_by_id(ch['id'] )
                    anime = Anime.find_by_id(ani['id'])
                    ani_Ch = AnimeCharacter.get_by_anime_id(ani['id'])
                    if anime and ch['id'] > 246597:
                        ch_insert = AnimeCharacter(ani['id'], ch['id'])                                      
                        ch_insert.insert()

            page += 1
            character = CharacterData.character_data(page)

    @staticmethod
    def insert_into_ch_database():
        page = 2249
        character = CharacterData.character_data(page)
        while page < 2300:
            
            for ch in character['characters']:
                #charact = Character.find_by_id(ch['id'] )
                #if not charact:
                print(ch['id'])
                print(ch['name']['full'])
                ch_insert = Character(ch['id'],
                                ch['name']['full'],
                                ch['image']['large'],
                                ch['gender'],
                                ch['description'],
                                ch['name']['native'],
                                )
                ch_insert.insert()
        

            page += 1
            character = CharacterData.character_data(page)