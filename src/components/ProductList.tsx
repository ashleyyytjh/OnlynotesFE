import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import NoteListingTable from "./NoteListingtable";

const ProductList = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <Button onClick={() => navigate('/create')}> Create Listing </Button>
            <NoteListingTable/>
        </div>
    )
}

export default ProductList