import defaultProfilePicture from '../images/avatar.png'
import axios from "axios"
import './scss/sign.scss'
import { useEffect, useRef, useState } from 'react'
import Loader from '../components/general/loader/Loader'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export default () => {
	const [ profilePicture, setProfilePicture ] = useState(defaultProfilePicture)
  const [ isEdited, setIsEdited ] = useState(false)
  const [ user, setUser ] = useState(null)
  const loginRef = useRef()
  const fullNameRef = useRef()
  const emailRef = useRef()
  const ratingRef = useRef()

  useEffect(async () => {
		// request user profile picture
		const access_token = Cookies.get('access_token')
		const decoded = jwtDecode(access_token)

		const { data: user } = await axios.get(`https://bitsolver.herokuapp.com/api/users/${decoded.sub}`)

		setUser(user)
	}, [ isEdited ])

  const isChanged = (ref, initialValue) => {
    const classes = ref.current.className.split(' ')

    if (ref.current.value !== initialValue) {
      if (classes.indexOf('profile-change') === -1) {
        ref.current.className += 'profile-change'
      }
    } else {
      ref.current.className = classes.filter(className => className !== 'profile-change').join(' ')
    }
  }

  useEffect(() => {
    if (
      loginRef.current &&
      fullNameRef.current &&
      emailRef.current &&
      ratingRef
    ) {
      loginRef.current.value = user.login
      fullNameRef.current.value = user.full_name
      emailRef.current.value = user.email ?? 'N/A'
      ratingRef.current.value = user.rating

      isChanged(loginRef, user.login)
      isChanged(fullNameRef, user.full_name)
      isChanged(emailRef, user.email)
    }
  }, [ user ])

  const submit = async event => {
    event.preventDefault()

    const data = {}

    const login = loginRef.current.value
    const full_name = fullNameRef.current.value
    const email = emailRef.current.value

    if (login !== user.login) {
      data.login = login
    }
    if (full_name !== user.full_name) {
      data.full_name = full_name
    }
    if (email !== user.email) {
      data.email = email
    }

    if (Object.keys(data).length) {
      try {
        await axios.patch(`https://bitsolver.herokuapp.com/api/users/`, data)

        setIsEdited(true)
      } catch(e) {
        console.error(e)
      }
    }
  }

  return (
    <>
      {
        !user ?
          <Loader /> :
          <div className='form-container'>
            <form className='profile-form' onSubmit={submit}>
              <div className='profile-row flex-center'>
                <img src={ profilePicture } className='profile-avatar' />
              </div>
              <div className='profile-row'>
                <label htmlFor='login'>Login:</label>
                <input
                  type='text'
                  id='login'
                  name='login'
                  ref={loginRef}
                  onChange={() => isChanged(loginRef, user.login ?? '')}
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
                  onChange={() => isChanged(emailRef, user.email ?? '')}
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
                <input type='submit' value='Save changes' />
              </div>
            </form>
          </div>
      }
    </>
  )
}
