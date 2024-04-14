import { BrowserRouter, Route, Routes, useNavigate, Link } from "react-router-dom"
import LogIn from '../screens/userScreens/login'
import AllProducts from '../screens/productScreens/allProducts'
import AddUser from '../screens/userScreens/AddUser'
import GuestNav from './guestNav'
import UserNav from './userNav'
import ManagerNav from './managerNav'
import '../Styles/styles.css'
import { useSelector, useDispatch } from 'react-redux'
import { setStatus } from '../features/users/userSlice'
import Try from '../../tries/tryUploadImage'
import Try1 from "../../tries/try1"

export default function GeneralNav() {
    const dispatchFunc = useDispatch()
    const users = useSelector(store => store.users.loginStatus)


     const currentLoggedUser = useSelector(store => store.users.currentLoggedUser)
    return (
        <>
            <div className="divPink" style={{height:'100vh'}}>
                {/* <p>my NavBar component:</p> */}
                {/* <Try></Try> */}
                {/* <Try1></Try1> */}
                <BrowserRouter>

                    {currentLoggedUser == "guest" ? <GuestNav></GuestNav> : currentLoggedUser == "manager" ? <ManagerNav></ManagerNav> : <UserNav></UserNav>}
                </BrowserRouter>

                {/* <p>end of NavBar </p> */}
            </div>
        </>
    )
}



