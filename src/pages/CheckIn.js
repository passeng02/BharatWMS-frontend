import React, { useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Container, Typography, Box, Button } from '@mui/material';
import axios from '../api/axios';

const CheckIn = () => {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [scanner, setScanner] = useState(null);

  const onScanSuccess = async (decodedText) => {
    try {
      // Stop the scanner after successful scan
      if (scanner) {
        scanner.clear();
      }

      // Parse the QR code data as JSON
      const jsonData = JSON.parse(decodedText);
      console.log('ScannedData:', jsonData);
      
      // Post the data to the API
      const response = await axios.post('/products/checkIn', jsonData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setScanResult(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to process QR code data: ' + err.message);
      setScanResult(null);
    }
  };

  const onScanFailure = (error) => {
    setError('Failed to scan QR code: ' + error);
    setScanResult(null);
  };

  const startScanner = () => {
    const newScanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    newScanner.render(onScanSuccess, onScanFailure);
    setScanner(newScanner);
  };

  const handleRestart = () => {
    setScanResult(null);
    setError(null);
    startScanner();
  };

  React.useEffect(() => {
    startScanner();
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Check-in Scanner
        </Typography>
        
        {!scanResult && <div id="reader" style={{ width: '100%' }}></div>}
        
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        
        {scanResult && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" color="success.main">
              Check-in Successful!
            </Typography>
            <Typography variant="body1">
              {JSON.stringify(scanResult, null, 2)}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleRestart}
              sx={{ mt: 2 }}
            >
              Scan Another QR Code
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default CheckIn;
