import { Link } from "react-router-dom"

export default ({ data }) => {
  return (
    <div className='site-small-header'>
      <div>
        <h2>
          All { data }
        </h2>
        {
          data === 'posts' &&
          <Link to={`/${data}/create`}>
            Create { data.slice(0, data.length) }
          </Link>
        }
      </div>
      <div>
      </div>
    </div>
  )
}
