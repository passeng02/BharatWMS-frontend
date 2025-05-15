import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [skus, setSkus] = useState([{ name: '', quantity: '' }]);
  const navigate = useNavigate();

  const handleSkuChange = (index, field, value) => {
    const updated = [...skus];
    updated[index][field] = value;
    setSkus(updated);
  };

  const addSku = () => setSkus([...skus, { name: '', quantity: ''}]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/Products/add', {
        Product_Name: productName,
        SKUs: skus
      });
      alert('Product added');
      navigate('/admin');
    } catch (err) {
      alert('Failed to add product');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={e => setProductName(e.target.value)}
          required
        />
        <h4>SKUs:</h4>
        {skus.map((sku, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="SKU Name (e.g., Pack of 6)"
              value={sku.name}
              onChange={(e) => handleSkuChange(index, 'name', e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={sku.quantity}
              onChange={(e) => handleSkuChange(index, 'quantity', e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addSku}>Add Another SKU</button>
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
