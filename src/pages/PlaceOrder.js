import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  Paper,
  Divider
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  ShoppingCart as CartIcon,
  Add as AddIcon,
  LocalShipping as ShippingIcon
} from '@mui/icons-material';

const PlaceOrder = () => {
  const [products, setProducts] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedSku, setSelectedSku] = useState('');
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    axios.get('/products/productNdSKU')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Failed to load products:', err));
  }, []);

  const handleAddToCart = () => {
    if (!selectedProduct || !selectedSku) return;
    
    const product = products.find(p => p.Product_ID === parseInt(selectedProduct));
    if (!product) return;

    const sku = product.SKUs.find(s => s.SKU_Name === selectedSku);
    if (!sku) return;

    const newItem = {
      Product_ID: product.Product_ID,
      Product_Name: product.Product_name,
      SKU_ID: sku.SKU_ID,
      SKU_Name: sku.SKU_Name,
      Quantity: quantity,
      Customer_ID: parseInt(localStorage.getItem('Id'))
    };

    setOrderItems([...orderItems, newItem]);
    setSelectedProduct('');
    setSelectedSku('');
    setQuantity(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(orderItems);
    try {
      await axios.post(
        '/CustomerOrder/placeOrder',
        { "orderItems": orderItems},
        {
          headers: {
            "Authorization": localStorage.getItem('token')
          }
        }
      );
      console.log(orderItems);
      
      alert('Order placed successfully');
      navigate('/customer');
    } catch (err) {
      alert('Failed to place order');
      console.error(err);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        <InventoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Warehouse Management System
      </Typography>

      <Grid container spacing={4}>
        {/* Product List Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <InventoryIcon sx={{ mr: 1 }} />
              Available Products
            </Typography>
            <List>
              {products.map(p => (
                <Card key={p.Product_ID} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{p.Product_name}</Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Description: {p.Product_Description}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Category: {p.Product_Category}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      Available SKUs: {p.SKUs?.map(sku => `${sku.SKU_Name} (${sku.Quantity})`).join(', ')}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Order Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <CartIcon sx={{ mr: 1 }} />
              Place Order
            </Typography>

            <Box sx={{ mb: 3 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Select Product</InputLabel>
                <Select
                  value={selectedProduct}
                  onChange={(e) => {
                    setSelectedProduct(e.target.value);
                    setSelectedSku('');
                  }}
                  label="Select Product"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {products.map(product => (
                    <MenuItem key={product.Product_ID} value={product.Product_ID}>
                      {product.Product_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {selectedProduct && (
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Select SKU</InputLabel>
                  <Select
                    value={selectedSku}
                    onChange={(e) => setSelectedSku(e.target.value)}
                    label="Select SKU"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {products
                      .find(p => p.Product_ID === parseInt(selectedProduct))
                      ?.SKUs?.map(sku => (
                        <MenuItem key={sku.SKU_ID} value={sku.SKU_Name}>
                          {sku.SKU_Name} (Available: {sku.Quantity})
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}

              <TextField
                fullWidth
                type="number"
                label="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                inputProps={{ min: 1 }}
                sx={{ mb: 2 }}
              />

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddToCart}
                disabled={!selectedProduct || !selectedSku}
                fullWidth
              >
                Add to Cart
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Cart Items
            </Typography>
            <List>
              {orderItems.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${item.Product_Name} - ${item.SKU_Name}`}
                    secondary={`Quantity: ${item.Quantity}`}
                  />
                </ListItem>
              ))}
            </List>

            <Button
              variant="contained"
              color="primary"
              startIcon={<ShippingIcon />}
              onClick={handleSubmit}
              disabled={orderItems.length === 0}
              fullWidth
              sx={{ mt: 2 }}
            >
              Place Order
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlaceOrder;
