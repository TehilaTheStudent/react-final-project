import { BrowserRouter, Route, Routes, useNavigate, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import AllProducts from '../screens/productScreens/allProducts'
import ViewCart from "../screens/orderScreens/viewCart"
import MakeOrder from '../screens/orderScreens/makeOrder'
import AllOrders from '../screens/orderScreens/allOrders'
import { emptyCart } from '../features/orders/ordersSlice'
import { logout } from '../features/users/userSlice'
import { useEffect } from "react"
import SingleProduct from "../screens/productScreens/singleProduct"
import SingleOrder from "../screens/orderScreens/singleOrder"
import {resetSessionStorage} from '../functions/functions'
import UserAppBar from './navsComponents/userAppBar'
import About from "../screens/about"

export default function UserNav() {
    const navigateFunc = useNavigate()
    const dispatchFunc = useDispatch()
    const currentLoggedUser = useSelector(store => store.users.currentLoggedUser)
    const cart = useSelector(store => store.orders.cart)
    useEffect(() => {
        navigateFunc('/products')
    }, [])
    const pressAllProducts = () => {
        sessionStorage.setItem('scrollPositionOrders', 0);

        navigateFunc("/products")
    }
    const pressViewCart = () => {
        resetSessionStorage()
        navigateFunc("/cart")

    }
    const pressMyOrders = () => {
        sessionStorage.setItem('scrollPositionProducts', 0);
        navigateFunc("/orders")
    }
    const pressLogout = () => {
        console.log('l')
        resetSessionStorage()
        if (cart.length > 0) {
            const result = window.confirm("Are you sure you want to logout?\n you have in your cart " + cart.length + " products");
            if (result) {
                dispatchFunc(logout())
                dispatchFunc(emptyCart())
                navigateFunc('/products')
            } else {
            }
        }
        else{
            dispatchFunc(logout())
            navigateFunc('/products')
        }

    }
    const pressAbout=()=>{
        navigateFunc('/about')
    }
    return (
        <>
            <div className="divPink">
                {/* <p>my userNav component:</p>
                <p>the currentLoggedUser:😎 hello to {currentLoggedUser.name}</p> */}
                {/* <button onClick={pressAllProducts}>all products</button>
                <button onClick={pressMyOrders}>my orders</button>
                <button onClick={pressViewCart}>view cart🛒</button>
                <button onClick={pressLogout}>logout</button> */}
                <UserAppBar pressAbout={pressAbout}  pressAllProducts={pressAllProducts} pressLogout={pressLogout} pressMyOrders={pressMyOrders} pressViewCart={pressViewCart}></UserAppBar>

                <Routes>
                    <Route path="orders" element={<AllOrders></AllOrders>}></Route>
                    <Route path="products" element={<AllProducts></AllProducts>}></Route>
                    <Route path='makeOrder' element={<MakeOrder></MakeOrder>}></Route>
                    <Route path='cart' element={<ViewCart></ViewCart>}></Route>
                    <Route path='/productDisplay/:id' element={<SingleProduct></SingleProduct>}></Route>
                    <Route path='/orderDisplay/:id' element={<SingleOrder></SingleOrder>}></Route>
                    <Route path='about' element={<About></About>}></Route>

                </Routes>
            </div>
        </>
    )
}
