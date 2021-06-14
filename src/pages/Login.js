import { useHistory } from 'react-router-dom/'
import { useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import axios from "axios"

import { setAccessToken } from '../accessorSlice'
import './scss/sign.scss'

export default () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const submit = async event => {
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

      const decoded = jwtDecode(data.access_token) // to get exp

      Cookies.set('access_token', data.access_token, {
        expires: 7, // 7 days
        path: '/'
      })

      dispatch(setAccessToken(data.access_token))

      console.log('LOGGED')

      history.push('/')
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <div className='form-container' onSubmit={submit}>
      <form className='sign-form'>
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
      </form>
    </div>
  )
}
