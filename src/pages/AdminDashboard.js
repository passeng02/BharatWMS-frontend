import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import axios from '../api/axios';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/products')
      .then((res) => {
        setProducts(res.data)
        console.log(res.data)
  }).catch(err => console.error('Failed to load products:', err));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {products.map(p => (
          <li key={p.Product_ID}>{p.Product_Name} - {p.Product_Quantity} units</li>
        ))}
      </ul>
      <button onClick={() => navigate('/admin')}>View Products</button>
      <button onClick={() => navigate('/admin/add-product')}>Add Product</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
