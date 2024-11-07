import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { codeExchange } from '../services/AuthService'
// import Home from './Home'
import { useEffect } from 'react'


const Callback = () => {
    const [search, useSearch] = useSearchParams()
    const code = search.get('code') as string
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('code is ' , code);
                await codeExchange(code)
                .then((response) => {
                    console.log('response is ' , response.toString())
                })
                navigate ("/home");
            } catch (error) {
                console.log(error);
                // window.location.href = import.meta.env.VITE_COGNITO_URL;
            }
        }
        fetchData();
    })
 
    return <></>
}

export default Callback
