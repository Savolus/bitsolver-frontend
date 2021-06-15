import { useEffect, useState } from "react"
import axios from "axios"

import SmallHeader from '../components/general/small-header/SmallHeader'
import Paginator from "../components/general/pagination/Paginator"
import Loader from "../components/general/loader/Loader"
import defaultProfilePicture from '../images/avatar.png'
import User from '../components/users/User'
import './scss/users.scss'


export default () => {
  const [ isLoading, setIsLoading ] = useState(true)
  const [ page, setPage ] = useState(1)
  const [ users, setUsers ] = useState([])

  useEffect(async () => {
    setIsLoading(true)

    const { data } = await axios.get(`http://bitsolver.herokuapp.com/api/users?page=${page}&size=8`)
    
    setUsers(data)
    setIsLoading(false)
  }, [ page ])

  return (
    <>
      <SmallHeader text='All users' />
      <div className='site-data'>
        {
          isLoading ?
            <Loader /> :
            <div className='users'>
              {
                users.map(({ _id, login, full_name }) => {
                  return <User
                    key={_id}
                    id={_id}
                    login={login}
                    fullName={full_name}
                    profilePicture={defaultProfilePicture}
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
