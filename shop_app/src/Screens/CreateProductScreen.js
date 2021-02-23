import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, productActionsCreator, deleteProduct } from '../actions/productActionsCreator';
import Axios from 'axios';
import {RiDeleteBin7Fill} from 'react-icons/ri';
import {FaRegEdit} from 'react-icons/fa';
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
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
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

  function getMeta (url, callback) {
    var img = new Image();
    img.src = url;
    img.onload = function() {
      callback(this.width, this.height);
    }
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      getMeta(data, function(width,height) { if( width > 388 && height > 249){
        alert("Okay");
        return true;
      }else{
        alert("Not okay minimum width:388 and height 249");
      }
    });
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  if(userInfo && userInfo.isAdmin){
  return (
  <div className="contentCreate">

    <div className="productHeader">
      <h3>Products</h3>
      <a href="#createproduct" className="productContent__button" onClick={() => openModal({})}>Create New Product</a>
    </div>
    {modalVisible &&
        <form id="createproduct" className="createproduct" onSubmit={submitHandler} >
          
          <div className="createproduct__content">
            <a onClick={() => setModalVisible(false)} className="close">&times;</a>
              <h2>{id ? "Update Product" : "Create New Product"}</h2>
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
          {/* </p>
               <input type="text" name="image" id="file" value={image} onChange={(e) => setImage(e.target.value)}/>
          <p> */}
            Upload
          </p>
          <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
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
            <h3 className="productList__header__hide">ID</h3>
            <h3>Name</h3>
            <h3>Price</h3>
            <h3 className="productList__header__hide">Category</h3>
            <h3 className="productList__header__hide">Brand</h3>
            <h3>Action</h3>
        </div>
       
          {products.map(product => (
          <div className="productContent" key={product._id}>
            <div className="productContent__id">{product._id}</div>
            <div className="productContent__name">{product.name}</div>
            <div className="productContent__price">{product.price}$</div>
            <div className="productContent__category">{product.category}</div>
            <div className="productContent__brand">{product.brand}</div>
            <div>
              {/* <a href="#createproduct" className="productContent__button--edit" onClick={() => openModal(product)} >Edit</a> */}
              {' '}
              {/* <a className="productContent__button--delete" onClick={() => deleteHandler(product)}>Delete</a> */}
              <a href="#createproduct">
              <FaRegEdit  className="productContent__iconEdit" onClick={() => openModal(product)}></FaRegEdit>
              </a>
              <RiDeleteBin7Fill className="productContent__iconDelete"></RiDeleteBin7Fill>
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