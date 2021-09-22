from data import AnimeQuery
from sklearn.neighbors import NearestNeighbors

class AnimeReviewRec:
    anime_query = AnimeQuery.get_anime_by_user_reviews()
    anime_pivot_orig = anime_query.pivot_table(values='score', index='user_id', columns = 'id')
    anime_pivot = anime_pivot_orig.fillna(0)

    @classmethod
    def get_similar_anime(cls, anime_id):
        anime_dic = {}
        n = 4
        cosine_knn = NearestNeighbors(n_neighbors=n, algorithm='brute', metric='cosine')
        review_cosine_nn_fit = cosine_knn.fit(cls.anime_pivot.T.values)
        review_distances, review_indices = review_cosine_nn_fit.kneighbors(cls.anime_pivot.T.values)
        for i in range(len(cls.anime_pivot.T.index)):
            review_idx = review_indices[i]
            col_names = cls.anime_pivot.T.index[review_idx].tolist()
            anime_dic[cls.anime_pivot.T.index[i]] = col_names
        return anime_dic[anime_id]
    
