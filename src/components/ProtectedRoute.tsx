import { Navigate } from 'react-router-dom'
import { ReactNode, useEffect, useState } from 'react'
import { isAuthenticated } from '../services/AuthService.tsx'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<boolean>(true)
    // useEffect( () => {
    //     console.log('fetching authentication data')
    //     const fetchData = async () => {
    //         await isAuthenticated().then((data) => {
    //             console.log(data);
    //             setAuth(data);
    //         })
    //     }
    //     fetchData();
    // },[])
    return auth ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
