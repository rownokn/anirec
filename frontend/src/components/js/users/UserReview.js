import React, {useState, useEffect, useContext} from 'react'
import { AccountContext } from '../account_management/AccountProvider'
import {Link} from 'react-router-dom'


const UserReview = ({user_id}) => {
  const {account} = useContext(AccountContext)
  const [userReview, setUserReview] = useState([])
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const reviews = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/user/user_review`, {
        method: "POST",
         body: JSON.stringify({
           "user_id": account.account_id
        }),
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${account.session_id}`
         }
        });
      const info = await response.json()
      console.log(info)
      setUserReview(info.users)

    }catch (err){
      setIsError(true)
    }
  }

  useEffect(() => {
    reviews()
  }, [])

  console.log(userReview)
  return (
    <div className='anime-summary user-reviews'>

      <h2>User Reviews</h2>
      <button>Add Review </button>
      {userReview.map((rev) => 
        <div className='user-review-info'>
          <div className='anime-review-title'>
          <Link to={`/anime-profile/${rev.anime_id}/anime-summary`}>
            <img src={rev.cover_image} alt='rev_image' />
           <div className='tail'><p>{rev.name}</p></div></Link>
          </div>
          <div className='reviews'>
            <div className='title'>
              <span className='score'>Score: {rev.score}% </span>
              <span className='summary'><p dangerouslySetInnerHTML={{__html: rev.sumary}} /></span>
            </div>
            <div className='body'>{rev.description}</div>
            
          </div>
        </div>
      )}

    </div>
    
  )
}

export default UserReview