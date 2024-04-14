import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getByIdOrderApi } from '../../features/orders/ordersApi'
import { deleteOrder, getAllOrders } from '../../features/orders/ordersSlice'
import { useEffect, useState } from "react"
import * as statuses from '../../features/statuses'
import {afterToday} from '../../functions/functions'
import * as functions from '../../functions/functions'

export default function SingleOrder() {
    const [order, setOrder] = useState(null)
    const id = useParams().id
    const navigateFunc = useNavigate()
    const currentLoggedUser = useSelector(store => store.users.currentLoggedUser)
    const dispatchFunc = useDispatch()

    useEffect(() => {
        getByIdOrder()
    }, [])

    const getByIdOrder = async () => {
        const orderById = await getByIdOrderApi(id)
        setOrder(orderById)
    }
    const goBack = () => {
        navigateFunc(-1)
    }
   
    const pressDelete = () => {
        dispatchFunc(deleteOrder(order.id))
        dispatchFunc(getAllOrders())
        navigateFunc(-1)
    }

    return (<div className="divPink">
        <h1 style={{textAlign:"center"}}>פרטי הזמנה אחת</h1>

        <button onClick={() => { goBack() }}>go back⬆️</button>
        {order&&<p>{functions.countQtyInCart(order.cart)} is the qty of all the products in order</p>}
        {order&&!functions.afterToday(order.dueDate)&&<p>order arrived already</p>}
        {order&& currentLoggedUser != statuses.manager && afterToday(order.dueDate) && <button onClick={pressDelete}>cancel order</button>}
        <pre >
            {JSON.stringify(order, null, 2)}
        </pre>
    </div>)
}