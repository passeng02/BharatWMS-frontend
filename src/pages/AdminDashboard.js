import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import axios from '../api/axios';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box,
  CardActions
} from '@mui/material';
import { Inventory as InventoryIcon } from '@mui/icons-material';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/products/productNdSKU')
      .then((res) => {
        console.log('Products data:', res.data);
        setProducts(res.data);
      }).catch(err => console.error('Failed to load products:', err));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center' }}>
          <InventoryIcon sx={{ mr: 1 }} />
          Admin Dashboard
        </Typography>
        <Box>
          <Button variant="contained" color="success" onClick={() => navigate('/admin/add-product')} sx={{ mr: 2 }}>
            Add Product
          </Button>
          <Button variant="contained" color="success" onClick={() => navigate('/admin/check-in')} sx={{ mr: 2 }}>
            Check-in
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {products.map(p => (
          p.SKUs.map(s => (
          <Grid item xs={12} sm={6} md={4} key={s.SKU_ID}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {p.Product_name || p.Product_Name}
                </Typography>
                <Typography variant="h8" gutterBottom>
                  {s.SKU_Name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Product ID: {p.product_id || p.Product_ID}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  SKU ID: {s.SKU_ID}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {s.Quantity} units
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))))}
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
