import { useEffect, useState } from "react"
import axios from "axios"

import SmallHeader from '../components/general/small-header/SmallHeader'
import Paginator from "../components/general/pagination/Paginator"
import Loader from "../components/general/loader/Loader"
import Post from '../components/posts/Post'
import './scss/posts.scss'

export default () => {
  const [ isLoading, setIsLoading ] = useState(true)
  const [ pageCount, setPageCount ] = useState(1)
  const [ page, setPage ] = useState(1)
  const [ posts, setPosts ] = useState([])

  useEffect(async () => {
    setIsLoading(true)

    const { data: posts } = await axios.get(`https://bitsolver.herokuapp.com/api/posts?page=${page}`)
    const { data: pageCount } = await axios.get(`https://bitsolver.herokuapp.com/api/posts/pages`)

    const categoriesArrayRaw = await Promise.all(
      posts.map(post => axios.get(`https://bitsolver.herokuapp.com/api/posts/${post._id}/categories`))
    )

    const categoriesArray =  categoriesArrayRaw.map(({ data }) => data)

    setPosts(posts.map((post, index) => {
      return {
        ...post,
        categories: categoriesArray[index]
      }
    }))
    setPageCount(pageCount.pages)
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
        pageCount={pageCount}
      />
    </>
  )
}
