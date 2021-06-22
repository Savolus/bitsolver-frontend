import toast, { Toaster } from 'react-hot-toast'
import { useEffect, useState } from "react"
import axios from "axios"

import SmallHeader from '../components/general/small-header/SmallHeader'
import Paginator from "../components/general/pagination/Paginator"
import Loader from "../components/general/loader/Loader"
import SmallTag from "../components/tags/SmallTag"
import Post from '../components/posts/Post'
import './scss/posts.scss'

export default () => {
  const [ isLoading, setIsLoading ] = useState(true)
  const [ pageCount, setPageCount ] = useState(1)
  const [ page, setPage ] = useState(1)
  const [ posts, setPosts ] = useState([])
  const [ tags, setTags ] = useState([])

  useEffect(async () => {
    setIsLoading(true)

    const { data: tags } = await axios.get(`https://bitsolver.herokuapp.com/api/categories`) // make rand
    const { data: posts } = await axios.get(`https://bitsolver.herokuapp.com/api/posts?page=${page}&size=4`)
    const { data: pageCount } = await axios.get(`https://bitsolver.herokuapp.com/api/posts/pages?size=4`)

    const categoriesArrayRaw = await Promise.all(
      posts.map(post => axios.get(`https://bitsolver.herokuapp.com/api/posts/${post._id}/categories`))
    )

    const categoriesArray =  categoriesArrayRaw.map(({ data }) => data)

    const usersRaw = await Promise.all(
      posts.map(post => axios.get(`https://bitsolver.herokuapp.com/api/users/${post.user}`))
    )

    const users = usersRaw.map(({ data }) => data)

    setTags(tags)
    setPosts(posts.map((post, index) => {
      return {
        ...post,
        user: users[index],
        categories: categoriesArray[index]
      }
    }))
    setPageCount(pageCount.pages)
    setIsLoading(false)
  }, [ page ])

  return (
    <>
      <SmallHeader data='posts' />
      <div className='site-data'>
        {
          isLoading ?
            <Loader /> :
            <>
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
                      toast={toast}
                    />
                  })
                }
              </div>
              <div className='side-tags'>
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
            </>
        }
      </div>
      <Paginator
        page={page}
        setPage={setPage}
        pageCount={pageCount}
      />
      <Toaster
        position="bottom-center"
      />
    </>
  )
}
