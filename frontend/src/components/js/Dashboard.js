import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './account_management/Login'
import SignUp from './account_management/SignUp'
import AnimeProfile from './anime/AnimeProfile'
import UserProfile from './users/UserProfile'
import Welcome from './Welcome'
import PopularTrendingAnime from './PopularTrendingAnime'

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
        <PopularTrendingAnime />
      </Route>
    </Switch>
  )
}

export default Dashboard
