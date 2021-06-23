import {
  FaTelegram,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaReact,
} from 'react-icons/fa'
import { IconContext } from "react-icons"

export default () => (
	<nav className='footer-nav'>
    <ul className='footer-nav-ul'>
      <IconContext.Provider value={{ size: '1.5rem', color: '#fff' }}>
        <li className='footer-nav-li'>
          <a href='https://t.me/savolus' target='_blank' className='links'>
            <FaTelegram />
          </a>
        </li>
        <li className='footer-nav-li'>
          <a href='https://www.instagram.com/mykola_dorohyi/' target='_blank' className='links'>
            <FaInstagram />
          </a>
        </li>
        <li className='footer-nav-li'>
          <a href='https://www.linkedin.com/in/mykola-dorohyi-12b585202/' target='_blank' className='links'>
            <FaLinkedin />
          </a>
        </li>
        <li className='footer-nav-li'>
          <a href='https://github.com/Savolus' target='_blank' className='links'>
            <FaGithub />
          </a>
        </li>
        <li className='footer-nav-li'>
          <a href='https://uk.reactjs.org/' target='_blank' className='links'>
            <FaReact />
          </a>
        </li>
      </IconContext.Provider>
    </ul>
  </nav>
)