import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import axios from 'axios'

import Loader from '../general/loader/Loader'

export default () => {
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
							<img src={ user.avatar } className='header-samlluser-avatart' />
						</Link>
				 	</>
			}
		</div>
	)
}
