import { Navigate, Outlet } from 'react-router-dom'
import { ReactNode, useEffect, useState } from 'react'
import { isAuthenticated } from '../services/AuthService.tsx'
import { useAppSelector } from '@/redux/hooks.ts'
import { authentication, logIn } from '@/redux/reducer/auth.reducer.ts'
import Loader from './Loader.tsx'
import { useDispatch } from 'react-redux'

const ProtectedRoute = () => {
    const isAuthenticated = useAppSelector(authentication).authenticated;
    const [loading, setLoading] = useState(true); // Add loading state
    const dispatch = useDispatch();

    const getCookie = async(name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts!.pop().split(';').shift();
        return null;
    }
    useEffect( () => {
        console.log('fetching authentication data')
        const fetchData = async () => {
            const myCookie = await getCookie('auth');
            if (myCookie === `true`) {
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
