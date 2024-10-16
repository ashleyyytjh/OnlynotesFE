import { getSession } from '../services/UserService.tsx'
import { useEffect, useState } from 'react'

import { logout } from '../services/AuthService.tsx'


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useLocation } from 'react-router-dom'
import Profile from '@/components/Profile.tsx'
import ProductList from '@/components/ProductList.tsx'

const logoutHandle = async () => {
    logout().then(() => {
        window.location.href = import.meta.env.VITE_cognito_logout_url
        return
    })
}

const AccountSettings = () => {
    const [user, setUser] = useState({ username: '', email: '' })
    const location = useLocation();
    const hash = location.hash.substring(1);

    useEffect(() => {
        getSession().then((data) => {
            console.log(data)
            setUser(data)
        })

    
    }, [])

    const component = () => {
        if (hash === "profile") {
            return <Profile/>
        } else if (hash === "product-listing") {
            return <ProductList/>
        } else if (hash === "orders") {
            return <>orders</>
        } else {
            return <>Select a section to view.</>; 
        }
    }
    const navItems : string[] = [
        "Profile",
        "Product Listing",
        "Orders"
    ]
    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-gray-600 mb-8">
                Manage your account settings and set e-mail preferences.
            </p>

            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-1/4 border-r-2">
                    <nav className="space-y-1">
                        { navItems.map((item)=>(
                                <a href={`#${item.toLocaleLowerCase().replace(' ','-')}`} className={`block px-4 py-2 ${hash === item.toLocaleLowerCase().replace(' ','-') ? 'bg-gray-100' : ''} text-gray-900 rounded`}> {item} </a>
                            ))
                        }                    
                    </nav>
                </aside>
                <div className="w-full md:w-3/4">
                    {component()}
                </div>
               
            </div>
        </div>
    )
}

export default AccountSettings
