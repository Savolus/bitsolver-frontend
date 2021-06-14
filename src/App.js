import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'

import Header from './components/general/header/Header'

import Home from './pages/Home'
import Posts from './pages/Posts'
import Register from './pages/Register'
import Login from './pages/Login'
import Cookies from 'js-cookie'

axios.interceptors.request.use(
  config => {
    const access_token = Cookies.get('access_token')

    config.headers.authorization = `Bearer ${access_token}`

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default () => {
	return (
		<>
			<BrowserRouter>
				<Header />
				<main className='site-main'>
					<Switch>
						<Route path='/' exact component={ Home }/>
						<Route path='/register' component={ Register }/>
						<Route path='/login' component={ Login }/>
						<Route path='/posts' component={ Posts }/>
					</Switch>
				</main>
			</BrowserRouter>
		</>
	)
}
