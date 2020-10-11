import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteOrder, listOrders } from '../actions/orderActions';

function OrdersScreen(props) {
    const dispatch = useDispatch();

    const orderList = useSelector(state => state.orderList);
    const { loading, orders, error } = orderList;

    const orderDelete = useSelector(state => state.orderDelete);
    const { loading: loadingDelete, success: successDelete, error: erroerDelete } = orderDelete;

    useEffect(() => {
        dispatch(listOrders());
        return () => {
        }
    }, []);

    const deleteHandler = (order) => {
        dispatch(deleteOrder(order._id))
    }

    return (loading ? <div>Loading...</div> :
        <div className="content content-margined">
            <div className="order-header">
                <h3>Orders</h3>
            </div>
            <div className="order-list">

                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TIME</th>
                            <th>TOTAL</th>
                            <th>USER</th>
                            <th>PAID</th>
                            <th>PAID AT</th>
                            <th>DELIVERED</th>
                            <th>DELEVERED AT</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map(order => (<tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.split("T")[0]}</td>
                            <td>{order.createdAt.split("T")[1].split(".")[0]}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.user.name}</td>
                            <td>{order.isPaid ? `${order.isPaid}` : "Not Paid"}</td>
                            <td>{order.paidAt}</td>
                            <td>{order.isDelivered}</td>
                            <td>{order.deleveredAt}</td>
                            <td>
                                <Link to={`/order/${order._id}`} className="button secondary">Details</Link>
                                {" "}
                                <button type="button" onClick={() => deleteHandler(order)} className="button secondary">Delete</button>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrdersScreen;
