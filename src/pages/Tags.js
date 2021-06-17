import { useEffect, useState } from "react"
import axios from "axios"

import SmallHeader from '../components/general/small-header/SmallHeader'
import Paginator from "../components/general/pagination/Paginator"
import Loader from "../components/general/loader/Loader"
import Tag from '../components/tags/Tag'
import './scss/tags.scss'

export default () => {
  const [ isLoading, setIsLoading ] = useState(true)
  const [ pageCount, setPageCount ] = useState(1)
  const [ page, setPage ] = useState(1)
  const [ tags, setTags ] = useState([])

  useEffect(async () => {
    setIsLoading(true)

    const { data: tags } = await axios.get(`https://bitsolver.herokuapp.com/api/categories?page=${page}`)
    const { data: pageCount } = await axios.get(`https://bitsolver.herokuapp.com/api/categories/pages`)
  
    setTags(tags)
    setPageCount(pageCount.pages)
    setIsLoading(false)
  }, [ page ])

  return (
    <>
      <SmallHeader data='tags' />
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
        pageCount={pageCount}
      />
    </>
  )
}
