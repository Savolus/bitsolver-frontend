import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import defaultProfilePicture from '../../images/avatar.png'
import SmallTag from '../tags/SmallTag'

export default ({ id, title, content, user, rating, tags }) => {
  const [ profilePicture, setProfilePicture ] = useState(defaultProfilePicture)
  const [ currentRating, setCurrentRating ] = useState(rating)
  const [ like, setLike ] = useState(null)

	useEffect(async () => {
    try {
      const { data } = await axios.get(`https://bitsolver.herokuapp.com/api/posts/${id}/likes/${user}`)

      data && setLike({ type: data.type })
    } catch {}
	}, [])

  const likePost = async (likeData) => {
    try {
      await axios.post(`https://bitsolver.herokuapp.com/api/posts/${id}/likes`, likeData)

      if (!like) {
        setCurrentRating(rating => rating += likeData.type === 'like' ? 1 : -1)

        return setLike(likeData)
      }

      if (likeData.type === like.type) {
        setCurrentRating(rating => rating += likeData.type === 'like' ? -1 : 1)
        setLike(null)
      } else {
        setCurrentRating(rating => rating += likeData.type === 'like' ? 2 : -2)
        setLike(likeData)
      }
    } catch (e) {
      console.error(e)
    }
  }
  
  return (
      <div data-id={id} className='post-card'>
        <div className='post-card-general'>
          <div className='post-card-user-profile-picture'>
            <img src={profilePicture} className='post-card-user-avatar' />
          </div>
          <div className='post-card-rating-container'>
            <span className='post-card-action' onClick={() => likePost({ type: 'like' })}>
              {
                !like ?
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill='rgba(179, 184, 190, 0.808)' fillRule="evenodd" clipRule="evenodd"><path d="M23.245 20l-11.245-14.374-11.219 14.374-.781-.619 12-15.381 12 15.391-.755.609z"/></svg> :
                  like.type === 'like' ?
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill='rgb(20, 88, 206)' fillRule="evenodd" clipRule="evenodd"><path d="M23.245 20l-11.245-14.374-11.219 14.374-.781-.619 12-15.381 12 15.391-.755.609z"/></svg> :
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill='rgba(179, 184, 190, 0.808)' fillRule="evenodd" clipRule="evenodd"><path d="M23.245 20l-11.245-14.374-11.219 14.374-.781-.619 12-15.381 12 15.391-.755.609z"/></svg>
              }
            </span>
            <code className='post-card-rating'>
              { currentRating }
            </code>
            <span className='post-card-action' onClick={() => likePost({ type: 'dislike' })}>
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
        <div className='post-card-info'>
          <span className='post-card-title'>
            <Link to={`/posts/${id}`}>
              { title }
            </Link>
          </span>
          <p className='post-card-content-preview'>
            { content }
          </p>
          <div className='post-card-tags'>
            {
              tags.map(({ _id, title }) => {
                return <SmallTag
                  key={_id}
                  id={_id}
                  title={title}
                />
              })
            }
          </div>
        </div>
      </div>
  )
}
