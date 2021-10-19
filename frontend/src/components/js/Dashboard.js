import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './account_management/Login'
import SignUp from './account_management/SignUp'
import AnimeProfile from './anime/AnimeProfile'
import UserProfile from './users/UserProfile'
import Welcome from './Welcome'
import PopularTrendingDisplay from './populartending/PopularTrendingDisplay'
import UserRecommended from './users/UserRecommended'
import PopularAnime from './populartending/PopularAnime'
import TrendingAnime from './populartending/TrendingAnime'
import AnimeListCategories from './anime/AnimeListCategories'
import AnimeListStudio from './anime/AnimeListStudio'
import AdvancedSearch from './AdvancedSearch'

const Dashboard = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Welcome />
      </Route>
      <Route exact path='/login'>
        <Login />
      </Route>
      <Route exact path='/signup'>
        <SignUp />
      </Route>
      <Route path='/anime-profile/:anime_id' children={<AnimeProfile />}/>
      <Route path='/user-profile' children={<UserProfile />}/>
      <Route exact path='/popular-trending'>
        <PopularTrendingDisplay />
      </Route>
      <Route exact path='/more-popular-anime'>
        <PopularAnime />
      </Route>
      <Route exact path='/more-trending-anime'>
        <TrendingAnime />
      </Route>
      <Route exact path='/anime-user-rec'>
        <UserRecommended />
      </Route>
      <Route exact path='/anime-categories/:category_name'>
        <AnimeListCategories />
      </Route>
      <Route exact path='/anime-studio/:studio_name'>
        <AnimeListStudio />
      </Route>
      <Route exact path='/advanced-search'>
        <AdvancedSearch />
      </Route>
    </Switch>
  )
}

export default Dashboard
