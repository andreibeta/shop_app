import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, productActionsCreator, deleteProduct } from '../actions/productActionsCreator';


function CreateProductScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const productList = useSelector(state => state.productList);
  const { loading, products, error } = productList;

  const productSave = useSelector(state => state.productSave);
  const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

  const productDelete = useSelector(state => state.productDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(productActionsCreator());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (product,e) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProduct({
      _id: id,
      name, price, image, brand, category,
      countInStock, description
    }));
    setModalVisible(false);
  }
  const deleteHandler = (product) =>{
    dispatch(deleteProduct(product._id));
  }
  if(userInfo.isAdmin){
  return (
  <div>

    <div className="productHeader">
      <h3>Products</h3>
      <a href="#createproduct" className="productContent__button" onClick={() => openModal({})}>Create New Product</a>
    </div>
    {modalVisible &&
        <form id="createproduct" className="createproduct" onSubmit={submitHandler} >
          
          <div className="createproduct__content">
            <a onClick={() => setModalVisible(false)} className="close">&times;</a>
              <h2>Create Product</h2>
              {loadingSave && <div>Loading...</div>}
              {errorSave && <div>{errorSave}</div>}
              
              <p>
                Name
              </p>
              <input type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)}>
              </input>
              
              <p>
                Price
              </p>
              <input type="text" name="price" value={price} id="price" onChange={(e) => setPrice(e.target.value)}>
              </input>
             
          <p>
                Image
          </p>
               <input type="file" id="img" name="img" accept="image/*"/>
              <input type="text" name="image" value={image} id="image" onChange={(e) => setImage(e.target.value)}>
              </input>
         
          <p>
                Brand
          </p>
              <input type="text" name="brand" value={brand} id="brand" onChange={(e) => setBrand(e.target.value)}>
              </input>
            
          <p>
                CountInStock
          </p>
              <input type="text" name="countInStock" value={countInStock} id="countInStock" onChange={(e) => setCountInStock(e.target.value)}>
              </input>
            
              <p>
                Category
              </p>
              <input type="text" name="category" value={category} id="category" onChange={(e) => setCategory(e.target.value)}>
              </input>
            
            <p>
                Description
            </p>
              <textarea name="description" value={description} id="description" onChange={(e) => setDescription(e.target.value)}></textarea>
              
          
            
            <button className="createproduct__content__button" type="submit">{id ? "Update" : "Create"}</button>     
          </div>
        </form>
      
    }


    <div className="productList">

        <div className="productList__header">
            <h3>ID</h3>
            <h3>Name</h3>
            <h3>Price</h3>
            <h3>Category</h3>
            <h3>Brand</h3>
            <h3>Action</h3>
        </div>
       
          {products.map(product => (
          <div className="productContent" key={product._id}>
            <div className="productContent__id">{product._id}</div>
            <div>{product.name}</div>
            <div>{product.price}</div>
            <div>{product.category}</div>
            <div>{product.brand}</div>
            <div>
              <a href="#createproduct" className="productContent__button" onClick={() => openModal(product)} >Edit</a>
              {' '}
              <a className="productContent__button" onClick={() => deleteHandler(product)}>Delete</a>
            </div>
          </div>))}
    </div>
  </div>
  )
}else{
  return(
   <div>
     No access
   </div>
  )
}
}
export default CreateProductScreen; 