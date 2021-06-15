export default ({ id, login, fullName, profilePicture }) => {
  return (
    <div data-id={id} className='user-card'>
      <div className='user-card-general'>
        <div className='user-card-profile-picture'>
          <img src={profilePicture} className='user-card-avatar' />
        </div>
        <div className='user-card-rating-container'>
          <code className='user-card-rating'>
            0
          </code>
        </div>
      </div>
      <div className='user-card-info'>
        <span className='user-card-login'>
          { login }
        </span>
        <p className='user-card-full-name'>
          { fullName }
        </p>
      </div>
    </div>
  )
}
