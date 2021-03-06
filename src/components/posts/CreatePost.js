import { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import axios from 'axios'

import SmallHeader from '../general/small-header/SmallHeader'

const styles = {
  option: styles => ({
    ...styles,
    cursor: 'pointer'
  }),
  multiValue: styles => ({
    ...styles,
    backgroundColor: 'rgb(20, 88, 206)',
    padding: '2.5px 5px',
    borderRadius: '5px',
    cursor: 'pointer'
  }),
  multiValueLabel: styles => ({
    ...styles,
    color: '#fff'
  }),
  multiValueRemove: styles => ({
    ...styles,
    color: '#fff',
    borderRadius: '5px',
    maxHeight: 'fit-content',
    padding: '5px',
    ':hover': {
      backgroundColor: '#0B51C6',
    },
  })
}

export default () => {
  const history = useHistory()
  const titleRef = useRef()
  const contentRef = useRef()

  const [ tags, setTags ] = useState([])

  useEffect(async () => {
    const { data: tags } = await axios.get('https://bitsolver.herokuapp.com/api/categories')

    setTags(tags.map(({ _id, title }) => ({
      value: _id,
      label: title
    })))
  }, [])

  const onSubmit = async event => {
    event.preventDefault()

    const title = titleRef.current.value
    const content = contentRef.current.value
    const tags = event.target.tags
    let categories = []

    if (tags instanceof RadioNodeList) {
      categories = [ ...tags ]
    } else {
      categories = [ tags ]
    }

    categories = categories.map(({ value }) => value).filter(value => value && value)

    const postData = {
      title,
      content,
      categories
    }

    try {
      const { data: post } = await axios.post('https://bitsolver.herokuapp.com/api/posts', postData)

      history.push(`/posts/${post._id}`)
    } catch(e) {
      toast.error(e.response.data.message)
    }
  }

  return (
    <>
      <SmallHeader single title='post' center />
      <div className='site-data single'>
        <div className='form-container single' onSubmit={onSubmit}>
          <form className='post-form'>
            <div className='creating-post-row'>
              <label htmlFor='title'>Title:</label>
              <input
                type='text'
                id='title'
                name='title'
                placeholder='post title...'
                ref={titleRef}
                required
              />
            </div>
            <div className='creating-post-row'>
              <label htmlFor='content'>Content:</label>
              <textarea
                type='text'
                id='content'
                name='content'
                placeholder='post content...'
                ref={contentRef}
                rows={16}
                required
              ></textarea>
            </div>
            <div className='creating-post-row'>
              <label htmlFor='tags'>Categories:</label>
              <Select
                options={tags}
                isMulti
                id='tags'
                name='tags'
                styles={styles}
                className='nopadding'
                required
              />
            </div>
            <div className='creating-post-row flex-center'>
              <input type='submit' value='Create post' />
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
