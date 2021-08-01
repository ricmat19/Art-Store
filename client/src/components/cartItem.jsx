import React, { useEffect, useState } from 'react';
import collectionAPI from '../apis/collectionAPI';

const CartItemC = (props) => {

    const [cart, setCart] = useState([]);

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

    const deleteFromCart = async (id) => {
        try{
            
            const response = await collectionAPI.put("/cart", {
                id: id
            })

        }catch(err){
            console.log(err);
        }
    }

    return(
        <div>
            {cart && cart.map(item => {
                return(
                    <div className="cart-item" key={item.id}>
                        <div className="cart-item-details">
                            <div className="cart-item-info">
                                <span className="delete-button" onClick={() => deleteFromCart(item.id)}>X</span>
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