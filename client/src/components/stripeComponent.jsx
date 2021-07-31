import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import PaymentC from "./payment";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPEPUBLIC);

const StripeC = () => {

    return(
        <Elements stripe={stripePromise}>
            <PaymentC/>
        </Elements>
    )
}

export default StripeC;