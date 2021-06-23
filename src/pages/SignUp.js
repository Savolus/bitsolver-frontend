import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import axios from "axios"
import './scss/sign.scss'

export default () => {
  const onSubmit = async event => {
    event.preventDefault()

    const login = event.target.login.value
    const full_name = event.target.full_name.value
    const email = event.target.email.value
    const password = event.target.password.value
    const passwordRepeat = event.target.passwordRepeat.value

    if (!login) {
      return console.log('INVALID LOGIN', login)
    }
    if (!full_name) {
      return console.log('INVALID FULL NAME', full_name)
    }
    if (!email) {
      return console.log('INVALID EMAIL', email)
    }
    if (!password) {
      return console.log('INVALID PASSWORD', password)
    }
    if (password !== passwordRepeat) {
      return console.log('INVALID PASSWORD REPEAT', passwordRepeat)
    }

    const postData = {
      login,
      full_name,
      email,
      password
    }

    try {
      await axios.post('https://bitsolver.herokuapp.com/api/auth/register', postData)

      toast.success('Profile created')
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
          <label htmlFor='full_name'>Full name:</label>
          <input
            type='text'
            id='full_name'
            name='full_name'
            placeholder='full name...'
            required
          />
        </div>
        <div className='sign-row'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='email...'
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
        <div className='sign-row'>
          <label htmlFor='passwordRepeat'>Password repeat:</label>
          <input
            type='password'
            id='passwordRepeat'
            name='passwordRepeat'
            placeholder='password repeat...'
            required 
          />
        </div>
        <div className='sign-row flex-center'>
          <input type='submit' value='Sign up' />
        </div>
        <div className='sign-row flex-center'>
          <span>
            Already have an account? <Link to='/signin'>Sign in!</Link>
          </span>
        </div>
      </form>
      <Toaster
        position="bottom-center"
      />
    </div>
  )
}
