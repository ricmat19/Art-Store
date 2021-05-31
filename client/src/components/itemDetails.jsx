import React from 'react';

const ItemDetailsC = () => {
    return(
        <div>
            <div className="main-body item-details">
                <div className="item-images">
                    <div className="image">
                        <h1 className="image-title">TITLE</h1>
                        <div className="big-image-div">
                            <img className="big-image" src="" alt="main"/>
                        </div>
                        <div className="image-thumbnails">
                            <img className="image-thumbnail" src="" alt="thumbnail"/>
                            <img className="image-thumbnail" src="" alt="thumbnail"/>
                            <img className="image-thumbnail" src="" alt="thumbnail"/>
                        </div>
                    </div>
                    <div className="details">
                    </div>
                    <div className="qty"></div>
                </div>
                <div className="cart-options">
                    <button>Add To Cart</button>
                    <button>Order Now</button>
                </div>
            </div>
        </div>
    )
}

export default ItemDetailsC;