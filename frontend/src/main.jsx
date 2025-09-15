import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ReactDOM from "react-dom/client";
import './index.css';
import RegisterUserPage from './pages/RegisterUserPage.jsx'
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
const router = createBrowserRouter([
  {
    path : '/',
    element : <HomePage/>
  },
  {
    path : '/register',
    element : <RegisterUserPage/>
  },
  {
    path : '/login',
    element : <LoginPage/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
