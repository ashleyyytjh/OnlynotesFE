import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import NoteListingTable from "./NoteListingtable";
import { useQuery } from "@tanstack/react-query";
import { Notes } from "@/types/types";
import { getNotesFromAccountId } from "@/services/NotesService";

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