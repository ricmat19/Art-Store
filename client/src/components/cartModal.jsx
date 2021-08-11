import React, {useState, useEffect} from 'react';

const CartModalC = (props) => {

    const [cartFull, setCartFull] = useState(false);
    const [cartQty, setCartQty] = useState(0);
    const [cartCost, setCartCost] = useState(0);
    const [cartModal, setCartModal] = useState("inactive-cart cart-modal");


    useEffect(() => {
        const fetchData = async (req, res) => {
            try{

                setCartFull(props.cartState)
                setCartQty(props.cartQty)
                setCartCost(props.cartCost)

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
                    <div className="cart-quantity">{cartQty}</div>
                    <label>items</label>
                </div>
                <div className="totalPrice">${cartCost}</div>
            </div>
        </a>
    )
}

export default CartModalC;