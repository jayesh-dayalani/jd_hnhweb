import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import MyStore from './redux/MyStore.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import NavComp from './components/NavComp.jsx'
import PendingForms from './components/PendingForms.jsx'
import AcceptedForms from './components/AcceptedForms.jsx'
import RejectedForms from './components/RejectedForms.jsx'
import Inventory from './components/Inventory.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PendingForms />
  },
  {
    path: '/pending',
    element: <><NavComp /><PendingForms /></>
  },
  {
    path: '/accepted',
    element: <><NavComp /><AcceptedForms /></>
  },
  {
    path: '/rejected',
    element: <><NavComp /><RejectedForms /></>
  },
  {
    path: '/inventory',
    element: <><NavComp /><Inventory /></>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={MyStore}>
    <RouterProvider router={router} />
  </Provider>,
)
