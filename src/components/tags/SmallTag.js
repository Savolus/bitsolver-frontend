import { Link } from "react-router-dom"

export default ({ id, title }) => {
  return (
    <Link data-id={id} to={`/tags/${id}`} className='tag-card-title'>
      { title }
    </Link>
  )
}
