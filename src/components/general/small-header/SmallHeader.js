import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useState } from "react"

const Button = ({ data, postId }) => (
  data === 'posts' ?

    <Link to={`/posts/create`}>
      Create post
    </Link> :

    data === 'comments' &&
      <Link to={`/posts/${postId}/comments/create`}>
        Create comment
      </Link> 
)


export default ({ data, edit, title, center, single, postId }) => {
	const accessor = useSelector(state => state.accessor.value)

  const [ classNameSingle ] = useState(single || '')
  const [ classNameCenter ] = useState(center ? 'small-header-center-title' : '')
  const [ headerTitle ] = useState(() => {
    if (data) {
      return `All ${data}`
    }

    if (edit) {
      return `Edit ${title}`
    }

    return `Create ${title}`
  })

  return (
    <div className={`site-small-header ${classNameSingle}`}>
      <div className={classNameCenter}>
        <h2>
          { headerTitle }
        </h2>
        { accessor && <Button data={data} postId={postId} /> }
      </div>
      <div></div> { /* for grid */ }
    </div>
  )
}
