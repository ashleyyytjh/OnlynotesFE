import { Check, Download, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

const PaymentUnsuccessful = () => {
    const navigate = useNavigate()
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600 mb-4">
          <X className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Payment Error</h1>
        <p className="text-gray-600">Something went wrong while processing your purchase</p>
        <p className="text-gray-600">Please try again</p>
        <Button className="mt-4" onClick={() => navigate('/home')}> Go to back to home </Button>

      </div>

      <div className="mt-8 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p>If you have any questions about your order or need assistance, our support team is here to help.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Contact Support</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Button variant="link" className="mt-2" onClick={() => {navigate('/home')}}>
          Return to Homepage
        </Button>
      </div>
    </div>
  )
}

export default PaymentUnsuccessful