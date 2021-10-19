from data import AnimeQuery
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.metrics.pairwise import cosine_similarity
import operator


class AnimeActivityRec:
    anime_query = AnimeQuery.get_anime_by_user_activity()
    anime_pivot_orig = anime_query.pivot_table(values='score', index='user_id', columns = 'id')
    anime_pivot = anime_pivot_orig.fillna(0)
    
    def __init__(self, user_id):
        self.user_id = user_id
        

    def similar_users(self, k=30):
        user = self.anime_pivot[self.anime_pivot.index == self.user_id]
        other_users = self.anime_pivot[self.anime_pivot.index != self.user_id]
        similarities = cosine_similarity(user,other_users)[0].tolist()
        indices = other_users.index.tolist()
        index_similarity = dict(zip(indices, similarities))
        index_similarity_sorted = sorted(index_similarity.items(), key=operator.itemgetter(1))
        index_similarity_sorted.reverse()
        top_users_similarities = index_similarity_sorted[:k]
        users = [u[0] for u in top_users_similarities]
        return users
    
   
    def recommend_item(self, similar_user_indices, items=30):
        similar_users = self.anime_pivot[self.anime_pivot.index.isin(similar_user_indices)]
        similar_users = similar_users.mean(axis=0)
        similar_users_df = pd.DataFrame(similar_users, columns=['average_score'])
        user_df = self.anime_pivot[self.anime_pivot.index == self.user_id]
        user_df_transposed = user_df.transpose()
        user_df_transposed.columns = ['rating']
        user_df_transposed = user_df_transposed[user_df_transposed['rating']==0]        
        similar_users_df_ordered = similar_users_df.sort_values(by=['average_score'], ascending=False)
        top_n_anime = similar_users_df_ordered.head(items)
        anime_information = top_n_anime
        return anime_information.to_json(orient='table')
    
    @classmethod
    def get_similar_anime(cls, anime_id):
        n = 4
        cosine_knn = NearestNeighbors(n_neighbors=n, algorithm='brute', metric='cosine')
        anime_cosine_nn_fit = cosine_knn.fit(cls.anime_pivot.T.values)
        anime_distances, anime_indices = anime_cosine_nn_fit.kneighbors(cls.anime_pivot.T.values)
        anime_dic = {}
        for i in range(len(cls.anime_pivot.T.index)):
            anime_idx = anime_indices[i]
            col_names = cls.anime_pivot.T.index[anime_idx].tolist()
            anime_dic[cls.anime_pivot.T.index[i]] = col_names
        return anime_dic[anime_id]








