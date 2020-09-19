import React from 'react'
import { Link } from 'react-router-dom'
import data from '../data'

function HomeScreen() {
    return (
        <div>
            <ul className="products">
                {
                    data.products.map(product =>
                        <li>
                            <div className="product">
                                <Link to={`/products/${product._id}`}>
                                    <img className="product-image" src={product.image} alt="product" />
                                </Link>
                                <div className="proctuct-name">
                                    <Link to={`/products/${product._id}`}>{product.name}</Link>
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
