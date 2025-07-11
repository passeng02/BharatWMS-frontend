import React from 'react';
import { Navigate, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import {
  AccountCircle as AccountIcon,
  Warehouse as WarehouseIcon
} from '@mui/icons-material';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8
              }
            }}
          >
            <WarehouseIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700
              }}
            >
              BharatWMS
            </Typography>
          </Box>

          {user ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {user.role === 'admin' && (
                  <>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/admin"
                    >
                      Dashboard
                    </Button>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/admin/add-product"
                    >
                      Add Product
                    </Button>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/admin/check-in"
                    >
                      Check In
                    </Button>
                  </>
                )}
                {user.role === 'customer' && (
                  <>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/customer"
                    >
                      Dashboard
                    </Button>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/customer/place-order"
                    >
                      Place Order
                    </Button>
                  </>
                )}
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => {
                    handleClose();
                    logout();
                  }}>
                    Logout
                  </MenuItem>
                  <MenuItem onClick={() => {
                    handleClose();
                    navigate('/admin/Settings');
                  }}>
                    Settings
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                color="inherit"
                component={RouterLink}
                to="/login"
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                component={RouterLink}
                to="/register"
              >
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
