import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import defaultProfilePicture from '../../images/avatar.png'
import Loader from '../general/loader/Loader'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { Link } from 'react-router-dom'

export default () => {
	const [ profilePicture, setProfilePicture ] = useState(defaultProfilePicture)
	const [ user, setUser ] = useState(null)

	useEffect(async () => {
		// request user profile picture
		const access_token = Cookies.get('access_token')
		const decoded = jwtDecode(access_token)

		const { data: user } = await axios.get(`https://bitsolver.herokuapp.com/api/users/${decoded.sub}`)

		setUser(user)
	}, [])

	return (
		<div className='header-samlluser'>
			{
				!user ?
					<Loader white small /> :
				 	<>
						<Link to='/profile' className='header-samlluser-login'>
							{ user.login }
						</Link>
						<Link to='/profile' className='fit-avatar'>
							<img src={ profilePicture } className='header-samlluser-avatart' />
						</Link>
				 	</>
			}
		</div>
	)
}
