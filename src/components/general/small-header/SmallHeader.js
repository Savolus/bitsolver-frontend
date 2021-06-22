import { useState } from "react"
import { Link } from "react-router-dom"

export default ({ data, edit, title, center, single, postId }) => {
  const [ classNameSingle ] = useState(single || '')
  const [ classNameCenter ] = useState(center ? 'small-header-center-title' : '')

  return (
    <div className={`site-small-header ${classNameSingle}`}>
      <div className={classNameCenter}>
        <h2>
          {
            data ?
              `All ${data}` :
              edit ?
                `Edit ${title}` :
                `Create ${title}`
          }
        </h2>
        {
          data === 'posts' ?

            <Link to={`/posts/create`}>
              Create post
            </Link> :

            data === 'comments' &&
              <Link to={`/posts/${postId}/comments/create`}>
                Create comment
              </Link> 
        }
      </div>
      <div>
      </div>
    </div>
  )
}
