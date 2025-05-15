import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Paper,
  Divider,
  Chip
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  ShoppingCart as CartIcon,
  LocalShipping as ShippingIcon
} from '@mui/icons-material';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/products/productNdSKU')
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => console.error('Failed to load products:', err));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <InventoryIcon sx={{ mr: 1 }} />
        Customer Dashboard
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<CartIcon />}
            onClick={() => navigate('/customer/place-order')}
          >
            Place New Order
          </Button>
          <Button
            variant="outlined"
            startIcon={<ShippingIcon />}
            onClick={() => navigate('/customer/orders')}
          >
            View Orders
          </Button>
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Available Products
      </Typography>

      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.Product_ID}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {product.Product_name}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {product.Product_Description}
                </Typography>
                <Chip
                  label={product.Product_Category}
                  color="primary"
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Available SKUs:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {product.SKUs?.map(sku => (
                    <Chip
                      key={sku.SKU_ID}
                      label={`${sku.SKU_Name} (${sku.Quantity})`}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Box>
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  startIcon={<CartIcon />}
                  onClick={() => navigate('/customer/place-order')}
                  fullWidth
                >
                  Order Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CustomerDashboard;
