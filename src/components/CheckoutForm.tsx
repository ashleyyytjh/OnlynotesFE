'use client'
import React, { useState, useEffect } from "react";
import {
    LinkAuthenticationElement,
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import {StripePaymentElementOptions} from "@stripe/stripe-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import EconIcon from '../assets/econs.png'
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getNotesById } from "@/services/NotesService";
import Loader from "./Loader";
import { convertCentsToDollar } from "@/util/util";
import { randomImg } from "@/assets/randomImg";
interface Props {
    clientSecret: string
}

const CheckoutForm: React.FC<Props> = (props: Props) => {

    const [search]= useSearchParams();
    const itemId = search.get('id');
    console.log(itemId)
    const {data, isLoading, error} = useQuery({
        queryKey: ['noteItem'],
        queryFn: () => getNotesById(`${itemId}`)
    })
    
    if (isLoading) {
        return <Loader/>
    }
    const item = data?.response
    const stripe = useStripe();
    const elements = useElements();
    // const [email, setEmail] = useState("");
    const [message, setMessage] = useState<string>("");
    const returnUrl = import.meta.env.VITE_WEBSITE_URL;
    const [isStripeLoading, setIsStripeLoading] = useState(false);
    const clientSecret= props.clientSecret;
    // const route = useRouter();

    useEffect(() => {
        if (!stripe) {
            return;
        }
        if (!clientSecret) {
            return;
        }
        //error handling for start of page, we check if clientsecret is legit or if payment has already been made
        stripe.retrievePaymentIntent(clientSecret).then((paymentIntent) => {
            if (paymentIntent.error || paymentIntent.paymentIntent?.status == "succeeded" || paymentIntent.paymentIntent?.status == "canceled") {
                // route.push('/error');
            }
        });
    }, [stripe]);

    const cancelButton = () => {
        // stripe!.retrievePaymentIntent(`clientSecret`).then((paymentIntent) => {
        //   paymentIntent!@.paymentIntent.cancel();
        // })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setIsStripeLoading(true);

        const returnURL =`${returnUrl}/successful-payment`;

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                //success URL
                return_url:returnURL,
            },
        });
        if (error) {
            setMessage(error.message || "An unexpected error occurred.");
        }
        setIsStripeLoading(false);
    };



    const paymentElementOptions: StripePaymentElementOptions = {
        layout: 'tabs'
    };


    return (
        <div className="flex flex-row justify-around ">
              <Card className="w-1/3">
                    <CardHeader>
                    <CardTitle className="text-2xl">Order Summary</CardTitle>
                    <CardDescription>Review your order before payment</CardDescription>
                    </CardHeader>
                    <CardContent className="">
                    <img
                        src={randomImg[Math.floor(Math.random() * randomImg.length)]}
                        alt="Preview Of Notes"
                        className="w-96 h-auto rounded-lg shadow-lg"
                        />
                    <div className="flex justify-between items-center pt-10">
                        <span className="font-medium">{item.title}</span>
                        <span>${convertCentsToDollar(item.price)}</span>
                    </div>
                    <span className="font-base">{item.description}</span>

                    <Separator />
                    <div className="flex justify-between items-center font-bold ">
                        <span>Total</span>
                        <span>${convertCentsToDollar(item.price)}</span>
                    </div>
                    </CardContent>
                </Card>
            <form id="payment-form" onSubmit={handleSubmit} className="pl-4 w-1/2">
                <div className="flex flex-row w-3/4">
                    <div className="w-full">
                        <div className="pb-2">
                            <LinkAuthenticationElement id="link-authentication-element" />
                        </div>
                        <PaymentElement id="payment-element" options={paymentElementOptions} />

                        <div className="mt-2 flex justify-between">
                            <button
                                disabled={isLoading || !stripe || !elements}
                                id="submit"
                                type="submit"
                                className={`px-4 py-2 text-white font-bold rounded ${
                                    isLoading || !stripe || !elements ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                            >
                                Pay
                            </button>

                            <button
                                disabled={isLoading || !stripe || !elements}
                                className={`px-4 py-2 text-white font-bold rounded bg-red-500 hover:bg-red-600 ${
                                    isLoading || !stripe || !elements ? 'cursor-not-allowed opacity-50' : ''
                                }`}
                                onClick={cancelButton}
                            >
                                Cancel
                            </button>
                        </div>

                        {/* Show any error or success messages */}
                        {message && <div id="payment-message" className="mt-2 text-red-500">{message}</div>}
                    </div>
                </div>
            </form>
        </div>
      
    );
}


export default CheckoutForm;