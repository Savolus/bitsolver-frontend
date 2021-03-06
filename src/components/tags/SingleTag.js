import { useEffect, useState } from "react"
import axios from "axios"

import Paginator from "../general/pagination/Paginator"
import Loader from "../general/loader/Loader"
import { useParams } from "react-router-dom"
import Post from "../posts/Post"

export default () => {
  const { id } = useParams()

  const [ isLoading, setIsLoading ] = useState(true)
  const [ pageCount, setPageCount ] = useState(1)
  const [ page, setPage ] = useState(1)
  const [ tag, setTag ] = useState(null)
  const [ posts, setPosts ] = useState([])

  useEffect(async () => {
    setIsLoading(true)

    const { data: tag } = await axios.get(`https://bitsolver.herokuapp.com/api/categories/${id}`)
    const { data: posts } = await axios.get(`https://bitsolver.herokuapp.com/api/categories/${id}/posts?page=${page}&size=4`)
    const { data: pageCount } = await axios.get(`https://bitsolver.herokuapp.com/api/categories/${id}/posts/pages?size=4`)

    const categoeriesArrayRaw = await Promise.all(
      posts.map(post => axios.get(`https://bitsolver.herokuapp.com/api/posts/${post._id}/categories`))
    )

    const categoriesArray =  categoeriesArrayRaw.map(({ data }) => data)
    
    const usersRaw = await Promise.all(
      posts.map(post => axios.get(`https://bitsolver.herokuapp.com/api/users/${post.user}`))
    )

    const users = usersRaw.map(({ data }) => data)

    setTag(tag)
    setPosts(posts.map((post, index) => {
      post.user = users[index]
      post.categories = categoriesArray[index]

      return post
    }))
    setPageCount(pageCount.pages)
    setIsLoading(false)
  }, [ page ])

  return (
    <>
      <div className='site-data single'>
        {
          isLoading ?
            <Loader /> :
            <div className='tag-container single'>
              <div className='tag-card'>
                <span className='tag-card-title'>
                  { tag.title }
                </span>
                <p className='tag-card-description'>
                  { tag.description }
                </p>
              </div>
              <div className='tag-posts'>
                {
                  posts.map(({ _id, title, content, user, rating, categories }) =>
                    <Post
                      key={_id}
                      id={_id}
                      title={title}
                      content={content}
                      rating={rating}
                      user={user}
                      tags={categories}
                    />
                  )
                }
              </div>
            </div>
        }
      </div>
      <Paginator
        page={page}
        setPage={setPage}
        pageCount={pageCount}
      />
    </>
  )
}
