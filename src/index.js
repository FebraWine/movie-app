import { createRoot } from 'react-dom/client'

import App from './Component/App/App'

const content = document.getElementById('root')
const root = createRoot(content)

root.render(<App />)
