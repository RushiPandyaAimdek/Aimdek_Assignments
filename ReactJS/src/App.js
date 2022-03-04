import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/home'
import Cart from './pages/Cart/cart'
import Login from './pages/Login/login'
import Register from './pages/Register/register'
import ProductInfo from './pages/ProductInfo/productinfo'
import Orders from './pages/Orders/orders'
const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
                    <Route exact path='/Cart' element={<ProtectedRoutes><Cart /></ProtectedRoutes>} />
                    <Route exact path='/Orders' element={<ProtectedRoutes><Orders /></ProtectedRoutes>} />
                    <Route exact path='/ProductInfo/:id' element={<ProtectedRoutes><ProductInfo /></ProtectedRoutes>} />
                    <Route exact path='/Login' element={<Login />} />
                    <Route exact path='/Register' element={<Register />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default App

//using protected routes for prevent unauthorize user
export const ProtectedRoutes = ({ children }) => {
    if (localStorage.getItem('currentUser')) {
        return children
    }
    else {
        return<Navigate to='/Login' />
    }
}