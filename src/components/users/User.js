import { Link } from 'react-router-dom'

export default ({ id, login, fullName, rating, avatar }) => {
  return (
    <Link to={`/users/${id}`} className='user-card'>
      <div className='user-card-general'>
        <div className='user-card-profile-picture'>
            <img src={ avatar } className='user-card-avatar' />
        </div>
        <div className='user-card-rating-container'>
          <code className='user-card-rating'>
            { rating }
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
    </Link>
  )
}
