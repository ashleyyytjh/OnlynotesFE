import { Navigate, Outlet } from 'react-router-dom'
import { ReactNode, useEffect, useState } from 'react'
import { useAppSelector } from '@/redux/hooks.ts'
import { authentication, logIn } from '@/redux/reducer/auth.reducer.ts'
import Loader from './Loader.tsx'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
    const isAuthenticated = useAppSelector(authentication).authenticated;
    const [loading, setLoading] = useState(true); // Add loading state
    const dispatch = useDispatch();

    useEffect( () => {
        const fetchData = async () => {
            const authValue = Cookies.get('auth');
            if (authValue === `true`) {
                dispatch(logIn());
            }
        }
        fetchData();
        setLoading(false);
    },[])

    if (loading) {
        return <Loader/>
    }

 
    return isAuthenticated ? <Outlet/> : <Navigate to="/login" replace />
}

export default ProtectedRoute
