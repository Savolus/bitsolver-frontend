import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import store from './store'
import App from './App'
import './index.scss'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#bitsolver')
)
