'use client';

import { useState } from 'react';
import { AddItem } from '../api/Api';
import { Box, Button, Typography, CircularProgress, Alert, Paper, Grid } from '@mui/material';

// Sample furniture data
const sampleData = [
  {
    title: "Modern Sofa",
    name: "Comfortable 3-seater sofa",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    category: "sofa"
  },
  {
    title: "Wooden Chair",
    name: "Classic wooden dining chair",
    img: "https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    category: "chair"
  },
  {
    title: "Recliner",
    name: "Comfortable recliner chair",
    img: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    category: "recliner"
  }
];

export default function AddSampleData() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const addSampleData = async () => {
    setLoading(true);
    setMessage('Adding sample data...');
    setError('');
    setSuccess(false);
    
    try {
      // Add each sample item to the database
      for (const item of sampleData) {
        const result = await AddItem(item);
        if (result.error) {
          setError(`Error adding sample data: ${result.error.message}`);
          setLoading(false);
          return;
        }
      }
      
      setMessage(`Successfully added ${sampleData.length} sample items to the database!`);
      setSuccess(true);
    } catch (err) {
      console.error('Error adding sample data:', err);
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add Sample Data
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {message && !error && <Alert severity="info" sx={{ mb: 2 }}>{message}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Sample data added successfully!</Alert>}
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Sample Data Preview
        </Typography>
        
        <Grid container spacing={2}>
          {sampleData.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="subtitle1">{item.title}</Typography>
                <Typography variant="body2">{item.name}</Typography>
                <Typography variant="body2">Category: {item.category}</Typography>
                <Box sx={{ mt: 1, height: 100, overflow: 'hidden' }}>
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={addSampleData}
        disabled={loading || success}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} sx={{ mr: 1 }} /> : null}
        {loading ? 'Adding...' : 'Add Sample Data'}
      </Button>
    </Box>
  );
}
