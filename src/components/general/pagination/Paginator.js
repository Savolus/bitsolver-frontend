import './paginator.scss'

export default ({ page, setPage }) => {
  const decrement = () => {
    setPage(prevPage => {
      if (prevPage === 1) {
        return prevPage
      }

      return prevPage - 1
    })
  }

  const inecrement = () => {
    setPage(prevPage => {
      // if (prevPage === MAX_PAGE) {
      //  return prevPage
      // }

      return prevPage + 1
    })
  }

  return (
    <div className='site-paginator'>
      <span className='paginate-action' onClick={decrement}>
        &#60;
      </span>
      <span className='paginate-value'>
        { page }
      </span>
      <span className='paginate-action' onClick={inecrement}>
        &#62;
      </span>
    </div>
  )
}
