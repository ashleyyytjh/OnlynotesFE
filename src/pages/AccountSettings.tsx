import { logout } from '../services/AuthService.tsx'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Profile from '@/components/Profile.tsx'
import ProductList from '@/components/ProductList.tsx'
import OrderListingTable from '@/components/OrderListTable.tsx'

const AccountSettings = () => {
    const location = useLocation();
    const { list } = useParams();
    const component = () => {
        if (list === "profile") {
            return <Profile/>
        } else if (list === "product-listing") {
            return <ProductList/>
        } else if (list === "orders") {
            return <OrderListingTable/>
        } else {
            return <>Select a section to view.</>; 
        }
    }
    const navItems : string[] = [
        "Profile",
        "Product Listing",
        "Orders"
    ]
    const navigate = useNavigate();
    const changeSectionHandler = async (name:string) => {
        navigate(`/account-settings/${name.toLocaleLowerCase().replace(' ','-')}`)
    }
    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-gray-600 mb-8">
                Manage your account settings and set e-mail preferences.
            </p>

            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-1/4 border-r-2">
                    <nav className="space-y-1">
                        { navItems.map((item,index)=>(
                            <a 
                                key={index}
                                onClick = {()=>changeSectionHandler(item)}
                                className={`block px-4 py-2 ${list === item.toLocaleLowerCase().replace(' ','-') ? 'bg-gray-100' : ''} text-gray-900 rounded`}> {item} </a>
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
