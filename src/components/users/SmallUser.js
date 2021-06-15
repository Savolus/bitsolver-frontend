import { useEffect, useState } from 'react'

import defaultProfilePicture from '../../images/avatar.png'

export default () => {
	const [ profilePicture, setProfilePicture ] = useState(defaultProfilePicture)

	useEffect(async () => {
		// request user profile picture
	}, [])

	return (
		<div className='header-samlluser'>
			<img src={ profilePicture } className='header-samlluser-avatart' />
		</div>
	)
}
