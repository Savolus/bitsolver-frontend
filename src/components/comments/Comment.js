import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import axios from 'axios'

import SmallButtons from '../general/small-buttons/SmallButtons'

export default ({ id, postId, content, user, rating, toast }) => {
  const history = useHistory()

  const [ currentRating, setCurrentRating ] = useState(rating)
  const [ like, setLike ] = useState(null)
  const [ self, setSelf ] = useState(null)

	useEffect(async () => {
    const access_token = Cookies.get('access_token')

    if (access_token) {
      const decoded = jwtDecode(access_token)

      if (decoded.sub === user._id) {
        setSelf(decoded)
      }

      const { data } = await axios.get(`https://bitsolver.herokuapp.com/api/comments/${id}/likes/${decoded.sub}`)
  
      data && setLike({ type: data.type })
    }
	}, [])

  const likePost = async (likeData) => {
    try {
      await axios.post(`https://bitsolver.herokuapp.com/api/comments/${id}/likes`, likeData)

      if (!like) {
        setCurrentRating(rating => rating += likeData.type === 'like' ? 1 : -1)

        toast.success(`Comment successfuly ${likeData.type}d`)

        return setLike(likeData)
      }

      toast.success(`Comment successfuly un${likeData.type}d`)

      if (likeData.type === like.type) {
        setCurrentRating(rating => rating += likeData.type === 'like' ? -1 : 1)
        setLike(null)
      } else {
        setCurrentRating(rating => rating += likeData.type === 'like' ? 2 : -2)
        setLike(likeData)

        toast.success(`Comment successfuly ${likeData.type}d`)
      }
    } catch (e) {
      toast.error(e.response.data.message)
    }
  }
  
  const onDelete = async () => {
    try {
      await axios.delete(`https://bitsolver.herokuapp.com/api/comments/${id}`)

      history.push(`/posts/${postId}`)
    } catch(e) {
      toast.error(e.response.data.message)
    }
  }

  return (
    <div className='comment-card'>
      {
        self &&
          <SmallButtons
            isEdit
            isDelete
            prefix={`/posts/${postId}/comments/${id}`}
            onDelete={onDelete}
          />
      }
      <div className='comment-card-general'>
        <div className='comment-card-user-profile-picture'>
          <Link to={`/users/${user._id}`} className='fit-avatar'>
            <img src={ user.avatar } className='comment-card-user-avatar' />
          </Link>
        </div>
        <div className='comment-card-rating-container'>
          <span className='comment-card-action' onClick={() => likePost({ type: 'like' })}>
            {
              !like ?
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill='rgba(179, 184, 190, 0.808)' fillRule="evenodd" clipRule="evenodd"><path d="M23.245 20l-11.245-14.374-11.219 14.374-.781-.619 12-15.381 12 15.391-.755.609z"/></svg> :
              like.type === 'like' ?
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill='rgb(20, 88, 206)' fillRule="evenodd" clipRule="evenodd"><path d="M23.245 20l-11.245-14.374-11.219 14.374-.781-.619 12-15.381 12 15.391-.755.609z"/></svg> :
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill='rgba(179, 184, 190, 0.808)' fillRule="evenodd" clipRule="evenodd"><path d="M23.245 20l-11.245-14.374-11.219 14.374-.781-.619 12-15.381 12 15.391-.755.609z"/></svg>
            }
          </span>
          <code className='comment-card-rating'>
            { currentRating }
          </code>
          <span className='comment-card-action' onClick={() => likePost({ type: 'dislike' })}>
            {
              !like ?
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill='rgba(179, 184, 190, 0.808)' fillRule="evenodd" clipRule="evenodd"><path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z"/></svg> :
                like.type === 'dislike' ?
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill='rgb(20, 88, 206)' fillRule="evenodd" clipRule="evenodd"><path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z"/></svg> :
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill='rgba(179, 184, 190, 0.808)' fillRule="evenodd" clipRule="evenodd"><path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z"/></svg>
            }
          </span>
        </div>
      </div>
      <div className='comment-card-info'>
        <p className='comment-card-content'>
          { content }
        </p>
      </div>
    </div>
  )
}
