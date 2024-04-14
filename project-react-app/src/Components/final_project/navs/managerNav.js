import { BrowserRouter, Route, Routes, useNavigate, Link } from "react-router-dom"
import { useDebugValue, useEffect } from "react"
import AllProducts from '../screens/productScreens/allProducts'
import AllUsers from '../screens/userScreens/AllUsers'
import AllOrders from "../screens/orderScreens/allOrders"
import UpdateProduct from '../screens/productScreens/addProduct'
import { logout } from '../features/users/userSlice'
import { UseDispatch, useDispatch } from "react-redux"
import AddProduct from "../screens/productScreens/addProduct"
import SingleProduct from '../screens/productScreens/singleProduct'
import SingleOrder from '../screens/orderScreens/singleOrder'
import { resetSessionStorage } from '../functions/functions'
import ManagerAppBar from './navsComponents/managerAppBar'
import About from "../screens/about"

export default function ManagerNav() {
    const dispatchFunc = useDispatch()
    const navigateFunc = useNavigate()
    useEffect(() => {
        navigateFunc('/products')
    }, [])
    const pressAllOrders = () => {
        sessionStorage.setItem('scrollPositionProducts', 0);
        navigateFunc("/orders")
    }
    const pressAllProducts = () => {
        sessionStorage.setItem('scrollPositionOrders', 0);
        navigateFunc("/products")

    }
    const pressAllUsers = () => {
        resetSessionStorage()
        navigateFunc("/users")
    }
    const pressAddProduct = () => {
        resetSessionStorage()
        navigateFunc('/product/new')
    }
    const pressLogout = () => {
        resetSessionStorage()
        dispatchFunc(logout())
        navigateFunc('/products')
    }
    const pressAbout=()=>{
        navigateFunc('/about')
    }
    return (
        <>
            <div className="divPink">
                {/* <p>my managerNav component:</p>
                <p>hello dear manager👨🏻‍💼</p> */}
                {/* <button onClick={pressAllProducts}>all products</button>
                <button onClick={pressAllOrders}>all orders</button>
                <button onClick={perssAllUsers}>all users</button>
                <button onClick={pressAddProduct}>add new product</button>
                <button onClick={pressLogout}>logout</button> */}
                <ManagerAppBar pressAbout={pressAbout}  pressAllProducts={pressAllProducts} pressLogout={pressLogout} pressAllOrders={pressAllOrders} pressAllUsers={pressAllUsers} pressAddProduct={pressAddProduct}></ManagerAppBar>
                <Routes>
                    <Route path="orders" element={<AllOrders></AllOrders>}></Route>
                    <Route path="products" element={<AllProducts></AllProducts>}></Route>
                    <Route path='users' element={<AllUsers></AllUsers>}></Route>
                    <Route path='/product/:id' element={<AddProduct></AddProduct>}></Route>
                    <Route path='/productDisplay/:id' element={<SingleProduct></SingleProduct>}></Route>
                    <Route path='/orderDisplay/:id' element={<SingleOrder></SingleOrder>}></Route>
                    <Route path='about' element={<About></About>}></Route>

                </Routes>
            </div>
        </>
    )
}

