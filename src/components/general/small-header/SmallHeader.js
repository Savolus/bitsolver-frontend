import { useState } from "react"
import { Link } from "react-router-dom"

export default ({ data, single, postId }) => {
  const [ className ] = useState(single || '')

  return (
    <div className={`site-small-header ${className}`}>
      <div>
        <h2>
          All { data }
        </h2>
        {
          data === 'posts' ?
            <Link to={`/${data}/create`}>
              Create { data.slice(0, data.length) }
            </Link> :
            data === 'comments' &&
              <Link to={`/posts/${postId}/${data}/create`}>
                Create { data.slice(0, data.length) }
              </Link> 
        }
      </div>
      <div>
      </div>
    </div>
  )
}
