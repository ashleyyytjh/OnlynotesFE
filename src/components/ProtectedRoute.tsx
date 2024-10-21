import { Navigate, Outlet } from 'react-router-dom'
import { ReactNode, useEffect, useState } from 'react'
import { useAppSelector } from '@/redux/hooks.ts'
import { authentication, logIn, logout } from '@/redux/reducer/auth.reducer.ts'
import Loader from './Loader.tsx'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
    const [loading, setLoading] = useState(true); // Add loading state
    const dispatch = useDispatch();
    const [auth, setAuth] = useState<boolean>(true);
    useEffect( () => {
        const fetchData = async () => {
            const authValue = Cookies.get('auth');
            if (authValue !== `true`) {
                setAuth(false)
            }
        }
        fetchData();
        setLoading(false);
    },[])

    if (loading) {
        return <Loader/>
    }

 
    return auth ? <Outlet/> : <Navigate to="/login" replace />
}

export default ProtectedRoute
