import React from 'react';

const ShippingC = () => {

    return(
        <div className="main-body shipping-div">
            <div>
                <div className="shipping-info-div">
                    <div className="email-div">
                    </div>
                    <div className="shipping-address-div">
                    </div>
                </div>
                <div className="shipping-method-selection-div">
                    <p>shipping method</p>
                    <div>
                        <div className="three-column-div">
                            <input type="radio" name="shipping-method"/>
                            <label>first class (3-7 business days)</label>
                            <p>$0.00</p>
                        </div>
                        <div className="three-column-div">
                            <input type="radio" name="shipping-method"/>
                            <label>priority mail (1-3 business days)</label>
                            <p>$0.00</p>
                        </div>
                    </div>
                </div>
                <div className="two-column-div">
                    <a href="/payment"><button>continue to payment</button></a>
                    <a href="/checkout"><p>return to information</p></a>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default ShippingC;