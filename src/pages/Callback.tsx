import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { codeExchange } from '../services/AuthService'
import Home from './Home'
import { useEffect } from 'react'

const Callback = () => {
    const [search, useSearch] = useSearchParams()
    const code = search.get('code') as string
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                codeExchange(code)
                .then((response) => {
                    console.log(response.toString())
                    navigate('/home')
                })
            } catch (error) {
                navigate(import.meta.env.VITE_cognito_url);

            }
           
        }
        fetchData();
    })
 
    return <></>
}

export default Callback
