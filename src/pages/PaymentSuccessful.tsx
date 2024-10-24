import { Check, Download, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

const PaymentSuccessful = () => {
    const navigate = useNavigate()
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-gray-600">Thank you for your purchase. Your order will be processed.</p>
        <p className="text-gray-600">Check your orders to see the status</p>
        <Button className="mt-4" onClick={() => navigate('/account-settings/orders')}> Go to Orders </Button>

      </div>

      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">What's Next?</h2>
        <Card>
          <CardHeader>
            <CardTitle>Study Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Your purchased study notes will be emailed to you. You can access them anytime.</p>
          </CardContent>
        </Card>
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
        <p className="text-gray-600">A confirmation email has been sent to your registered email address.</p>
        <Button variant="link" className="mt-2" onClick={() => {navigate('/home')}}>
          Return to Homepage
        </Button>
      </div>
    </div>
  )
}

export default PaymentSuccessful