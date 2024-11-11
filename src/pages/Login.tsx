import { Button } from '@/components/ui/button'
const Login = () => {
    const handleRedirect = () => {
        console.log('redirecting');
        window.location.href = import.meta.env.VITE_COGNITO_URL // Redirect to external page
    }
    return (

        <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Welcome to OnlyNotes</h1>
        <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
          Get started by logging in to your account and explore our amazing features.
        </p>
        <Button color={'primary'} onClick={handleRedirect}>
            Login
        </Button>
      </div>
    </div>
       
    )
}

export default Login
