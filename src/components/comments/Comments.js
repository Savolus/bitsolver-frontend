import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../general/loader/Loader"
import SmallHeader from "../general/small-header/SmallHeader"
import Comment from "./Comment"

export default ({ postId }) => {
  const [ isLoading, setIsLoading ] = useState(true)
  const [ comments, setComments] = useState([])
  
  useEffect(async () => {
    setIsLoading(true)

    const { data: comments } = await axios.get(`https://bitsolver.herokuapp.com/api/posts/${postId}/comments`)
  
    setComments(comments)
    setIsLoading(false)
  }, [])

  return (
    <>
      <SmallHeader data='comments' postId={postId} single='single' />
      <div className='site-data single'>
        {
          isLoading ?
            <Loader /> :
            <div className='comments'>
              {
                comments.map(({ _id, content, user, rating }) => {
                  return <Comment
                    key={_id}
                    id={_id}
                    content={content}
                    user={user}
                    rating={rating}
                  />
                })
              }
            </div>
        }
      </div>
    </>
  )
}