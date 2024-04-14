//guest
import { useEffect, useState } from 'react'
import * as statuses from '../../features/statuses'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../../features/users/userSlice'
import LoginComponent from './userComponents/login'

export default function Login() {
  const dispatchFunc = useDispatch()
const [password,setPassword]=useState("as2345")

  const [logger, setLogger] = useState({
    password:"1234",
    email:'hrwnwbyzt@gmail.com'
  })
  const navigateFunc = useNavigate()
  const usersState = useSelector(store => store.users)


  // useEffect(() => {
  //   if (usersState.loginStatus == statuses.fulfilled) {
  //     navigateFunc('/products')
  //     alert("the if")
  //   }
  // }, [usersState.loginStatus]);//this ist happening due to changed navigate

  const login = () => {
    dispatchFunc(loginUser(logger))
    //here state not updated!
  }


  const register = () => {
    navigateFunc('/register')
  }
  return (
    <div className="divPink">

      <LoginComponent logger={logger} setLogger={setLogger} login={login} register={register}></LoginComponent>
     {usersState.loginStatus==statuses.rejected&&<p className='pRed'>error in login! bad password!</p>}

  
      <button onClick={()=>{dispatchFunc(loginUser({ password: "manager" }));navigateFunc("/products")}}>enter with password="manager"</button>
    </div>
  )
}