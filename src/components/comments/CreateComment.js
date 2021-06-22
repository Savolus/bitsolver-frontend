import { useHistory, useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

import SmallHeader from '../general/small-header/SmallHeader'

export default () => {
  const { postId } = useParams()
  const history = useHistory()

  const submit = async event => {
    event.preventDefault()

    const content = event.target.content.value

    const commentData = {
      content
    }

    try {
      await axios.post(`https://bitsolver.herokuapp.com/api/posts/${postId}/comments`, commentData)

      history.push(`/posts/${postId}`)
    } catch(e) {
      toast.error(e.response.data.message)
    }
  }

  return (
    <>
      <SmallHeader single title='comment' center />
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
                rows={16}
                required
              ></textarea>
            </div>
            <div className='creating-comment-row flex-center'>
              <input type='submit' value='Create comment' />
            </div>
          </form>
        </div>
      </div>
      <Toaster
        position="bottom-center"
      />
    </>
  )
}
