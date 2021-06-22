import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import axios from "axios"

import Loader from '../components/general/loader/Loader'
import { removeAccessToken } from '../accessorSlice'
import './scss/sign.scss'
import Edit from '../components/general/edit/Edit'

export default () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const loginRef = useRef()
  const fullNameRef = useRef()
  const emailRef = useRef()
  const ratingRef = useRef()

  const [ user, setUser ] = useState(null)

  useEffect(async () => {
		const access_token = Cookies.get('access_token')
		const decoded = jwtDecode(access_token)

		const { data: user } = await axios.get(`https://bitsolver.herokuapp.com/api/users/${decoded.sub}`)

		setUser(user)
	}, [])

  useEffect(() => {
    if (user) {
      loginRef.current.value = user.login
      fullNameRef.current.value = user.full_name
      emailRef.current.value = user.email
      ratingRef.current.value = user.rating
    }
  }, [ user ])

  const logout = event => {
    event.preventDefault()

    dispatch(removeAccessToken())

    history.push('/')
  }

  return (
    <>
      {
        !user ?
          <Loader /> :
          <div className='form-container'>
            <Edit prefix='/profile' />
            <form className='profile-form' onSubmit={logout}>
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
                  readOnly
                  required
                />
              </div>
              <div className='profile-row'>
                <label htmlFor='email'>Email:</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  ref={emailRef}
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
              <div className='sign-row flex-center'>
                <input type='submit' value='Sign out' />
              </div>
            </form>
          </div>
      }
      <Toaster
        position="bottom-center"
      />
    </>
  )
}
