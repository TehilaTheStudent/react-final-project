import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getByIdProductApi } from '../../features/products/productsApi'
import { useNavigate, useParams } from 'react-router-dom'
import { addProductToCart, addProductsToCart } from '../../features/orders/ordersSlice'
import * as statuses from '../../features/statuses'
import OneProductShow from "./productComponents/ondeProductShow"
import SmallCart from '../orderScreens/smallCart'
import { ButtonContent, Button, Icon } from 'semantic-ui-react'
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
export default function SingleProduct() {

    const currentLoggedUser = useSelector(store => store.users.currentLoggedUser)
    const [product, setProduct] = useState(null)
    const [qty, setQty] = useState(1)
    const navigateFunc = useNavigate()
    const id = useParams().id
    const dispatchFunc = useDispatch()
    useEffect(
        () => {
            getProductById()
        }, [])

    const getProductById = async () => {
        const productById = await getByIdProductApi(id)
        setProduct(productById)
    }

    const goBack = () => {
        navigateFunc(-1)
    }
    const pressAdd = () => {
        dispatchFunc(addProductsToCart({ ...product, qty: qty }))
    }

    const pressUpdateExisting = () => {
        navigateFunc('/product/' + product.id)
    }
    return (<div className="divPink">
        <div style={{

            position: "fixed",
            top: "100px",
            zIndex: "2",
            right: "30px",
        }}>
            <Fab variant="extended" color="primary" onClick={goBack}>
              
                 חזור לעמוד הקודם  <NavigationIcon sx={{ mr: 1 }} />
            </Fab>
        </div>

        {product && <OneProductShow product={product} qty={qty} setQty={setQty} press={currentLoggedUser == statuses.manager ? pressUpdateExisting : pressAdd}></OneProductShow>}



    </div>)
}