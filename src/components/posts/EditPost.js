import { useHistory, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Select from 'react-select'
import axios from 'axios'

import SmallHeader from '../general/small-header/SmallHeader'
import Loader from "../general/loader/Loader"

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
  const { id } = useParams()
  const history = useHistory()
  const titleRef = useRef()
  const contentRef = useRef()

  const [ post, setPost ] = useState(null)
  const [ tags, setTags ] = useState([])

  useEffect(async () => {
    const { data: post } = await axios.get(`https://bitsolver.herokuapp.com/api/posts/${id}`)
    const { data: tags } = await axios.get('https://bitsolver.herokuapp.com/api/categories')
    const { data: categories } = await axios.get(`https://bitsolver.herokuapp.com/api/posts/${id}/categories`)

    setTags(tags.map(({ _id, title }) => ({
      value: _id,
      label: title
    })))

    post.categories = categories.map(({ _id, title }) => ({
      value: _id,
      label: title
    }))

    setPost(post)
  }, [])

  useEffect(() => {
    if (post) {
      titleRef.current.value = post.title
      contentRef.current.value = post.content
    }
  }, [ post ])

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
      const { data: post } = await axios.patch(`https://bitsolver.herokuapp.com/api/posts/${id}`, postData)

      history.push(`/posts/${post._id}`)
    } catch(e) {
      toast.error(e.response.data.message)
    }
  }

  return (
    <>
      <SmallHeader edit single title='post' center />
      {
        !post ?
          <Loader /> :
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
                    defaultValue={post.categories}
                    styles={styles}
                    required
                  />
                </div>
                <div className='creating-post-row flex-center'>
                  <input type='submit' value='Update post' />
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
