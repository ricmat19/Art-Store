import React, { useEffect, useState } from 'react';
import collectionAPI from '../apis/collectionAPI';

const CartItemC = (props) => {

    const [cart, setCart] = useState([]);
    const [prices, setPrices] = useState([]);
    const [subtotal, setSubtotal] = useState(0);

    let sub = 0;
    let priceArray = [];    
    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                setCart(props.cartCollection);

                for(let i = 0; i < cart.length; i++){
                    sub += parseInt(cart[i].price);
                }
                // setSubtotal(sub);

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    });

    const deleteFromCart = async (id) => {
        try{
            
            const response = await collectionAPI.put("/cart/delete", {
                id: id
            })

        }catch(err){
            console.log(err);
        }
    }

    const setItemQty = (item, e) => {
        try{
            setPrices(priceArray)
            for(let i=0; i < cart.length; i++){
                if(cart[i].id === item.id){
                    priceArray[i] = cart[i].price * e;
                }else{
                    priceArray[i] = prices[i];
                }
            }
            setPrices(priceArray);
            sub = 0;
            for(let i = 0; i < priceArray.length; i++){
                sub = sub + parseInt(prices[i]);
            }
            setSubtotal(sub)
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div>
            {cart && cart.map((item, index) => {

                priceArray.push(parseInt(item.price));

                let itemPrice = ``;
                if(prices[index] === undefined){
                    itemPrice = item.price;
                }else{
                    itemPrice = prices[index];
                }

                return(
                    <div className="cart-item" key={item.id}>
                        <div className="cart-item-details">
                            <div className="cart-item-info">
                                <span className="delete-button" onClick={() => deleteFromCart(item.id)}>X</span>
                                <span>
                                    <img className="cart-item-thumbnail" src={`data:image/png;base64,${item.imageBuffer}`} alt="thumbnail"/>
                                </span>
                                <div className="cart-item-title">{item.title}</div>
                            </div>
                            <div className="cart-item-qty">
                                <input onChange={event => setItemQty(item, event.target.value)} className="item-qty-input" type="number" placeholder='0'/>
                            </div>
                            <div className="cart-item-price">
                                <span>${itemPrice}.00</span>
                            </div>
                        </div>
                        <hr className="item-hr"/>
                    </div>
                );
            })}
            <div className="align-right subtotal-div">
                <span>subtotal</span>
                <span>${subtotal}.00</span>
            </div>
        </div>
    )
}

export default CartItemC;