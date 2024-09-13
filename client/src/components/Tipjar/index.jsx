import React, {useState, useEffect} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const stripePromise = loadStripe('') //?Requires publishable API key

export default function Tip() {
    const [clientSecret, setClientSecret] = useState("");
    const [dpmCheckerLink, setdpmCheckerLink] = useState("");

    useEffect(() => {
        fetch('/create-payment-intent', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({tipAmount}), //Insert input for form tipAmount
        })
        .then((res) => res.json())
        .then((data) => {
            setClientSecret(data.clientSecret);
            setdpmCheckerLink(data.dpmCheckerLink);
        });
    }, []);

    // const appearance = {
    //     theme: 'stripe',
    //   };
    //   const options = {
    //     clientSecret,
    //     appearance,
    //   }; //? Are appearance and clientSecret important?

    return (
        <Router>
          <div className="App">
            {clientSecret && ( //? Again, are options important?
              <Elements options={options} stripe={stripePromise}>
                <Routes>
                  <Route path="/checkout" element={<CheckoutForm dpmCheckerLink={dpmCheckerLink}/>} />
                  <Route path="/complete" element={<CompletePage />} />
                </Routes>
              </Elements>
            )}
          </div>
        </Router>
      );
};


//*Server side code
// app.post("/create-payment-intent", async (req, res) =>{

//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: tipAmount,
//         currency: "usd",
//         automatic_payment_methods: {
//             enabled: true,
//         },
//     }); 
    
//     res.send({
//         clientSecret: paymentIntent.client_secret,
//         dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
//     });
// });