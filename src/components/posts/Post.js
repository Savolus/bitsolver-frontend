import { useEffect, useState } from 'react'

import defaultProfilePicture from '../../images/avatar.png'
import SmallTag from '../tags/SmallTag'

export default ({ id, title, content, user, tags }) => {
  const [ profilePicture, setProfilePicture ] = useState(defaultProfilePicture)

	useEffect(async () => {
		// request user profile picture
	}, [])
  
  return (
    <div data-id={id} className='post-card'>
      <div className='post-card-general'>
        <div className='post-card-user-profile-picture'>
          <img src={profilePicture} className='post-card-user-avatar' />
        </div>
        <div className='post-card-rating-container'>
          <span className='post-card-action'>&#8743;</span>
          <code className='post-card-rating'>
            0
          </code>
          <span className='post-card-action'>&#8744;</span>
        </div>
      </div>
      <div className='post-card-info'>
        <span className='post-card-title'>
          { title }
        </span>
        <p className='post-card-content-preview'>
          { content }
        </p>
        <div className='post-card-tags'>
          {
            tags.map(({ _id, title }) => {
              return <SmallTag
                key={_id}
                id={_id}
                title={title}
              />
            })
          }
        </div>
      </div>
    </div>
  )
}
