export default ({ id, title }) => {
  return (
    <span data-id={id} className='tag-card-title'>
      { title }
    </span>
  )
}
