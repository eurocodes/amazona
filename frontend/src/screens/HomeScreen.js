import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

function HomeScreen() {

    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(listProducts());
        return () => {
            //
        };
    }, [])

    return (
        loading ? <div>Loading...</div> : error ? <div> {error} </div> :
            <div>
                <ul className="products">
                    {
                        products.map(product =>
                            <li key={product._id}>
                                <div className="product">
                                    <Link to={`/product/${product._id}`}>
                                        <img className="product-image" src={product.image} alt="product" />
                                    </Link>
                                    <div className="proctuct-name">
                                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                                    </div>
                                    <div className="product-brand">{product.brand}</div>
                                    <div className="product-price">{product.price}</div>
                                    <div className="product-rating">{product.rating} Stars {product.numReviews}</div>
                                </div>
                            </li>)
                    }
                </ul>
            </div>
    )
}

export default HomeScreen
