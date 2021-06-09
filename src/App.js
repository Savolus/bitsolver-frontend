import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'

import Home from './pages/Home'
import Posts from './pages/Posts'

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')

    config.headers.authorization = `Bearer ${token}`

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
				<Switch>
					<Route path='/' exact component={ Home }/>
					<Route path='/posts' component={ Posts }/>
				</Switch>
			</BrowserRouter>
		</>
	)
}
