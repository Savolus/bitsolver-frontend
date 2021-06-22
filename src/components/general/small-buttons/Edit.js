import { IconContext } from "react-icons"
import { FaEdit } from 'react-icons/fa'
import { Link } from "react-router-dom"

export default ({ prefix }) => (
  <Link to={`${prefix}/edit`} className='edit'>
    <IconContext.Provider value={{ size: '1.2rem' }}>
      <FaEdit />
    </IconContext.Provider>
  </Link>
)
