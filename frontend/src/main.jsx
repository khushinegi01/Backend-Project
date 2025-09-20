import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux'
import { store } from './store/store.js';
import Toaster from './components/Toaster.jsx';
import './index.css';
import RegisterUserPage from './pages/RegisterUserPage.jsx'
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Layout from './components/Layout.jsx';
import UserDashBoard from './pages/UserDashBoard.jsx';
import ProfileUpdate from './components/Dashboard/ProfileUpdate.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,   
    children: [
      { index: true, element: <HomePage /> }, 
      { path: "register", element: <RegisterUserPage /> }, 
      { path: "login", element: <LoginPage /> },
      { path : 'dashboard' , element : <UserDashBoard/> },
      { path : 'profile' , element : <ProfileUpdate/>}
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster />
  </Provider>

)
