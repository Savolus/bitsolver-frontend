import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loader from "../general/loader/Loader"
import Post from "../posts/Post"

export default () => {
  const { id } = useParams()
  const [ isLoading, setIsLoading ] = useState(true)
  const [ tag, setTag ] = useState(null)

  useEffect(async () => {
    setIsLoading(true)

    let { data } = await axios.get(`https://bitsolver.herokuapp.com/api/categories/${id}`)

    data.posts = await Promise.all(
      data.posts.map(post => axios.get(`https://bitsolver.herokuapp.com/api/posts/${post}`))
    )

    data.posts = data.posts.map(({ data }) => data)

    setTag(data)

    setIsLoading(false)
  }, [])

  return (
    <div className='site-data single'>
      {
        isLoading ?
          <Loader /> :
          <div className='tab-container single'>
            <div data-id={id} className='tag-card'>
              <span className='tag-card-title'>
                { tag.title }
              </span>
              <p className='tag-card-description'>
                { tag.description }
              </p>
            </div>
            <div className='tag-posts'>
              {
                tag.posts.map(({ _id, title, content, user, rating }) => {
                  return <Post
                    key={_id}
                    id={_id}
                    title={title}
                    content={content}
                    rating={rating}
                    user={user}
                    tags={[]}
                  />
                })
              }
            </div>
          </div>
      }
    </div>
  )
}
