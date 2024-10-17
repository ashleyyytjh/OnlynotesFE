import getStripe from '../util/stripe.ts'
import { Elements } from '@stripe/react-stripe-js'
import useFetchData from "../hooks/useFetchData.tsx";
import { createOrder, orderWebhook } from '../services/OrdersService.tsx'
import CheckoutForm from '@/components/CheckoutForm.tsx';
import Loader from '@/components/Loader.tsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const tempOrder = {
    noteId: '1',
    buyerId: '1',
    orderPrice: 50000,
}
const Payment = () => {
    const stripePromise = getStripe()
    const navigate = useNavigate()
    const [isWebhookLoading, setIsWebhookLoading] = useState(true);
    const [cs, setCs] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            await createOrder(tempOrder).then((data) => {
                if (data.status === 200) {
                    const handleMessage = (data : any) => {
                        if (data.error) {
                            navigate('/unsuccessful-payment')
                        } else {
                            setCs(data)
                            setIsWebhookLoading(false)
                        }
                    };
                    // Call the orderWebhook function
                    const socket = orderWebhook(data.order._id, handleMessage);

                    // Clean up the socket connection on component unmount
                    return () => {
                        socket.close();
                    };
                }
            })
        }
       fetchData()
    }, []);
    const appearance = {
        theme: 'flat',
        labels: 'floating',
    }

    const options = {
              clientSecret: cs,
              appearance,
          }


    if (isWebhookLoading) {
        return  (
            <div className='pt-10 flex flex-col justify-center items-center'>
                <Loader/>
                <p className='font-bold pt-16 text-2xl'>Hold on! Placing orders</p>
            </div>
        )
    }
    console.log('FRONTNED CLIENT SECRET', cs)

    return (
        <div >
            <div className='h-fit' >
                {/*@ts-ignore*/}
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm
                        clientSecret = {cs}
                    />
                </Elements>
            </div>
        </div>
    )
}

export default Payment
