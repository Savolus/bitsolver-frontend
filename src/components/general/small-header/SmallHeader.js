import { useState } from "react"
import { Link } from "react-router-dom"

export default ({ data, title, center, single, postId }) => {
  const [ classNameSingle ] = useState(single || '')
  const [ classNameCenter ] = useState(center ? 'small-header-center-title' : '')

  return (
    <div className={`site-small-header ${classNameSingle}`}>
      <div className={classNameCenter}>
        <h2>
          {
            data ?
              `All ${data}` :
              `Create  ${title}`
          }
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
