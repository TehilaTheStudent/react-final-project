import { useEffect, useState } from 'react'

import { getAllUserApi } from '../../features/users/usersApi'
export default function AllUsers() {
    const [allUsers, setAllUsers] = useState([])

    const getAllUsers = async () => {
        const response = await getAllUserApi();
        setAllUsers(response)
    }
    useEffect(() => {
            console.log('get all users👥')
            getAllUsers()       
    }, [])
    return <div className="divPink overflow">
                <h1 style={{textAlign:"center"}}>כל המשתמשים</h1>

        <p>AllUsers, count {allUsers.length}</p>
        {allUsers && allUsers.map((item, index) => {
            return <pre className='thinBorder' key={index}>{JSON.stringify(item, null, 2)}</pre>
        })}
    </div>
}