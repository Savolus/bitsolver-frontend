import { Link } from "react-router-dom"

export default ({ id, title, description }) => {
  return (
    <div data-id={id} className='tag-card'>
      <Link to={`/tags/${id}`} className='tag-card-title'>
        { title }
      </Link>
      <p className='tag-card-description'>
        { description }
      </p>
    </div>
  )
}
