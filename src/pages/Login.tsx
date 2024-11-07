import { Button } from '@/components/ui/button'
const Login = () => {
    const handleRedirect = () => {
        console.log('redirecting');
        window.location.href = import.meta.env.VITE_COGNITO_URL // Redirect to external page
    }
    return (
        <Button color={'primary'} onClick={handleRedirect}>
            Login
        </Button>
    )
}

export default Login
