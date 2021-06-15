import { useEffect, useState } from "react"
import axios from "axios"

import SmallHeader from '../components/general/small-header/SmallHeader'
import Tag from '../components/tags/Tag'
import './scss/tags.scss'

export default () => {
  const [ page, setPage ] = useState(1)
  const [ tags, setTags ] = useState([])

  useEffect(async () => {
    const { data } = await axios.get(`http://bitsolver.herokuapp.com/api/categories?page=${page}`)
  
    setTags(data)
  }, [])

  return (
    <>
      <SmallHeader text='All tags' />
      <div className='site-data'>
        <div className='tags'>
          {
            tags.map(({ _id, title, description }) => {
              return <Tag
                key={_id}
                id={_id}
                title={title}
                description={description}
              />
            })
          }
        </div>
      </div>
      { /*pagination*/ }
    </>
  )
}
