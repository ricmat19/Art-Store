import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import PaymentC from "./payment";

//insures that the .env file is only run in a development environment and not a production environment
if(process.env.NODE_ENV !== 'production'){
    //requires the the .env file configuration be run first hiding all info hidden via the .env file
    require('dotenv').config();
}

const stripePromise = loadStripe(process.env.STRIPEPUBLIC);

const StripeC = () => {

    return(
        <Elements stripe={stripePromise}>
            <PaymentC/>
        </Elements>
    )
}

export default StripeC;