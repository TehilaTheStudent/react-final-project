import { useDispatch, useSelector } from "react-redux"
import { getAllOrders } from '../../features/orders/ordersSlice'
import { useEffect, useState } from "react"
import { postOrder, subtractProductQty, addProductQty, removeProductFromCart } from '../../features/orders/ordersSlice'
import * as statuses from '../../features/statuses'
import { useNavigate } from 'react-router-dom'
import * as functions from '../../functions/functions'


export default function ViewCart() {

    const dispatchFunc = useDispatch()
    const cart = useSelector(store => store.orders.cart)
    const cartSum = useSelector(store => store.orders.cartSum)
    const currentLoggedUser = useSelector(store => store.users.currentLoggedUser)
    const navigateFunc = useNavigate()
    const subtrctQty = (id) => {
        dispatchFunc(subtractProductQty(id))
    }
    const addQty = (id) => {
        dispatchFunc(addProductQty(id))
    }
    const removeProduct = (id) => {
        dispatchFunc(removeProductFromCart(id))
    }
    const pressMakeOrder = () => {
        navigateFunc('/makeOrder')
    }
    const pressRegister=()=>{
        navigateFunc('/register')
    }
    return (<div className="divPink overflow">
                <h1 style={{textAlign:"center"}}>צפייה בעגלה</h1>

        <p>this is the view cart page, count {cart.length}</p>
        {cart.length > 0 ? <>
            <p>all cart sum: {cartSum}</p>
            <p>{functions.countQtyInCart(cart)} is the qty of all the products in cart</p>
            {currentLoggedUser.id ? <button onClick={pressMakeOrder}>make the order! and pay us money!!💰💰💰</button> :
                <button onClick={pressRegister}>register before making the order</button>}</> :
            <p>your cart is empty🥹</p>}

        {cart && cart.map((item, index) => {
            return <div key={index} className="thinBorder"><pre >{JSON.stringify(item, null, 2)}</pre>
                <button onClick={() => { subtrctQty(item.id) }}>-</button>
                <button onClick={() => { addQty(item.id) }}>+</button>
                <button onClick={() => { removeProduct(item.id) }}>🚮</button></div>
        })}
    </div>)
}