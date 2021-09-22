from api import AnimeInfoUtil
from model import Anime
import json

class AnimeBrowseInfo:
    @staticmethod
    def popular_anime():
        pop_data = []
        anime_pop = AnimeInfoUtil.most_popular_anime()
        for pop in anime_pop:
            pop_dic = {}
            pop_dic['id'] = pop['id']
            pop_dic['title'] = pop['title']['userPreferred']
            pop_dic['image'] = pop['coverImage']['large']
            pop_dic['score'] = pop['averageScore']
            pop_dic['popularity'] = pop['popularity']
            pop_dic['favourites'] = pop['favourites']
            pop_data.append(pop_dic)
        
        return pop_data
    
    @staticmethod
    def trending_anime():
        trend_data = []
        anime_trend = AnimeInfoUtil.anime_trends_data()
        for trend in anime_trend:
            trend_dic = {}
            trend_dic['id'] = trend['id']
            trend_dic['title'] = trend['title']['userPreferred']
            trend_dic['image'] = trend['coverImage']['large']
            trend_dic['score'] = trend['averageScore']
            trend_dic['trending'] = trend['trending']
            trend_dic['favourites'] = trend['favourites']
            trend_data.append(trend_dic)
        
        return trend_data

    @staticmethod
    def similar_anime_reccomendations_by_user(user_id):
        anime_data = []
        anime_activites_by_user = Anime.get_similar_anime_by_similar_users(user_id)
        for ani in anime_activites_by_user:
            ani_dic = {}
            ani_dic['name'] = ani[0]
            ani_dic['image'] = ani[1]
            anime_data.append(ani_dic)
        return anime_data
       

