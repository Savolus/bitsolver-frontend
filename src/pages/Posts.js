import { useEffect, useState } from "react"
import axios from "axios"

import SmallHeader from '../components/general/small-header/SmallHeader'
import Paginator from "../components/general/pagination/Paginator"
import Loader from "../components/general/loader/Loader"
import Post from '../components/posts/Post'
import './scss/posts.scss'

export default () => {
  const [ isLoading, setIsLoading ] = useState(true)
  const [ page, setPage ] = useState(1)
  const [ posts, setPosts ] = useState([])

  useEffect(async () => {
    setIsLoading(true)

    const { data } = await axios.get(`https://bitsolver.herokuapp.com/api/posts?page=${page}&size=4`)
    
    const posts = await Promise.all(
      data.map(async post => {
        const categories = await Promise.all(
          post.categories.map(
            category => axios.get(`https://bitsolver.herokuapp.com/api/categories/${category}`)
          )
        )
        
        return {
          ...post,
          categories: categories.map(({ data }) => data)
        }
      })
    )

    setPosts(posts)
    setIsLoading(false)
  }, [ page ])

  return (
    <>
      <SmallHeader text='All posts' />
      <div className='site-data'>
        {
          isLoading ?
            <Loader /> :
            <div className='posts'>
              {
                posts.map(({ _id, title, content, user, rating, categories }) => {
                  return <Post
                    key={_id}
                    id={_id}
                    title={title}
                    content={content}
                    rating={rating}
                    user={user}
                    tags={categories}
                  />
                })
              }
            </div>
        }
      </div>
      <Paginator
        page={page}
        setPage={setPage}
      />
    </>
  )
}
