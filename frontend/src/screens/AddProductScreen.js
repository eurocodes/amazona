import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { deleteProduct, listProducts, saveProduct } from '../actions/productActions';

function AddProductScreen(props) {

    const [modalVissible, setModalVissible] = useState(false)
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('')
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    const productList = useSelector(state => state.productList)
    const { loading, products, error } = productList;

    const productSave = useSelector(state => state.productSave)
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;


    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalVissible(false);
        }
        dispatch(listProducts());
        return () => {
            //
        }
    }, [successSave, successDelete]);

    const openModal = product => {
        setModalVissible(true)
        setId(product._id)
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
    }
    const submitHandler = e => {
        e.preventDefault();
        dispatch(saveProduct({
            _id: id,
            name, price, image, brand, category, countInStock, description,
        }));
    }

    const deleteHandler = product => {
        dispatch(deleteProduct(product._id));
    }

    const uploadFileHandler = (e) => {
        const file = e.target.files[0];
        console.log("File Data:", file);
        const bodyFormData = new FormData();
        bodyFormData.append("image", file);
        setUploading(true);
        console.log("Form Data:", bodyFormData);
        Axios.post("/api/uploads/s3", bodyFormData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        })
            .then(response => {
                setImage(response.data);
                setUploading(false);
            })
            .catch(err => {
                console.log(err);
                setUploading(false);
            });
    };

    return (
        <div className="content content-margined">
            <div className="product-header">
                <h3>Product</h3>
                <button className="button primary" onClick={() => openModal({})}>Create Product</button>
            </div>
            {modalVissible &&
                <div className="form">
                    <form onSubmit={submitHandler}>
                        <ul className="form-container">
                            <li>
                                <h2>Add Product</h2>
                            </li>
                            <li>
                                {loadingSave && <div>Loading...</div>}
                                {errorSave && <div>{errorSave}</div>}
                            </li>
                            <li>
                                <label htmlFor="name">
                                    Name
                        </label>
                                <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="price">
                                    Price
                        </label>
                                <input type="number" name="price" id="price" value={price} onChange={e => setPrice(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="image">
                                    Image
                        </label>
                                <input type="text" name="image" id="image" value={image} onChange={e => setImage(e.target.value)}></input>
                                <input type="file" onChange={uploadFileHandler}></input>
                                {uploading && <div>Uploading...</div>}
                            </li>
                            <li>
                                <label htmlFor="price">
                                    Brand
                        </label>
                                <input type="text" name="brand" id="brand" value={brand} onChange={e => setBrand(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="category">
                                    Category
                        </label>
                                <input type="text" name="category" id="category" value={category} onChange={e => setCategory(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="countInStock">
                                    Number of Product
                        </label>
                                <input type="number" name="countInStock" id="countInStock" value={countInStock} onChange={e => setCountInStock(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="description">
                                    Description
                        </label>
                                <textarea name="description" value={description} id="description" onChange={e => setDescription(e.target.value)}></textarea>
                            </li>
                            <li>
                                <button type="submit" className="button primary">{id ? "Update Stock" : "Add To Stock"}</button>
                            </li>
                            <li>
                                <button type="button" onClick={() => setModalVissible(false)} className="button secondary">Cancel</button>
                            </li>
                        </ul>
                    </form>
                </div>}
            <div className="product-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product =>
                            (<tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <button className="button" onClick={() => openModal(product)}>Edit</button>
                                    {"  "}
                                    <button className="button" onClick={() => deleteHandler(product)}>Delete</button>
                                </td>
                            </tr>))}

                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default AddProductScreen;
