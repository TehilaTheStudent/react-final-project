import { useDispatch, useSelector } from "react-redux"
import * as statuses from '../../features/statuses'
import { getAllOrders } from '../../features/orders/ordersSlice'
import { useEffect, useRef, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { compareDates, afterToday,countQtyInCart } from '../../functions/functions'

export default function AllOrders() {
    const dispatchFunc = useDispatch()
    const arrOrders = useSelector(store => store.orders.arrOrders)
    const getAllStatus = useSelector(store => store.orders.getAllStatus)
    const currentLoggedUser = useSelector(store => store.users.currentLoggedUser)
    const scrollDemoRef = useRef(null);
    const [showSorted, setShowSorted] = useState(false)
    const [sortedOrders, setSortedOrders] = useState(arrOrders)
    const navigateFunc = useNavigate()
    useEffect(() => {
        invokeGetAll()
    }, [])
    const invokeGetAll = () => {
        if (getAllStatus != statuses.fulfilled) {
            console.log("get all orders🛒")
            dispatchFunc(getAllOrders())
        }
    }
    // Restore scroll position on component mount
    useEffect(() => {
        const scrollPositionOrders = sessionStorage.getItem('scrollPositionOrders');
        if (scrollDemoRef.current && scrollPositionOrders) {
            // console.log(scrollPositionOrders)
            scrollDemoRef.current.scrollTo(0, parseInt(scrollPositionOrders, 10));

        }
    }, []);

    // Save scroll position when navigating away from Page1
    const handleNavigation = () => {
        if (scrollDemoRef.current) {
            const scrollPositionOrders = scrollDemoRef.current.scrollTop;
            sessionStorage.setItem('scrollPositionOrders', scrollPositionOrders);
        }
    };

    const pressDisplay = (id) => {
        handleNavigation()
        navigateFunc('/orderDisplay/' + id)
    }
    // const pressSortByDate=()=>{
    //     const sorted=[...arrOrders]
    //       sorted.sort((orderA,orderB)=>compareDates(orderA.orderDate,orderB.orderDate))
    //     setSortedOrders(sorted )
    //     setShowSorted(true)
    //} 
    const pressSortByCartSize = () => {
        const sorted = [...arrOrders]
        sorted.sort((orderA, orderB) => countQtyInCart(orderA.cart) -countQtyInCart( orderB.cart.length))
        setSortedOrders(sorted)
        setShowSorted(true)
    }
    const pressSortBySum = () => {
        const sorted = [...arrOrders]
        sorted.sort((orderA, orderB) => { return orderA.orderSum - orderB.orderSum })
        setSortedOrders(sorted)
        setShowSorted(true)
    }
    const pressUnsort = () => {

        setShowSorted(false)
    }
    return (<div className="divPink overflow" ref={scrollDemoRef}>
        <h1 style={{textAlign:"center"}}>דף הזמנות</h1>
        {arrOrders.length > 0 && <><button onClick={pressSortByCartSize}>sort be cart size</button>
            <button onClick={pressSortBySum}>sort by sum</button>

            {showSorted && <button onClick={pressUnsort}>unsort</button>} </>}
            {showSorted&&<p>{sortedOrders.length} results</p>}
        {currentLoggedUser == statuses.manager ? <p>dear manager, this is the allOrders page, count {arrOrders.length}</p> :
            <p>dear {currentLoggedUser.name} this is the allOrders (your orders ) page, count {arrOrders.filter(item => item.userId == currentLoggedUser.id).length}</p>
        }
       
        //TODO sort by date (arrived or not)

        {!showSorted && arrOrders && arrOrders.map((item, index) => 
           
                (currentLoggedUser == statuses.manager || currentLoggedUser.id == item.userId)&&
                <div key={index} className='thinBorder'>
                    <pre >{JSON.stringify(item, null, 2)}</pre>
                    {!afterToday(item.dueDate)&&<p className="pRed">user got the order already</p>}
                    <button onClick={() => { pressDisplay(item.id) }}>display order</button>
                </div>
           
        )}


        {showSorted && sortedOrders && sortedOrders.map((item, index) => {
            {
                if (currentLoggedUser == statuses.manager || currentLoggedUser.id == item.userId) return <div key={index} className='thinBorder'><pre >{JSON.stringify(item, null, 2)}</pre>
                    {/* {afterToday(item.dueDate)&&<p className="pRed">user got the order already</p>} */}
                    <button onClick={() => { pressDisplay(item.id) }}>display order</button></div>
            }
        })}
    </div>)
}