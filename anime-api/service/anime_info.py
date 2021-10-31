from model import Anime, AnimeEpisodes, Tag, Review,Character,AnimeStudio,AnimeGenre
from api import AnimeInfoUtil

class AnimeInfo:
    @staticmethod
    def anime_profile(anime_id):
        anime_result = {}
        anime_data = Anime.find_by_id(anime_id)
        if not anime_data:
            raise AnimeNotFoundError
        anime_result['anime_id'] = anime_data[0]
        anime_result['name'] = anime_data[1]
        anime_result['jap_name'] = anime_data[2]
        anime_result['season'] = anime_data[3]
        anime_result['episodes'] = anime_data[4]
        anime_result['status'] = anime_data[5]
        anime_result['format'] = anime_data[6]
        anime_result['start_date'] = anime_data[7]
        anime_result['end_date'] = anime_data[8]
        anime_result['average_score'] = anime_data[9]
        anime_result['cover_image'] = anime_data[10]
        anime_result['banner_image'] = anime_data[11]
        anime_result['summary'] = anime_data[12]
        anime_result['eng_title'] = anime_data[13]

        anime_result['genre'] = AnimeInfo.anime_genre(anime_id)
        anime_result['studio'] = AnimeInfo.anime_studios(anime_id)
        anime_result['character'] = AnimeInfo.anime_characters(anime_id)[:8]
        return anime_result
    
    @staticmethod
    def anime_studios(anime_id):
        studios = []
        ani_studio = AnimeStudio.get_by_anime_id(anime_id)
        for studio in ani_studio:
            studios.append(studio[2])
        return studios
    
    @staticmethod
    def anime_genre(anime_id):
        genres = []
        ani_genre = AnimeGenre.get_by_anime_id(anime_id)
        for gen in ani_genre:
            genres.append(gen[1])
        return genres


    @staticmethod
    def anime_episodes(anime_id):
        episodes = []
        ani_epi = AnimeEpisodes.get_by_anime_id(anime_id)
        for episode in ani_epi:
            anime_ep_result = {}
            anime_ep_result['name'] = episode[1]
            anime_ep_result['site'] = episode[2]
            anime_ep_result['url'] = episode[3]
            episodes.append(anime_ep_result)
        return episodes

    @staticmethod
    def anime_tags(anime_id):
        tags = []
        ani_tag = Tag.get_by_anime_id(anime_id)
        for tag in ani_tag:
            tags_dic = {}
            tags_dic['name'] = tag[1]
            tags_dic['description'] = tag[2]
            tags_dic['category'] = tag[3]
            tags.append(tags_dic)
        return tags



    @staticmethod
    def anime_reviews(anime_id):
        reviews = []
        ani_review = Review.find_by_animeid_or_userid(anime_id)  
        for review in ani_review:
            review_dic = {}
            review_dic['description'] = review[1]
            review_dic['sumary'] = review[2]
            review_dic['score'] = review[3]
            reviews.append(review_dic)
        return reviews
    
    @staticmethod
    def anime_characters(anime_id):
        characters = []
        ani_chars = Character.get_by_anime_id(anime_id)
        for character in ani_chars:
            ch_dic = {}
            ch_dic['id'] = character[0]
            ch_dic['name'] = character[1]
            ch_dic['image'] = character[2]
  
            characters.append(ch_dic)
        return characters
    
    @staticmethod
    def character_profile(character_id):
        char = {}
        char_data = Character.find_by_id(character_id)
        if not char_data:
            raise CharacterNotFoundError 
        char['id'] = char_data[0]
        char['name'] = char_data[1]
        char['image'] = char_data[2]
        char['gender'] = char_data[3]
        char['description'] = char_data[4].replace('__', "").replace('!~', '').replace('~!', '\n') if char_data[4] else "" 
        char['jap_name'] = char_data[5]
        return char
        
    @staticmethod
    def similar_anime_by_user_review(anime_id):
        anime_data = []
        animes_by_anime = Anime.get_similar_anime_by_reviews(anime_id)
        for ani in animes_by_anime:
            ani_dic = {}
            ani_dic['id'] = ani[0]
            ani_dic['title'] = ani[1]
            ani_dic['image'] = ani[2]
            ani_dic['eng_title'] = ani[3]
            anime_data.append(ani_dic)
        return anime_data
    
    @staticmethod
    def similar_anime_by_user_activities(anime_id):
        anime_data = []
        animes_by_anime = Anime.get_similar_anime_by_user_activity(anime_id)
        for ani in animes_by_anime:
            ani_dic = {}
            ani_dic['id'] = ani[0]
            ani_dic['title'] = ani[1]
            ani_dic['image'] = ani[2]
            ani_dic['eng_title'] = ani[3]
            anime_data.append(ani_dic)
        return anime_data
    

    @staticmethod
    def anime_recommedation_based_on_anime(anime_id):
        rec_data = []
        anime_data = Anime.find_by_id(anime_id)
        anime_rec = AnimeInfoUtil.recommendation_data(anime_data[0])
        for rec in anime_rec:
           rec_dic = {}
           rec_dic['id'] = rec['mediaRecommendation']['id']
           rec_dic['title'] = rec['mediaRecommendation']['title']['userPreferred']
           rec_dic['image'] = rec['mediaRecommendation']['coverImage']['large']
           rec_dic['eng_title'] = rec['mediaRecommendation']['title']['english']

           rec_data.append(rec_dic)
        
        return rec_data
    
    @staticmethod
    def quick_search(anime_name):
        anime_lists = []
        anime_data = Anime.get_anime_by_name(anime_name)
        for anime in anime_data:
            anime_dic = {}
            anime_dic['id'] = anime[0]
            anime_dic['title'] = anime[1]
            anime_dic['image'] = anime[2]
            anime_dic['eng_title'] = anime[3]

            anime_lists.append(anime_dic)
        
        return anime_lists
    
    @staticmethod
    def category_link(name):
        anime_lists = []
        anime_data = Anime.get_anime_by_category(name)
        for anime in anime_data:
            anime_dic = {}
            anime_dic['id'] = anime[0]
            anime_dic['title'] = anime[1]
            anime_dic['image'] = anime[2]
            anime_dic['eng_title'] = anime[3]
            anime_lists.append(anime_dic)
        
        return anime_lists
    
    @staticmethod
    def studio_link(name):
        anime_lists = []
        anime_data = Anime.get_anime_by_studio(name)
        for anime in anime_data:
            anime_dic = {}
            anime_dic['id'] = anime[0]
            anime_dic['title'] = anime[1]
            anime_dic['image'] = anime[2]
            anime_dic['eng_title'] = anime[3]
            anime_lists.append(anime_dic)
        
        return anime_lists
    
    @staticmethod
    def advanced_search(name, genre, tag, year, season, format, status, start_date, end_date):
        anime_lists = []
        anime_data = Anime.detailed_anime(name, genre, tag, year, season, format, status, start_date, end_date)
        for anime in anime_data:
            anime_dic = {}
            anime_dic['id'] = anime[0]
            anime_dic['title'] = anime[1]
            anime_dic['image'] = anime[2]
            anime_dic['eng_title'] = anime[3]
            anime_lists.append(anime_dic)
        return anime_lists
    
    @staticmethod
    def dropdown_data():
        dropdown_lists = {}
        formats = [i[0] for i in Anime.get_anime_format()]
        status = [i[0]  for i in Anime.get_anime_status()]
        studios = [i[0]  for i in AnimeStudio.get_all_studios()]
        genres = [i[0]  for i in AnimeGenre.get_all_genres()]
        tags = [i[0]  for i in Tag.select_tag_name()]

        dropdown_lists['format'] = formats
        dropdown_lists['status'] = status
        dropdown_lists['studio'] = studios
        dropdown_lists['genre'] = genres
        dropdown_lists['tag'] = tags
       
        return dropdown_lists
        
           

class AnimeNotFoundError(Exception):
    pass

class CharacterNotFoundError(Exception):
    pass

class CategoryNotFoundError(Exception):
    pass

class StudioNotFoundError(Exception):
    pass

