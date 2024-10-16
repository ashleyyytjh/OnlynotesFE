import getStripe from "../util/stripe.ts";
import { Elements } from "@stripe/react-stripe-js";
// import useFetchData from "../hooks/useFetchData.tsx";
import {createOrder} from "../services/OrdersService.tsx";

const tempOrder = {
    noteId: "1",
    buyerId: "1",
    orderPrice: 50000
}
const Payment = () => {
    const stripePromise = getStripe();
    // const search = useSearchParams();

    // const {data, loading, error} = useFetchData(()=>createOrder(tempOrder));
    // console.log('data is' , data);
    const appearance = {
        theme: 'night',
        labels: 'floating',
    };

    let clientSecret: string | undefined;
    if (data && typeof data === 'object' && 'client_secret' in data) {
        clientSecret = (data as Record<string, unknown>)['client_secret'] as string;
    }
    const options = data ? {
        clientSecret: clientSecret,
        appearance,
    } : {};

    if (loading) {
        // return <CircularProgress/>
    }

    if (error) {
        return <>ERROR loading Data...</>
    }

    return (
        <></>
        // <Container
        //     maxWidth="xl"
        //     sx={{ width: '100vw' }}
        // >
        //     <Paper>
        //         <Box style={{ border: '2px solid white' , padding:20}} // Adjust thickness and color as needed
        //              height={'fit'} width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'} >
        //             {/*@ts-ignore*/}
        //             <Elements options={options} stripe={stripePromise}>
        //                 <CheckoutForm
        //                     clientSecret = {clientSecret!}
        //                 />
        //             </Elements>
        //         </Box>
        //     </Paper>
        // </Container>

    );
}

export default Payment