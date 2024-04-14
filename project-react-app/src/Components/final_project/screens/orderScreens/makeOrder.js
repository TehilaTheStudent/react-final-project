import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react'
import { getAllOrders, postOrder } from '../../features/orders/ordersSlice'
import { useNavigate } from "react-router-dom";
import * as functions from '../../functions/functions'
export default function MakeOrder() {
    const currentLoggedUser = useSelector(store => store.users.currentLoggedUser)
    const cart = useSelector(store => store.orders.cart)
    const cartSum = useSelector(store => store.orders.cartSum)
    const dispatchFunc = useDispatch()
    const navigateFunc = useNavigate()
    
    const formatDate = (date) => {
        const formattedDate = date.replaceAll('.','-')
        return formattedDate
    }

    const [newOrder, setNewOrder] = useState({
        userId: currentLoggedUser.id, orderDate: formatDate(new Date().toLocaleDateString()), dueDate: getFutureDate(10), city: currentLoggedUser.city, street: currentLoggedUser.street, houseNumber: currentLoggedUser.houseNumber
    })

    function getFutureDate(daysToAdd) {
        const today = new Date();
        today.setDate(today.getDate() + daysToAdd); // Add the specified number of days
        return today.toLocaleDateString().replaceAll('.','-'); // Format the date according to user's locale
    }
    //TODO product with format date


    const makeOrder = () => {
        dispatchFunc(postOrder(newOrder))
        dispatchFunc(getAllOrders())
        // alert('order made succesfully!')
        navigateFunc('/orders')
    }

    const pressCancel=()=>{

        navigateFunc('/products')
    }
    return <div className="divPink">
        <h1 style={{textAlign:"center"}}>עשיית הזמנה</h1>

        <p>orderDate: {newOrder.orderDate} dueDate: {newOrder.dueDate} (in 10 days)</p>
        <p>sum to pay: {cartSum}</p>
        <p>{functions.countQtyInCart(cart)} is the qty of all the products in order</p>
        <p>destination:</p>
        <p><label>city</label><input type="text" value={newOrder.city} onChange={(e) => { setNewOrder({ ...newOrder, city: e.target.value }) }}></input></p>
        <p><label>street</label><input type="text" value={newOrder.street} onChange={(e) => { setNewOrder({ ...newOrder, street: e.target.value }) }}></input></p>
        <p><label>houseNumber</label><input type="text" value={newOrder.houseNumber} onChange={(e) => { setNewOrder({ ...newOrder, houseNumber: e.target.value }) }}></input></p>

        <button onClick={makeOrder}>pay!</button><button onClick={pressCancel}>dont order now, continue to fill the cart</button>
    </div>
}