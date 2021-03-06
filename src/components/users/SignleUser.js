import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import Loader from "../general/loader/Loader"

export default () => {
  const { id } = useParams()
  const loginRef = useRef()
  const fullNameRef = useRef()
  const ratingRef = useRef()

	const [ user, setUser ] = useState(null)

  useEffect(async () => {
    const { data: user } = await axios.get(`https://bitsolver.herokuapp.com/api/users/${id}`)

    setUser(user)
  }, [])

  useEffect(() => {
    if (user) {
      loginRef.current.value = user.login
      fullNameRef.current.value = user.full_name
      ratingRef.current.value = user.rating
    }
  }, [ user ])

  return (
    <div className='site-data single'>
      {
        !user ?
          <Loader /> :
          <div className='form-container'>
            <form className='profile-form'>
              <div className='profile-row flex-center'>
                <img src={ user.avatar } className='profile-avatar' />
              </div>
              <div className='profile-row'>
                <label htmlFor='login'>Login:</label>
                <input
                  type='text'
                  id='login'
                  name='login'
                  ref={loginRef}
                  onChange={() => isChanged(loginRef, user.login ?? '')}
                  readOnly
                  required
                />
              </div>
              <div className='profile-row'>
                <label htmlFor='full_name'>Full name:</label>
                <input
                  type='text'
                  id='full_name'
                  name='full_name'
                  ref={fullNameRef}
                  onChange={() => isChanged(fullNameRef, user.full_name ?? '')}
                  readOnly
                  required
                />
              </div>
              <div className='profile-row'>
                <label htmlFor='rating'>Rating:</label>
                <input
                  type='number'
                  id='rating'
                  name='rating'
                  ref={ratingRef}
                  readOnly
                />
              </div>
            </form>
          </div>
      }
    </div>
  )
}
