import React from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'
import AnimeEpisodes from './AnimeEpisodes'
import AnimeSummary from './AnimeSummary'
import AnimeTags from './AnimeTags'
import AnimeCharacters from './AnimeCharacters'
import AnimeReviews from './AnimeReviews'
import AnimeRecommendations from './AnimeRecommendations'

const AnimeProfileDashboard = ({animeInfo, anime_id}) => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/anime-summary`}>
        <AnimeSummary animeInfo= {animeInfo} anime_id={anime_id}/>
      </Route>
      <Route exact path={`${path}/episodes`}>
        <AnimeEpisodes anime_id={anime_id}  />
      </Route>
      <Route exact path={`${path}/anime-tags`}>
        <AnimeTags anime_id={anime_id}  />
      </Route>
      <Route exact path={`${path}/anime-characters`}>
        <AnimeCharacters anime_id={anime_id}  />
      </Route>
      <Route exact path={`${path}/anime-reviews`}>
        <AnimeReviews anime_id={anime_id}  />
      </Route>
      <Route exact path={`${path}/anime-recommedations`}>
        <AnimeRecommendations anime_id={anime_id}  />
      </Route>
    </Switch>
  )
}

export default AnimeProfileDashboard
