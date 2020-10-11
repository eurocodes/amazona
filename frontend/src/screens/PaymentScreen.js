import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentScreen(props) {

    const [paymentMethod, setPaymentMethod] = useState('');

    const dispatch = useDispatch();

    const submitHandler = e => {
        e.preventDefault();
        dispatch(savePayment({ paymentMethod }));
        props.history.push("placeorder");
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>

            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2>Payment</h2>
                        </li>
                        <li className="payment-options">
                            <div>
                                <input type="radio" name="paymentmethod" id="paymentmethod" value="Paypal" required onChange={e => setPaymentMethod(e.target.value)}></input>
                                <label htmlFor="paypal">
                                    Paypal
                        </label>
                            </div>
                            <div>
                                <input type="radio" name="paymentmethod" id="paymentmethod" value="Paystack" required onChange={e => setPaymentMethod(e.target.value)}></input>
                                <label htmlFor="paystack">
                                    Paystack
                        </label>
                            </div>
                            <div>
                                <input type="radio" name="paymentmethod" id="paymentmethod" value="Paylink" required onChange={e => setPaymentMethod(e.target.value)}></input>
                                <label htmlFor="paylink">
                                    Paylink
                        </label>
                            </div>
                            {/* <input type="text" name="address" id="name" onChange={e => setAddress(e.target.value)}></input> */}
                        </li>

                        <li>
                            <button type="submit" className="button primary">Continue</button>
                        </li>

                    </ul>
                </form>
            </div>
        </div>
    )
}

export default PaymentScreen;
