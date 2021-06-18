import axios from 'axios'
import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

export default () => {
  const { postId } = useParams()
  const history = useHistory()

  useEffect(async () => {
  }, [])

  const submit = async event => {
    event.preventDefault()

    const content = event.target.content.value

    const commentData = {
      content
    }

    try {
      const { data: comment } = await axios.post(`https://bitsolver.herokuapp.com/api/posts/${postId}/comments`, commentData)

      console.log(comment)

      history.push(`/posts/${postId}`)
    } catch(e) {
      console.error(e)
    }
  }

  return (
    <div className='form-container' onSubmit={submit}>
      <form className='comment-form'>
        <div className='creating-comment-row'>
          <label htmlFor='content'>Content:</label>
          <textarea
            type='text'
            id='content'
            name='content'
            placeholder='comment content...'
            rows={8}
            required
          ></textarea>
        </div>
        <div className='creating-comment-row flex-center'>
          <input type='submit' value='Create comment' />
        </div>
      </form>
    </div>
  )
}
