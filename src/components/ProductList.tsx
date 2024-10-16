import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"

const ProductList = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <Button onClick={() => navigate('/create')}> Create Listing </Button>

        </div>
    )
}

export default ProductList