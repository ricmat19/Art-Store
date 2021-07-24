import React, {useState, useContext} from 'react';

const CartModalC = (props) => {

    const [cartQty, setCartQty] = useState("");
    const [cartModal, setCartModal] = useState("inactive-cart cart-modal");

    const addToCartModal = (e) => {
        if(cartQty === 0){
            setCartModal("inactive-cart cart-modal")
        }else{
            setCartModal("active-cart cart-modal")
        }
    }
    
    return(
        <a href="/cart">
            <div className={cartModal}>
                <i className="fas fa-shopping-cart cart-icon"></i>
                <div className="cart-quantity-div">
                    <div className="cart-quantity">0</div>
                    <label>items</label>
                </div>
                <div className="totalPrice">$0</div>
            </div>
        </a>
    )
}

export default CartModalC;