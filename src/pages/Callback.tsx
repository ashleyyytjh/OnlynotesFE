import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { codeExchange } from '../services/AuthService'
import Home from './Home'
import { useEffect } from 'react'
import { getSession } from '@/services/UserService'
import { useDispatch } from 'react-redux'
import { logIn } from '@/redux/reducer/auth.reducer'

const Callback = () => {
    const [search, useSearch] = useSearchParams()
    const code = search.get('code') as string
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                await codeExchange(code)
                .then((response) => {
                    console.log(response.toString())
                })
                navigate ("/home")
            } catch (error) {
                window.location.href = import.meta.env.VITE_cognito_url;
            }
           
        }
        fetchData();
    })
 
    return <></>
}

export default Callback
