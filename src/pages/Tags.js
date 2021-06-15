import { useEffect, useState } from "react"
import axios from "axios"

import SmallHeader from '../components/general/small-header/SmallHeader'
import Tag from '../components/tags/Tag'
import './scss/tags.scss'
import Paginator from "../components/general/pagination/Paginator"
import Loader from "../components/general/loader/Loader"

export default () => {
  const [ isLoading, setIsLoading ] = useState(true)
  const [ page, setPage ] = useState(1)
  const [ tags, setTags ] = useState([])

  useEffect(async () => {
    setIsLoading(true)

    const { data } = await axios.get(`http://bitsolver.herokuapp.com/api/categories?page=${page}&size=5`)
  
    setTags(data)
    setIsLoading(false)
  }, [ page ])

  return (
    <>
      <SmallHeader text='All tags' />
      <div className='site-data'>
        {
          isLoading ?
            <Loader /> :
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
        }
      </div>
      <Paginator
        page={page}
        setPage={setPage}
      />
    </>
  )
}
