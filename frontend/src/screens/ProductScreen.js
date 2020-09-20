import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen(props) {
    const [qty, setQty] = React.useState(1)

    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    const productId = props.match.params.id

    React.useEffect(() => {
        dispatch(detailsProduct(productId));
        return () => {
            //
        }
    }, [])

    const handleAddToCart = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }

    return (
        <div>
            <div className="back-to-result">
                <Link to="/">Back to Home</Link>
            </div>
            {loading ? <div>Loading...</div> : error ? <div>{error}</div> :
                <div className="details">
                    <div className="details-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="details-info">
                        <ul>
                            <li>
                                <h4>{product.name}</h4>
                            </li>
                            <li>
                                {product.rating} Stars ({product.numReviews} Reviews)
                        </li>
                            <li>
                                <b>Price: ${product.price}</b>
                            </li>
                            <li>
                                Description:
                            <div>
                                    {product.description}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="details-action">
                        <ul>
                            <li>
                                Price: ${product.price}
                            </li>
                            <li>
                                Status: {product.countInStock > 0 ? "In Stock" : "Unavailable"}
                            </li>
                            <li>
                                Qty: <select value={qty} onChange={e => { setQty(e.target.value) }}>
                                    {[...Array(product.countInStock).keys()].map(item =>
                                        <option key={item + 1} value={item + 1}>{item + 1}</option>)}
                                </select>
                            </li>
                            <li>
                                {product.countInStock > 0 ?
                                    <button className="button" onClick={handleAddToCart}>Add To Cart</button> : null}
                            </li>
                        </ul>
                    </div>
                </div>}
        </div>
    )
}

export default ProductScreen
