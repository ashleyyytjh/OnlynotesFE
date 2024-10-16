import {useNavigate, useSearchParams} from "react-router-dom";
import {codeExchange} from "../services/AuthService";
import Home from "./Home";

const Callback = () => {

    const [search, useSearch] = useSearchParams()
    const code = search.get('code') as string;
    const navigate = useNavigate();


    codeExchange(code).then((response) => {
        console.log(response.toString())
        return <Home/>
    }).catch(() => {
        // navigate(import.meta.env.VITE_cognito_url);
    })

    return <div>Callback</div>
}

export default Callback
