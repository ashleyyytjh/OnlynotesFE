import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import BannerIcon from '../assets/educator.svg'
import OnlyNotesIcon from '../assets/logodark.png'
import { Button } from './ui/button'
import { logout } from '@/services/AuthService'
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
    return (
        <header className="z-10 flex justify-between items-center h-16 p-5 shadow w-full">
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
            <div className="flex items-center space-x-4">
                <Input className="w-64" placeholder="Search" type="search" />
                <img
                    alt="Profile"
                    onClick={() => navigate('/account-settings#profile')}
                    className="rounded-full"
                    height="32"
                    src={BannerIcon}
                    style={{
                        aspectRatio: '32/32',
                        objectFit: 'cover',
                    }}
                    width="32"
                />
                <Button onClick={() => logOutHandler()}> Log out </Button>
            </div>
        </header>
    )
}
export default Header
