import React from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'
import AnimeList from './AnimeList'
import UserReview from './UserReview'
import AnimeFavorites from './AnimeFavorites'

const UserProfileDashboard = ({user_id}) => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/anime-list`}>
        <AnimeList user_id={user_id} />
      </Route>
      <Route exact path={`${path}/user-review`}>
        <UserReview user_id={user_id}/>
      </Route>
      <Route exact path={`${path}/anime-favorites`}>
        <AnimeFavorites user_id={user_id}/>
      </Route>
    </Switch>
  )
}

export default UserProfileDashboard
