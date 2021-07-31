import React, { useRef, useEffect } from 'react';

const PaypalC = () => {

    const paypal = useRef();

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [{
                        description: "Description",
                        amount: {
                            currency_code: "USD",
                            value: 1.00
                        }
                    }] 
                })
            }
        }).render(paypal.current)
    }, [])
    
    return(
        <div>
            <div ref={paypal}></div>
        </div>
    )
}

export default PaypalC;