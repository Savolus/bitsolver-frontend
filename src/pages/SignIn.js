import { useHistory, Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import axios from "axios"

import { setAccessToken } from '../accessorSlice'
import './scss/sign.scss'

export default () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmit = async event => {
    event.preventDefault()

    const login = event.target.login.value
    const password = event.target.password.value

    if (!login) {
      return console.log('INVALID LOGIN', login)
    }
    if (!password) {
      return console.log('INVALID PASSWORD', password)
    }

    const postData = {
      login,
      password
    }

    try {
      const { data } = await axios.post('https://bitsolver.herokuapp.com/api/auth/login', postData)

      const decoded = jwtDecode(data.access_token)
      const expires = (decoded.exp - decoded.iat) / 60 / 60 / 24

      Cookies.set('access_token', data.access_token, {
        expires,
        path: '/'
      })

      dispatch(setAccessToken(data.access_token))

      history.push('/posts')
    } catch(e) {
      toast.error(e.response.data.message)
    }
  }

  return (
    <div className='form-container'>
      <form className='sign-form' onSubmit={onSubmit}>
        <div className='sign-row'>
          <label htmlFor='login'>Login:</label>
          <input
            type='text'
            id='login'
            name='login'
            placeholder='login...'
            required
          />
        </div>
        <div className='sign-row'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='password...'
            required
          />
        </div>
        <div className='sign-row flex-center'>
          <input type='submit' value='Sign in' />
        </div>
        <div className='sign-row flex-center'>
          <span>
            Don't have an account? <Link to='/signup'>Sign up!</Link>
          </span>
        </div>
      </form>
      <Toaster
        position="bottom-center"
      />
    </div>
  )
}
