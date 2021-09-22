import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './account_management/Login'
import SignUp from './account_management/SignUp'
import AnimeBrowse from './AnimeBrowse'
import AnimeProfile from './anime/AnimeProfile'
import UserProfile from './users/UserProfile'
import Welcome from './Welcome'

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
      <Route exact path='/anime-browse'>
        <AnimeBrowse />
      </Route>
      <Route path='/anime-profile/:anime_id' children={<AnimeProfile />} />
      <Route path='/user-profile' children={<UserProfile />}>
      </Route>
    </Switch>
  )
}

export default Dashboard
