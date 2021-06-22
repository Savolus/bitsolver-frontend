import { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import ImageUploader from 'react-images-upload'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import axios from "axios"

import { setAccessToken } from '../../accessorSlice'
import Loader from '../general/loader/Loader'
import '../../pages/scss/sign.scss'

const buttonStyle = {
  display: 'block',
  backgroundColor: 'rgb(20, 88, 206)',
  padding: '5px 10px',
  width: 'fit-content',
  height: 'fit-content',
  fontWeight: 'bold',
  fontSize: '18px',
  borderRadius: '5px',
  //margin: '0 2.5px',
  marginBottom: '10px',
  transition: '.25s',
  color: '#fff',
}

export default () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const loginRef = useRef()
  const fullNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const [ avatar, setAvatar ] = useState([])
  const [ user, setUser ] = useState(null)

  useEffect(async () => {
		const access_token = Cookies.get('access_token')
		const decoded = jwtDecode(access_token)

		const { data: user } = await axios.get(`https://bitsolver.herokuapp.com/api/users/${decoded.sub}`)

		setUser(user)
	}, [ ])

  const onDrop = avatar => {
    setAvatar(avatar)
  }

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
    if (user) {
      loginRef.current.value = user.login
      fullNameRef.current.value = user.full_name
      emailRef.current.value = user.email

      isChanged(loginRef, user.login)
      isChanged(fullNameRef, user.full_name)
      isChanged(emailRef, user.email)
      isChanged(passwordRef, '')
    }
  }, [ user ])

  const submit = async event => {
    event.preventDefault()

    let isEddited = false
    const data = {}

    const login = loginRef.current.value
    const full_name = fullNameRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value

    if (login !== user.login) {
      data.login = login
    }
    if (full_name !== user.full_name) {
      data.full_name = full_name
    }
    if (email !== user.email) {
      data.email = email
    }
    if (password !== '') {
      data.password = password
    }

    if (Object.keys(data).length) {
      try {
        await axios.patch(`https://bitsolver.herokuapp.com/api/users/`, data)

        dispatch(setAccessToken(Cookies.get('access_token')))

        isEddited = true
        toast.success('Credentials successfuly updated!')
      } catch(e) {
        toast.error(e.response.data.message)
      }
    }

    const file = avatar[0]

    if (file) {
      try {
        const formData = new FormData()

        formData.append('avatar', file)

        await axios.post('https://bitsolver.herokuapp.com/api/users/avatar', formData)
    
        dispatch(setAccessToken(Cookies.get('access_token')))
  
        isEddited = true
        toast.success('Avatar successfuly updated!')
      } catch (e) {
        toast.error(e.response.data.message)
      }
    }

    isEddited ?
      history.push('/profile') :
      toast('No changes')
  }

  return (
    <>
      {
        !user ?
          <Loader /> :
          <div className='form-container'>
            <form className='profile-edit-form' onSubmit={submit}>
              <div className='profile-edit-row flex-center'>
                <ImageUploader
                  withIcon
                  withLabel
                  withPreview
                  singleImage
                  label='Max file size: 5mb, accepted: .png, .jpg, .jpeg'
                  buttonStyles={buttonStyle}
                  buttonClassName='upload-avatar'
                  buttonText='Choose avatar'
                  onChange={onDrop}
                  imgExtension={[ '.png', '.jpg', '.jpeg' ]}
                  maxFileSize={5242880}
                />
              </div>
              <div className='profile-edit-row'>
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
              <div className='profile-edit-row'>
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
              <div className='profile-edit-row'>
                <label htmlFor='password'>New password:</label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  ref={passwordRef}
                />
              </div>
              <div className='profile-edit-row'>
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
              
              <div className='sign-row flex-center'>
                <input type='submit' value='Save changes' />
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
