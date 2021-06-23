import { useEffect, useState } from "react"
import axios from "axios"

import SmallHeader from '../components/general/small-header/SmallHeader'
import Paginator from "../components/general/pagination/Paginator"
import Loader from "../components/general/loader/Loader"
import User from '../components/users/User'
import './scss/users.scss'

const size = 16

export default () => {
  const [ isLoading, setIsLoading ] = useState(true)
  const [ pageCount, setPageCount ] = useState(1)
  const [ page, setPage ] = useState(1)
  const [ users, setUsers ] = useState([])

  useEffect(async () => {
    setIsLoading(true)

    const { data: users } = await axios.get(`https://bitsolver.herokuapp.com/api/users?page=${page}&size=${size}`)
    const { data: pageCount } = await axios.get(`https://bitsolver.herokuapp.com/api/users/pages?size=${size}`)
    
    setUsers(users)
    setPageCount(pageCount.pages)
    setIsLoading(false)
  }, [ page ])

  return (
    <>
      <SmallHeader data='users' />
      <div className='site-data'>
        {
          isLoading ?
            <Loader /> :
            <div className='users'>
              {
                users.map(({ _id, login, rating, avatar, full_name }) => {
                  return <User
                    key={_id}
                    id={_id}
                    login={login}
                    fullName={full_name}
                    rating={rating}
                    avatar={avatar}
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
