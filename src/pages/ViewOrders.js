import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Box,
  Divider
} from '@mui/material';
import { LocalShipping as ShippingIcon, ShoppingCart as CartIcon } from '@mui/icons-material';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const JWTtoken = localStorage.getItem('token');
        const CustId = localStorage.getItem('Id');
        const headers = {
          "Authorization": localStorage.getItem('token')
          };
          const params = { "Customer_Id": CustId};
        console.log(CustId)
        const res = await axios.get(
            '/CustomerOrder/viewOrders', {
              headers, params
            }
          );
        setOrders(res.data);
      } catch (err) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <CartIcon sx={{ mr: 1 }} />
        My Orders
      </Typography>
      {loading ? (
        <Typography variant="body1">Loading orders...</Typography>
      ) : orders.length === 0 ? (
        <Typography variant="body1">No orders found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order, idx) => (
            <Grid item xs={12} sm={6} md={4} key={order.Order_ID || idx}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardHeader
                  title={`Order #${order.Order_ID || idx + 1}`}
                  subheader={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        icon={<ShippingIcon />}
                        label={order.S_Status ? order.S_Status : 'Received'}
                        color={order.S_Status === 'Shipped' ? 'success' : 'primary'}
                        size="small"
                      />
                    </Box>
                  }
                />
                <Divider />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Product: <b>{order.Product_Name || order.Product_name}</b>
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    SKU: <b>{order.SKU_Name}</b>
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Quantity: <b>{order.Ordered_Quantity}</b>
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Created At: <b>{order.created_at ? new Date(order.created_at).toLocaleString() : 'N/A'}</b>
                  </Typography>
                  <Typography variant="body2">
                    Shipping Time: <b>{order.ship_by ? new Date(order.ship_by).toLocaleString() : 'Pending'}</b>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ViewOrders;
