import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [skus, setSkus] = useState([{ 
    SKU_Name: '', 
    Quantity_Available: 0,
    Maximum_Stock_Level: 0,
    Minimum_Stock_Level: 0,
    Reorder_Point: 0
  }]);
  const navigate = useNavigate();

  const handleSkuChange = (index, field, value) => {
    const updated = [...skus];
    if (field != 'SKU_Name'){
      updated[index][field] = parseInt(value);
    }
    else  {
      updated[index][field] = value;
    }
    setSkus(updated);
  };

  const addSku = () => setSkus([...skus, { SKU_Name: '', 
    Quantity_Available: 0,
    Maximum_Stock_Level: 0,
    Minimum_Stock_Level: 0,
    Reorder_Point: 0}]);
  
  const removeSku = (index) => {
    const updated = skus.filter((_, i) => i !== index);
    setSkus(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/products', {
        Product_Name: productName,
        Product_Category: productCategory,
        Product_Description: productDescription,
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
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Add Product
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Product Name"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            required
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Product Category"
            value={productCategory}
            onChange={e => setProductCategory(e.target.value)}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="Product Description"
            value={productDescription}
            onChange={e => setProductDescription(e.target.value)}
            multiline
            rows={3}
            margin="normal"
            helperText="Optional"
          />
          
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            SKUs
          </Typography>
          
          {skus.map((sku, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="SKU Name"
                    placeholder="e.g., Pack of 6"
                    value={sku.name}
                    onChange={(e) => handleSkuChange(index, 'SKU_Name', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    type="number"
                    value={sku.quantity}
                    onChange={(e) => handleSkuChange(index, 'Quantity_Available', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Maximum Stock Level"
                    type="number"
                    value={sku.maximum_stock_level}
                    onChange={(e) => handleSkuChange(index, 'Maximum_Stock_Level', e.target.value)}
                    helperText="Optional"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Minimum Stock Level"
                    type="number"
                    value={sku.minimum_stock_level}
                    onChange={(e) => handleSkuChange(index, 'Minimum_Stock_Level', e.target.value)}
                    helperText="Optional"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Reorder Point"
                    type="number"
                    value={sku.reorder_point}
                    onChange={(e) => handleSkuChange(index, 'Reorder_Point', e.target.value)}
                    helperText="Optional"
                  />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton 
                    color="error" 
                    onClick={() => removeSku(index)}
                    disabled={skus.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          ))}
          
          <Box sx={{ mt: 2, mb: 3 }}>
            <Button
              startIcon={<AddIcon />}
              onClick={addSku}
              variant="outlined"
              fullWidth
            >
              Add Another SKU
            </Button>
          </Box>
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Add Product
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddProduct;
