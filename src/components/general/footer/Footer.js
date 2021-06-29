import Self from './Self'
import './footer.scss'
import Links from './Links'

export default () => (
  <footer className='site-footer'>
    <div className='footer-container'>
      <div className='footer-up'>
        <Self />
        <Links />
      </div>
      <div className='footer-down'>
        Copyright © 2021. All rights reserved.
      </div>
    </div>
  </footer>
)
