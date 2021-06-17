import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loader from "../general/loader/Loader"
import Post from "../posts/Post"

export default () => {
  const { id } = useParams()
  const [ pageCount, setPageCount ] = useState(1)
  const [ page, setPage ] = useState(1)
  const [ tag, setTag ] = useState(null)
  const [ posts, setPosts ] = useState([])

  useEffect(async () => {
    setIsLoading(true)

    const { data: tag } = await axios.get(`https://bitsolver.herokuapp.com/api/categories/${id}`)
    const { data: posts } = await axios.get(`https://bitsolver.herokuapp.com/api/categories/${id}/posts?page=${page}&size=4`)
    const { data: pageCount } = await axios.get(`https://bitsolver.herokuapp.com/api/categories/${id}/posts/pages?size=4`)

    setTag(tag)
    setPosts(posts)
    setPageCount(pageCount.pages)
    setIsLoading(false)
  }, [ page ])

  return (
    <>
      <SmallHeader text={`Tag ${tag.title}`} />
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
                  posts.map(({ _id, title, content, user, rating }) => {
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
      <Paginator
        page={page}
        setPage={setPage}
        pageCount={pageCount}
      />
    </>
  )
}
