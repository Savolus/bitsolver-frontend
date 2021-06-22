import { useHistory, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

import SmallHeader from '../general/small-header/SmallHeader'
import Loader from "../general/loader/Loader"

export default () => {
  const { postId, commentId } = useParams()
  const history = useHistory()
  const contentRef = useRef()

  const [ comment, setComment ] = useState(null)

  useEffect(async () => {
    const { data: comment } = await axios.get(`https://bitsolver.herokuapp.com/api/comments/${commentId}`)

    setComment(comment)
  }, [])

  useEffect(() => {
    if (comment) {
      contentRef.current.value = comment.content
    }
  }, [ comment ])

  const submit = async event => {
    event.preventDefault()

    const content = contentRef.current.value

    const commentData = {
      content
    }

    try {
      const { data: comment } = await axios.patch(`https://bitsolver.herokuapp.com/api/comments/${commentId}`, commentData)

      console.log(comment)

      history.push(`/posts/${postId}`)
    } catch(e) {
      toast.error(e.response.data.message)
    }
  }

  return (
    <>
      <SmallHeader edit single title='comment' center />
      {
        !comment ?
          <Loader /> :
          <div className='site-data single'>
            <div className='form-container single' onSubmit={submit}>
              <form className='comment-form'>
                <div className='creating-comment-row'>
                  <label htmlFor='content'>Content:</label>
                  <textarea
                    type='text'
                    id='content'
                    name='content'
                    placeholder='comment content...'
                    ref={contentRef}
                    rows={16}
                    required
                  ></textarea>
                </div>
                <div className='creating-comment-row flex-center'>
                  <input type='submit' value='Update comment' />
                </div>
              </form>
            </div>
          </div>
      }
      <Toaster
        position="bottom-center"
      />
    </>
  )
}
