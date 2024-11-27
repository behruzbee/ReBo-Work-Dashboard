import ReactDOM from 'react-dom/client'

import Providers from './providers'

import './styles/app.scss'

const appElement = document.getElementById('app')!

ReactDOM.createRoot(appElement).render(<Providers />)