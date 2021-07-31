import React, { useState } from 'react';
import OrderSummaryC from './orderSummary';
import HeaderC from './header';
import FooterC from './footer';
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import CollectionAPI from '../apis/collectionAPI';
import Paypal from './paypalComponent';

const PaymentC = () => {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const {err, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if(!err){
            try{
                const {id} = paymentMethod;
                const response = await CollectionAPI.post(`/payment`, {
                    amount: 1000,
                    id: id
                });

                if(response.data.success){
                    console.log("Successful payment!");
                }
            }catch(err){
                console.log(err);
            }
        }else{
            console.log(err)
        }
    }

    const cardElementOptions = {
        style:{
            base:{
                fontFamily: 'Rajdhani'
            }
        },
        hidePostalCode: true
    }

    return(
        <div>
            <HeaderC/>
            <div className="main-body payment-div">
                <div className="payment-selection-div">
                    <div className="payment-info-div">
                        <div className="payment-info">
                            <p className="align-left">contact</p>
                            <p className="align-left">test@test.com</p>
                            <a className="align-right" href="/checkout"><p>change</p></a>
                        </div>
                        <hr className="payment-hr"/>
                        <div className="payment-info">
                            <p className="align-left">ship to</p>
                            <p className="align-left">100 sw 111 ave Atlanta GA 11111, United States</p>
                            <a className="align-right" href="/checkout"><p>change</p></a>
                        </div>
                        <hr className="payment-hr"/>
                        <div className="payment-info">
                            <p className="align-left">method</p>
                            <p className="align-left">first class (3-7 days) - $0.00</p>
                            <a className="align-right" href="/shipping"><p>change</p></a>
                        </div>
                    </div>

                    <div className="payment-method-selection-div">
                        <p>payment method</p>      
                            <div className="payment-options-div">
                                <div className="payment-option">
                                    <input className="align-left" type="radio" name="payment-method"/>
                                    <label className="align-left">Credit Card</label>
                                </div>
                                <div className="payment-info-input-div">
                                    <form className="credit-card-form" method="POST" onSubmit={handleSubmit}>
                                        <div className="grid payment-input">
                                            <CardElement className="cardElement" options={cardElementOptions}/>
                                        </div>
                                        <div className="grid payment-input">
                                            <input type="text" placeholder="name on card"/>
                                        </div>
                                        <div className="credit-card-option">
                                            <button className="payment-button" type="submit">continue to payment</button>
                                        </div>
                                    </form>
                                    <hr className="payment-hr"/>
                                    <div className="payment-option">
                                        <input className="align-left" type="radio" name="payment-method"/>
                                        <label className="align-left">PayPal</label>
                                        {/* <Paypal className="payment-button"/> */}
                                    </div>
                                    <hr className="payment-hr"/>
                                    <div className="payment-option">
                                        <input className="align-left" type="radio" name="payment-method"/>
                                        <label className="align-left">Amazon Pay</label>
                                    </div>
                                </div>
                            </div>

                    </div>
                </div>
                <div className="order-summary">
                    <div>
                        <OrderSummaryC/>
                    </div>
                    <hr className="checkout-hr"/>
                    <div className="two-column-div checkout-discount">
                        <input type="text" placeholder="discount code"/>
                        <button>apply</button>
                    </div>
                    <div className="two-column-div">
                        <p className="align-left">subtotal</p>
                        <p className="align-right">$0.00</p>
                    </div>
                    <div className="two-column-div">
                        <p className="align-left">payment</p>
                        <p className="align-right">$0.00</p>
                    </div>
                    <hr className="checkout-hr"/>
                    <div className="two-column-div">
                        <p className="align-left">total</p>
                        <p className="align-right">$0.00</p>
                    </div>
                </div>
            </div>
            <FooterC/>
        </div>
    )
}

export default PaymentC;