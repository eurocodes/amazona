import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listMyOrders } from '../actions/orderActions';
import { logout, update } from '../actions/userActions';

function ProfileScreen(props) {
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const handleLogout = () => {
        dispatch(logout());
        props.history.push("/signin");
    }

    const submitHandler = e => {
        e.preventDefault();
        dispatch(update({ userId: userInfo._id, password }));
    }

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading, success, error } = userUpdate;

    const myOrderList = useSelector(state => state.myOrderList);
    const { loading: loadindOrders, orders, error: errorOders } = myOrderList;

    useEffect(() => {
        if (userInfo) {
            setPassword(userInfo.password)
        }
        dispatch(listMyOrders());
        return () => {

        }
    }, [userInfo])

    return (
        <div className="profile">
            <div className="profile-info">
                <div className="form">
                    <form onSubmit={submitHandler}>
                        <ul className="form-container">
                            <li>
                                <h2>User Profile</h2>
                            </li>
                            <li>
                                {loading && <div>Loading...</div>}
                                {error && <div>{error}</div>}
                                {success && <div>Upate Saved Successfully.</div>}
                            </li>
                            <li>
                                <div>
                                    Name: <h5>{userInfo.name}</h5>
                                </div>
                            </li>
                            <li>
                                <div>
                                    Email: <h5>{userInfo.email}</h5>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input type="password" name="password" id="password" value={userInfo.password} onChange={e => setPassword(e.target.value)}></input>
                            </li>
                            <li>
                                <button type="submit" className="button primary">Change Password</button>
                            </li>
                            <li>
                                <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>

            {orders && orders.length >= 1 ? <div className="profile-orders content-margined">
                {loadindOrders ? <div>Loading...</div> :
                    errorOders ? <div>{errorOders}</div> :
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid}</td>
                                    <td>
                                        <Link to={`/order/${order._id}`}>DETAILS</Link>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>}
            </div> : null}

        </div>
    )
}

export default ProfileScreen
