import {Container} from "@mui/material";
import {useParams} from "react-router-dom";



const Products = () => {
    const {list} = useParams();
    const ProductComponentHandler = () => {
        if (list === 'product-listing') {
            return <></>
        } else if (list === 'product-review') {
            return <></>
        } else {
            return <></>
        }
    }

    return (
        <></>
        // <Container sx={{outline:'1px'}}> {ProductComponentHandler()} </Container>
    )
}

export default Products;
