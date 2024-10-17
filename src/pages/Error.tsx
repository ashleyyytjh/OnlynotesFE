import { Check, Download, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

const Error = () => {
    const navigate = useNavigate()
  return (
    <div>
      Error 404
    </div>
  )
}

export default Error