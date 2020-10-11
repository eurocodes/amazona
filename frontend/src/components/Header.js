import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export const Header = () => {

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin;

    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open");
    }

    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
    }

    return (
        <div>
            <header className="header">
                <div className="brand">
                    <button onClick={openMenu}>
                        &#9776;
                </button>
                    <Link to="/">emmazon</Link>
                </div>
                <div className="header-links">
                    <Link to="/cart">Cart </Link>
                    {
                        userInfo ? <Link to="/profile">{userInfo.name}</Link> :
                            <Link to="/signin">Sign In</Link>
                    }
                    {userInfo && userInfo.isAdmin && (
                        <div className="dropdown">
                            <a href="#">Admin</a>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to="/orders">Orders</Link>
                                    <Link to="/products">Products</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>
            <aside className="sidebar">
                <h3>Shopping Categories</h3>
                <button className="sidebar-close-button" onClick={closeMenu}>x</button>
                <ul className="categories">
                    <li>
                        <Link to="/category/Pants">Pants</Link>
                    </li>
                    <li>
                        <Link to="/category/Shirts">Shirts</Link>
                    </li>
                </ul>
            </aside>
        </div>
    )
}
