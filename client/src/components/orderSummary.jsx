import React, { useEffect, useState } from 'react';

const OrderSummaryC = (props) => {

    const [cart, setCart] = useState([]);
    const [cartPrices, setCartPrices] = useState([]);
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                setCart(props.cartCollection);
                if(cartPrices.length === 0){
                    setCartPrices(props.cartPrices);
                }
                console.log(cartPrices)
                setSubtotal(props.subtotal);
            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    });

    return(
        <div>
            {cart && cart.map(item => {
                return(
                    <div className="cart-item" key={item.id}>
                        <div className="order-item-details">
                            <div className="cart-item-info">
                                <img className="cart-item-thumbnail" src={`data:image/png;base64,${item.imageBuffer}`} alt="thumbnail"/>
                                <div className="cart-item-title">Title</div>
                            </div>
                            <div className="cart-item-price">
                                <span>${item.price}.00</span>
                            </div>
                        </div>

                    </div>
                );
            })}
            <hr className="checkout-hr"/>
            <div className="two-column-div">
                <p className="align-left">subtotal</p>
                <p className="align-right">${subtotal}.00</p>
            </div>
        </div>
    )
}

export default OrderSummaryC;