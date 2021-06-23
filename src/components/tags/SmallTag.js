import { Link, useHistory } from "react-router-dom"

export default ({ id, title }) => {
  const history = useHistory()
  
  const forceRender = () => {
    if (location.href.includes('/tags/')) {
      history.go(0)
    }
  }

  return (
    <Link to={`/tags/${id}`} onClick={forceRender} className='tag-card-title'>
      { title }
    </Link>
  )
}
