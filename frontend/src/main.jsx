import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ReactDOM from "react-dom/client";
import './index.css';
import RegisterUserPage from './pages/RegisterUserPage.jsx'
const router = createBrowserRouter([
  {
    path : '/',
    element : <RegisterUserPage/>
  },
  {
    path : '/register',
    element : <RegisterUserPage/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
