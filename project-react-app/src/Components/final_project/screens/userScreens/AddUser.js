import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { postUser } from '../../features/users/userSlice'
import { useNavigate } from "react-router-dom"
import SignUp from "./userComponents/SignUp"
export default function AddUser() {
    const dispatchFunc = useDispatch()
    const navigateFunc = useNavigate()
    const demoUser = {
        firstName: "תהילה",
        lastName: "אהרונוביץ",
        password: "1234",
        email: "hrwnwbyzt@gmail.com",
        city: 'בני ברק',
        street: 'הרב קוק',
        houseNumber: 24
    }
    const [newUser, setNewUser] = useState({
        firstName: "תהילה",
        lastName: "אהרונוביץ",
        password: "1234",
        email: "hrwnwbyzt@gmail.com",
        city: 'בני ברק',
        street: 'הרב קוק',
        houseNumber: 24
    })

    const register = () => {
        setTimeout(() => {
            dispatchFunc(postUser(newUser))
            navigateFunc("/products")
        }, 1500);

    }
    const login=()=>{
        navigateFunc("/login")
    }

    return <div className="divPink">
        <SignUp setNewUser={setNewUser} newUser={newUser} register={register} login={login}></SignUp>
    </div>
}  