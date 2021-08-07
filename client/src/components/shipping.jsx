import React, { useEffect, useState } from 'react';
import OrderSummaryC from './orderSummary';
import HeaderC from './header';
import FooterC from './footer';
import CollectionAPI from '../apis/collectionAPI';

const ShippingC = () => {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const cartResponse = await CollectionAPI.get(`/cart`);

                for(let i=0; i < cartResponse.data.data.cart.length; i++){
 
                    if(cartResponse.data.data.cart[i].imagekey !== null){
                        let imagesResponse = await CollectionAPI.get(`/images/${cartResponse.data.data.cart[i].imagekey}`, {
                            responseType: 'arraybuffer'
                        })
                        .then(response => Buffer.from(response.data, 'binary').toString('base64'));

                        cartResponse.data.data.cart[i].imageBuffer = imagesResponse;
                    }
                    
                }
                console.log(cartResponse.data.data.cart);
                setCart(cartResponse.data.data.cart);
            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    }, []);

    return(
        <div>
            <HeaderC/>
            <div className="main-body shipping-div">
                <div className="shipping-selection-div">
                    <div className="shipping-info-div">
                        <div className="shipping-info">
                            <p className="align-left">contact</p>
                            <p className="align-left">test@test.com</p>
                            <a className="align-right" href=""><p>change</p></a>
                        </div>
                        <hr className="shipping-hr"/>
                        <div className="shipping-info">
                            <p className="align-left">ship to</p>
                            <p className="align-left">100 sw 111 ave Atlanta GA 11111, United States</p>
                            <a className="align-right" href=""><p>change</p></a>
                        </div>
                    </div>

                    <div className="shipping-method-selection-div">
                        <p>shipping method</p>
                        <div className="shipping-options-div">
                            <div className="shipping-option">
                                <input className="align-left" type="radio" name="shipping-method"/>
                                <label className="align-left">first class (3-7 business days)</label>
                                <p className="align-right">$0.00</p>
                            </div>
                            <hr className="shipping-hr"/>
                            <div className="shipping-option">
                                <input className="align-left" type="radio" name="shipping-method"/>
                                <label className="align-left">priority mail (1-3 business days)</label>
                                <p className="align-right">$0.00</p>
                            </div>
                        </div>
                    </div>
                    <div className="two-column-div shipping-button">
                        <a href="/payment"><button>continue to payment</button></a>
                        <a href="/checkout"><p>return to information</p></a>
                    </div>
                </div>
                <div className="order-summary">
                    <div>
                        <OrderSummaryC cartCollection={cart}/>
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
                        <p className="align-left">shipping</p>
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

export default ShippingC;