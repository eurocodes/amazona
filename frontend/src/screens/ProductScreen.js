import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';
import Rating from '../components/Rating';

function ProductScreen(props) {
    const [qty, setQty] = React.useState(1)
    const [rating, setRating] = React.useState(0);
    const [comment, setComment] = React.useState('');
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const productReviewSave = useSelector(state => state.productReviewSave);
    const { success: productSaveSuccess } = productReviewSave;
    const dispatch = useDispatch();

    const productId = props.match.params.id

    React.useEffect(() => {
        if (productSaveSuccess) {
            alert("Review submitted successfully");
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_SAVE_RESET })
        }
        dispatch(detailsProduct(productId));
        return () => {
            //
        }
    }, [productSaveSuccess]);

    const submitHandler = e => {
        e.preventDefault();
        // dispatch actions
        dispatch(saveProductReview(productId, {
            name: userInfo.name,
            rating, comment
        }))
    }

    const handleAddToCart = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }

    return (
        <div>
            <div className="back-to-result">
                <Link to="/">Back to Home</Link>
            </div>
            {loading ? <div>Loading...</div> : error ? <div>{error}</div> :
                <>
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
                                    <a href="#reviews">
                                        <Rating
                                            value={product.rating}
                                            text={product.numReviews + " reviews"}
                                        />
                                    </a>
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
                                        <button className="button primary" onClick={handleAddToCart}>Add To Cart</button> : null}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="content-margined">
                        <h2>Reviews</h2>
                        {!product.reviews ? <div>There is no review</div> :
                            <ul className="review" id="reviews">
                                {product.reviews.map((review) => (
                                    <li key={review._id}>
                                        <div>{review.name}</div>
                                        <div>
                                            <Rating value={review.rating}></Rating>
                                        </div>
                                        <div>{review.createdAt.substring(0, 10)}</div>
                                        <div>{review.comment}</div>
                                    </li>
                                ))}
                                <li>
                                    <h3>Write a customer review</h3>
                                    {userInfo ? (
                                        <form onSubmit={submitHandler}>
                                            <ul className="form-container">
                                                <li>
                                                    <label htmlFor="rating">Rating</label>
                                                    <select
                                                        name="rating"
                                                        id="rating"
                                                        value={rating}
                                                        onChange={(e) => setRating(e.target.value)}
                                                    >
                                                        <option value="1">1- Poor</option>
                                                        <option value="2">2- Fair</option>
                                                        <option value="3">3- Good</option>
                                                        <option value="4">4- Very Good</option>
                                                        <option value="5">5- Excelent</option>
                                                    </select>
                                                </li>
                                                <li>
                                                    <label htmlFor="comment">Comment</label>
                                                    <textarea
                                                        name="comment"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    ></textarea>
                                                </li>
                                                <li>
                                                    <button type="submit" className="button primary">
                                                        Submit
                        </button>
                                                </li>
                                            </ul>
                                        </form>
                                    ) : (
                                            <div>
                                                Please <Link to="/signin">Sign-in</Link> to write a review.
                                            </div>
                                        )}
                                </li>
                            </ul>
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default ProductScreen
