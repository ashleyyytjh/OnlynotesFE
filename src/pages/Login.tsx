import { Button } from '@/components/ui/button'
const Login = () => {
    const handleRedirect = () => {
        window.location.href = import.meta.env.VITE_cognito_url // Redirect to external page
    }
    return (
        <Button color={'primary'} onClick={handleRedirect}>
            Login
        </Button>
    )
}

export default Login
