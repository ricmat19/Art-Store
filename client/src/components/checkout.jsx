import React from 'react';

const CheckoutC = () => {

    return(
        <div className="main-body checkout-div">
            <form className="checkout-info" method="POST" action="/shipping">
                <p className="title">express checkout</p>
                <div className="express-checkout-button-div">
                    <button>PayPal</button>
                </div>
                <hr className="checkout-hr"/>
                <p className="title">checkout</p>
                <div>
                    <div className="grid">
                        <div className="checkout-email-div">
                            <input type="email" placeholder="email"/>
                        </div>
                        <div className="two-column-div">
                            <input type="text" placeholder="first name"/>
                            <input type="text" placeholder="last name"/>
                        </div>
                        <div className="checkout-address-div">
                            <input type="text" placeholder="address"/>
                        </div>
                        <div className="checkout-suite-div">
                            <input type="text" placeholder="apartment, suite, etc. (optional)"/>
                        </div>
                        <div className="three-column-div">
                            <input type="text" placeholder="city"/>
                            <select>
                                <option>Alabama</option>
                                <option>Alaska</option>
                                <option>Arizona</option>
                                <option>Arkansas</option>
                                <option>California</option>
                                <option>Colorado</option>
                                <option>Connecticut</option>
                                <option>Delaware</option>
                                <option>Florida</option>
                                <option>Georgia</option>
                                <option>Hawaii</option>
                                <option>Idaho</option>
                                <option>Illinois</option>
                                <option>Indiana</option>
                                <option>Iowa</option>
                                <option>Kansas</option>
                                <option>Kentucky</option>
                                <option>Louisiana</option>
                                <option>Maine</option>
                                <option>Maryland</option>
                                <option>Massachusetts</option>
                                <option>Michigan</option>
                                <option>Minnesota</option>
                                <option>Mississippi</option>
                                <option>Missouri</option>
                                <option>Montana</option>
                                <option>Nebraska</option>
                                <option>Nevada</option>
                                <option>New Hampshire</option>
                                <option>New Jersey</option>
                                <option>New Mexico</option>
                                <option>New York</option>
                                <option>North Carolina</option>
                                <option>North Dakota</option>
                                <option>Ohio</option>
                                <option>Oklahoma</option>
                                <option>Oregon</option>
                                <option>Pennsylvania</option>
                                <option>Rhode Island</option>
                                <option>South Carolina</option>
                                <option>South Dakota</option>
                                <option>Tennessee</option>
                                <option>Texas</option>
                                <option>Utah</option>
                                <option>Vermont</option>
                                <option>Virginia</option>
                                <option>Washington</option>
                                <option>West Virginia</option>
                                <option>Wisconsin</option>
                                <option>Wyoming</option>
                            </select>
                            <input type="number" placeholder="ZIP code"/>
                        </div>
                        <div className="checkout-phone-div">
                            <input type="tel" placeholder="phone (optional)"/>
                        </div>
                        <div className="two-column-div">
                            <button><a href="/shipping">continue to shipping</a></button>
                            <a href="/cart"><p>return to cart</p></a>
                        </div>
                    </div>
                </div>
            </form>
            <div className="order-summary">
                <div>
                    {/* <OrderSummaryC/> */}
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
    )
}

export default CheckoutC;