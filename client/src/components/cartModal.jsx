import React, {useState, useContext, useEffect} from 'react';

const CartModalC = (props) => {

    const [cartFull, setCartFull] = useState(false);
    const [cartModal, setCartModal] = useState("inactive-cart cart-modal");


    useEffect(() => {
        const fetchData = async (req, res) => {
            try{

                setCartFull(props.cartState)
                console.log(props.cartState);
                console.log(cartFull);

                if(cartFull === false){
                    setCartModal("inactive-cart cart-modal")
                }else{
                    setCartModal("active-cart cart-modal")
                }
               
            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    });
    
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