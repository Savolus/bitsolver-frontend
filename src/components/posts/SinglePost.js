import { Link, useHistory, useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import axios from 'axios'

import SmallButtons from '../general/small-buttons/SmallButtons'
import Loader from '../general/loader/Loader'
import Comments from '../comments/Comments'
import SmallTag from '../tags/SmallTag'

export default () => {
  const { id } = useParams()
  const history = useHistory()

  const [ isLoading, setIsLoading ] = useState(true)
  const [ currentRating, setCurrentRating ] = useState(0)
  const [ post, setPost ] = useState(null)
  const [ like, setLike ] = useState(null)
  const [ self, setSelf ] = useState(null)

	useEffect(async () => {
    setIsLoading(true)

    const { data: post } = await axios.get(`https://bitsolver.herokuapp.com/api/posts/${id}`)

    const tags = await Promise.all(
      post.categories.map(category => axios.get(`https://bitsolver.herokuapp.com/api/categories/${category}`))
    )

    const { data: user } = await axios.get(`https://bitsolver.herokuapp.com/api/users/${post.user}`) 

    post.user = user
    post.tags = tags.map(({ data }) => data)

    delete post.categories

    setPost(post)
    setCurrentRating(post.rating)

    const access_token = Cookies.get('access_token')

    if (access_token) {
      const decoded = jwtDecode(access_token)

      if (decoded.sub === post.user._id) {
        setSelf(decoded)
      }

      const { data } = await axios.get(`https://bitsolver.herokuapp.com/api/posts/${id}/likes/${decoded.sub}`)

      data && setLike({ type: data.type })
    }

    setIsLoading(false)
	}, [])

  const likePost = async (likeData) => {
    try {
      await axios.post(`https://bitsolver.herokuapp.com/api/posts/${id}/likes`, likeData)

      if (!like) {
        setCurrentRating(rating => rating += likeData.type === 'like' ? 1 : -1)

        toast.success(`Post successfuly ${likeData.type}d`)

        return setLike(likeData)
      }

      toast.success(`Post successfuly un${likeData.type}d`)

      if (likeData.type === like.type) {
        setCurrentRating(rating => rating += likeData.type === 'like' ? -1 : 1)
        setLike(null)
      } else {
        setCurrentRating(rating => rating += likeData.type === 'like' ? 2 : -2)
        setLike(likeData)

        toast.success(`Post successfuly ${likeData.type}d`)
      }
    } catch (e) {
      toast.error(e.response.data.message)
    }
  }

  const onDelete = async () => {
    try {
      await axios.delete(`https://bitsolver.herokuapp.com/api/posts/${id}`)

      history.push('/posts')
    } catch(e) {
      toast.error(e.response.data.message)
    }
  }
  
  return (
    <div className='site-data single'>
      <div className='post-comments'>
        {
          isLoading ?
            <Loader /> :
            <>
              <div className='post-card single'>
                {
                  self &&
                    <SmallButtons
                      isEdit
                      isDelete
                      prefix={`/posts/${id}`}
                      onDelete={onDelete}
                    />
                }
                <div className='post-card-general'>
                  <div className='post-card-user-profile-picture'>
                    <Link to={`/users/${post.user._id}`} className='fit-avatar'>
                      <img src={ post.user.avatar } className='post-card-user-avatar' />
                    </Link>
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
                    { post.title }
                  </span>
                  <p className='post-card-content'>
                    { post.content }
                  </p>
                  <div className='post-card-tags'>
                    {
                      post.tags.map(({ _id, title }) =>
                        <SmallTag
                          key={_id}
                          id={_id}
                          title={title}
                        />
                      )
                    }
                  </div>
                </div>
              </div>
              <Comments
                postId={id}
                toast={toast}
              />
            </>
        }
      </div>
      <Toaster
        position="bottom-center"
      />
    </div>
  )
}
