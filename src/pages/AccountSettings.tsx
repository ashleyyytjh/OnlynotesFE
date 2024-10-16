import {getSession} from "../services/UserService.tsx";
import {useEffect, useState} from "react";

import {logout} from "../services/AuthService.tsx";


const logoutHandle = async () => {
    logout().then(() => {
        window.location.href = import.meta.env.VITE_cognito_logout_url
        return
    });
}


const AccountSettings = () => {

    const [user, setUser] = useState({ username: "", email: "" });

    useEffect(() => {
        getSession().then((data) => {
            console.log(data)
            setUser(data);
        });
    }, []);



    return (
        <div>
            <h1>Account Settings</h1>
            <h2>Username: {user.username}</h2>
            <h2>Email: {user.email}</h2>
            <button onClick={logoutHandle}>Logout</button>
        </div>
    )
}

export default AccountSettings