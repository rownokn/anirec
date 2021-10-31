import React, {useState, useContext, useEffect} from 'react'
import AddReview from '../AddReview'
import { AccountContext } from '../account_management/AccountProvider'
import { ToastContainer } from "react-toastify";


const AddUserReview = () => {
  const {account} = useContext(AccountContext)
  const [animeList, setAnimeList] = useState([])
  const [animeId, setAnimeId] = useState('')


  const animeIdHandler = e => {
    setAnimeId(e.target.value)
  } 

  const user = async () => {
      const response = await fetch(`http://localhost:8000/user/user_favorite`, {
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
      setAnimeList(info.users)
  }

  useEffect(() => {
    user()
  }, [])

  return (
    <div style={{'backgroundColor': '#FFF4FB','color': '#8C325B','padding':'40px','border': '#8C325B solid'}}>
      <AddReview animeHandler={animeIdHandler} animeList={animeList} account={account} anime_id={animeId} />
      <ToastContainer />
    </div>
  )
}
export default AddUserReview