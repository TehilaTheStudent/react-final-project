import { BrowserRouter, Route, Routes, useNavigate, Link } from "react-router-dom"
import { useEffect } from "react"

import LogIn from '../screens/userScreens/login'
import AllProducts from '../screens/productScreens/allProducts'
import AddUser from '../screens/userScreens/AddUser'
import SingleProduct from '../screens/productScreens/singleProduct'
import { resetSessionStorage } from '../functions/functions'
import ViewCart from "../screens/orderScreens/viewCart"
import GuestAppBar from './navsComponents/guestAppBar'
import About from "../screens/about"
export default function GuestNav() {

    let navigateFunc = useNavigate()
    useEffect(() => {
        navigateFunc("/products")
    }, [])
    const pressLogin = () => {
        resetSessionStorage()

        navigateFunc("/login")
    }
    const pressViewCart = () => {
        resetSessionStorage()
        navigateFunc("/cart")

    }
    const pressAllProducts = () => {
        sessionStorage.setItem('scrollPositionOrders', 0);

        navigateFunc("/products")

    }
    const pressRegister = () => {
        resetSessionStorage()

        navigateFunc("/register")
    }
    const pressAbout=()=>{
        navigateFunc('/about')
    }
    return (
        <div className="divPink" style={{heigth:'100%',display:'grid',
        // background: "blue",
        display: "grid",
        gridRow: "1 1",
        gridTemplateRows: "65px auto",
        height:"100%",
        }}>
            <GuestAppBar pressAbout={pressAbout} pressAllProducts={pressAllProducts} pressLogin={pressLogin} pressRegister={pressRegister} pressViewCart={pressViewCart}></GuestAppBar>

            <Routes>
                <Route path='/login' element={<LogIn></LogIn>}></Route>
                <Route path="products" element={<AllProducts></AllProducts>}></Route>
                <Route path='register' element={<AddUser></AddUser>}></Route>
                <Route path='/productDisplay/:id' element={<SingleProduct></SingleProduct>}></Route>
                <Route path='cart' element={<ViewCart></ViewCart>}></Route>
                <Route path='about' element={<About></About>}></Route>
            </Routes>
        </div>
    )
}