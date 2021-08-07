import React, {useContext, useEffect, useState} from 'react';
import {useParams, useHistory} from "react-router-dom";
import ReactPaginate from 'react-paginate';
import CollectionAPI from '../apis/collectionAPI';
import {CollectionContext} from '../context/collectionContext';
import CartModalC from './cartModal';
import HeaderC from './header';
import FooterC from './footer';

const CollectionC = (props) => {

    const [cart, setCart] = useState([]);
    const [cartState, setCartState] = useState(false);
    const [cartQty, setCartQty] = useState(0);
    const [cartCost, setCartCost] = useState(0);

    const {product} = useParams();
    const {collection, setCollection} = useContext(CollectionContext);
    const [pageNumber, setPageNumber] = useState(0);

    const itemsPerPage = 9;
    const pagesVisted = pageNumber * itemsPerPage;

    const displayItems = collection.slice(pagesVisted, pagesVisted + itemsPerPage).map((item) => {
        return(
            <div className="collection-item-div" key={item.id} onClick={() => displayItem(item.product, item.id)}>
                <div className="collection-item">
                    <img className="collection-thumbnail" src={item.imageBuffer}/>
                </div>
                <div className="collection-thumbnail-footer">
                    <div className="Title">{item.title}</div>
                    <div className="Price">${item.price}.00</div>
                </div>
            </div>
        );
    });

    const pageCount = Math.ceil(collection.length / itemsPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    }

    let history = useHistory();

    let productResponse;
    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                productResponse = await CollectionAPI.get(`/collection/${product}`);

                for(let i=0; i < productResponse.data.data.collection.length; i++){
 
                    let imagesResponse = await CollectionAPI.get(`/images/${productResponse.data.data.collection[i].imagekey}`, {
                        responseType: 'arraybuffer'
                    })
                    .then(response => Buffer.from(response.data, 'binary').toString('base64'));

                    productResponse.data.data.collection[i].imageBuffer = `data:image/png;base64,${imagesResponse}`;
                    
                }
                console.log(productResponse.data.data.collection);
                setCollection(productResponse.data.data.collection);

                const cartResponse = await CollectionAPI.get(`/cart`);
                setCart(cartResponse.data.data.cart);

                setCartQty(cartResponse.data.data.cart.length);

                let price = 0;
                for(let i = 0; i < cartResponse.data.data.cart.length; i++){
                    price += parseInt(cartResponse.data.data.cart[i].price)
                }
                setCartCost(price)

                if(cartResponse.length !== 0){
                    setCartState(true);
                }else{
                    setCartState(false);
                }

            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    }, []);

    const displayItem = async (product, id) => {
        try{
            history.push(`/collection/${product}/${id}`)
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div>
            <CartModalC cartState={cartState} cartQty={cartQty} cartCost={cartCost}/>
            <HeaderC/>
            <div className="main-body">
                <div className="center subtitle-div">
                    <a className="subtitle-anchor" href="/collection/comic"><p className="title">comics</p></a>
                    <a className="subtitle-anchor" href="/collection/print"><p className="title">print</p></a>
                    <a className="subtitle-anchor" href="/collection/personal"><p className="title">personal</p></a>
                </div>
                <div className="collection-menu">
                    {displayItems}
                    {/* {collection && collection.map(item => {
                        return(
                            <div className="collection-item-div" key={item.id} onClick={() => displayItem(item.product, item.id)}>
                                <div className="collection-item">
                                    <img className="collection-thumbnail" src={item.imageBuffer}/>
                                </div>
                                <div className="collection-thumbnail-footer">
                                    <div className="Title">{item.title}</div>
                                    <div className="Price">${item.price}.00</div>
                                </div>
                            </div>
                        );
                    })} */}
                </div>
                <ReactPaginate 
                    previousLabel={"prev"} 
                    nextLabel={"next"} 
                    pageCount={pageCount} 
                    onPageChange={changePage}
                    containerClassName={"paginationButtons"}
                    previousLinkClassName={"prevButton"}
                    nextLinkClassName={"nextButton"}
                    disabledClassName={"disabledButton"}
                    activeClassName={"activeButton"}
                />
            </div>
            <FooterC/>
        </div>
    )
}

export default CollectionC;