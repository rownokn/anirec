import React, {useState, useContext} from 'react'
import AddReview from '../AddReview'
import { AccountContext } from '../account_management/AccountProvider'

const NewAnimeReview = ({anime_id}) => {
  const {account} = useContext(AccountContext)
  return (
    <div className='anime-summary'>
      <AddReview account={account} anime_id={anime_id} />
    </div>
  )
}
export default NewAnimeReview