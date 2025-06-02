import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Alert,
  Snackbar
} from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';
import axios from '../api/axios';

const Settings = () => {
  const [selectedSection, setSelectedSection] = useState('picking-strategy');
  const [pickingStrategy, setPickingStrategy] = useState('single');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const handleStrategyChange = (event) => {
    setPickingStrategy(event.target.value);
  };

  const handleApply = async () => {
    try {
      await axios.post('/settings/pickingStrategy', {
        "strategy": pickingStrategy
    }, {
        headers: {
          "Authorization": localStorage.getItem('token')
        }
      });
      setSnackbar({
        open: true,
        message: 'Picking strategy updated successfully',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to update picking strategy',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'picking-strategy':
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Picking Strategy
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Select the picking strategy that best suits your warehouse operations.
            </Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend">Available Strategies</FormLabel>
              <RadioGroup
                value={pickingStrategy}
                onChange={handleStrategyChange}
              >
                <FormControlLabel 
                  value="single" 
                  control={<Radio />} 
                  label="Single Picking"
                />
                <FormControlLabel 
                  value="batch" 
                  control={<Radio />} 
                  label="Batch Picking"
                />
                <FormControlLabel 
                  value="zone" 
                  control={<Radio />} 
                  label="Zone Picking"
                />
              </RadioGroup>
            </FormControl>
            <Box sx={{ mt: 3 }}>
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleApply}
              >
                Apply Changes
              </Button>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {/* Side Menu */}
        <Paper sx={{ width: 240, flexShrink: 0 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedSection === 'picking-strategy'}
                onClick={() => handleSectionChange('picking-strategy')}
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Picking Strategy" />
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>

        {/* Main Content */}
        <Paper sx={{ flexGrow: 1 }}>
          {renderContent()}
        </Paper>
      </Box>
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Settings;
