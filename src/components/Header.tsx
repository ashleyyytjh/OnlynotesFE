import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import BannerIcon from '../assets/educator.svg'
import OnlyNotesIcon from '../assets/logodark.png'
import { Button } from './ui/button'
import { logout } from '@/services/AuthService'
import { User, CircleUserRound } from 'lucide-react'

const headerItems : string[] = [
]
const Header = () => {
    const navigate = useNavigate()

    const logOutHandler =() => {
        try {
            logout()
            window.location.href = import.meta.env.VITE_cognito_logout_url;  // Redirect to external page
        } catch (error) {
            throw error;
        }
    }

    const goToMarket =() => {
        try {
           navigate('/market')
        } catch (error) {
            throw error;
        }
    }
    const goToSell =() => {
        try {
           navigate('/create')
        } catch (error) {
            throw error;
        }
    }
    return (
        <header className="z-10 flex justify-between items-center h-16 p-5 shadow w-full">
            <div className='flex items-center space-x-6'>
                <img
                    alt="Logo"
                    className=" w-32"
                    height="32"
                    src={OnlyNotesIcon}
                    onClick={() => navigate('/home')}
                    style={{
                        objectFit: 'cover',
                    }}
                    width="32"
                />
                <Input className="w-56" placeholder="Search" type="search" />
            </div>
     


            <div className="flex items-center space-x-4">
                <div>
                    <Button variant='ghost' onClick={() => goToMarket()}> Explore </Button>
                    <Button variant='ghost' onClick={() => goToSell()}> Sell </Button>
                </div>
                <CircleUserRound 
                    strokeWidth={1} 
                    className=' w-10  h-fit' 
                    onClick={() => navigate('/account-settings#profile')}
                />
                <Button variant='ghost' onClick={() => logOutHandler()}> Logout </Button>
            </div>
        </header>
    )
}
export default Header
