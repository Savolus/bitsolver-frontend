import { Link } from "react-router-dom"

export default ({ id, title }) => {
  const forceRender = () => {
    if (location.href.includes('/tags/')) {
      location.replace(`/tags/${id}`)
    }
  }

  // onClick={forceRender}
  
  return (
    <Link to={`/tags/${id}`}  className='tag-card-title'>
      { title }
    </Link>
  )
}
