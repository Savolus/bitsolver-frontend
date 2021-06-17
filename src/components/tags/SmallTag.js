import { Link } from "react-router-dom"

export default ({ id, title }) => {
  const cleaverRender = () => {
    if (location.href.includes('/tags/')) {
      location.replace(`/tags/${id}`)
    }
  }

  return (
    <Link to={`/tags/${id}`} onClick={cleaverRender} className='tag-card-title'>
      { title }
    </Link>
  )
}
