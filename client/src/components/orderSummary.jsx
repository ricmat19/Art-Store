import React, { useEffect, useState } from 'react';

const OrderSummaryC = (props) => {

    const [cart, setCart] = useState([]);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                console.log(props.cartCollection);
                setCart(props.cartCollection);
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
                    <div className="cart-item">
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
        </div>
    )
}

export default OrderSummaryC;