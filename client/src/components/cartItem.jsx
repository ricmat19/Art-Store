import React, { useEffect, useState } from 'react';

const CartItemC = (props) => {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                setCart(props.cartCollection);
            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    });

    return(
        <div >
            {cart && cart.map(item => {
                return(
                    <div className="cart-item" key={item.id}>
                        <div className="cart-item-details">
                            <div className="cart-item-info">
                                <span>X</span>
                                <span>
                                    <img className="cart-item-thumbnail" src="../../logo512.png" alt="thumbnail"/>
                                </span>
                                <div className="cart-item-title">{item.title}</div>
                            </div>
                            <div className="cart-item-qty">
                                <input className="item-qty-input" type="number" placeholder="0"></input>
                            </div>
                            <div className="cart-item-price">
                                <span>{item.price}</span>
                            </div>
                        </div>
                        <hr className="item-hr"/>
                    </div>
                );
            })}
        </div>
    )
}

export default CartItemC;