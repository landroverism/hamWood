'use client';

import { useState, useEffect } from 'react';
import supabase from '../../utils/supabase_Client';
import { CreateTable } from '../../app/api/Api';
import { Box, Button, Typography, CircularProgress, Alert, Paper, TextField } from '@mui/material';

export default function SetupDatabase() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [tableStatus, setTableStatus] = useState(null);

  // Check if the products table exists when component mounts
  useEffect(() => {
    checkTableStatus();
  }, []);

  const checkTableStatus = async () => {
    setLoading(true);
    setMessage('Checking table status...');
    
    try {
      const result = await CreateTable();
      setTableStatus(result);
      
      if (result.success) {
        setMessage('Table exists and is ready to use!');
        setSuccess(true);
      } else {
        setMessage(result.message || 'Table needs to be created in Supabase dashboard');
      }
    } catch (err) {
      console.error('Error checking table status:', err);
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const createTableInstructions = () => {
    return (
      <Paper elevation={3} sx={{ p: 3, mt: 3, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6" gutterBottom>How to Create the Table in Supabase</Typography>
        <Typography variant="body1" paragraph>
          Since the JavaScript client doesn't have permissions to create tables directly, you'll need to create it in the Supabase dashboard:
        </Typography>
        
        <ol>
          <li>
            <Typography variant="body1" paragraph>
              Go to your <a href="https://app.supabase.io" target="_blank" rel="noopener noreferrer">Supabase Dashboard</a>
            </Typography>
          </li>
          <li>
            <Typography variant="body1" paragraph>
              Select your project: <strong>naxtiptpihpsbbxtarzv</strong>
            </Typography>
          </li>
          <li>
            <Typography variant="body1" paragraph>
              Go to the <strong>Table Editor</strong> in the left sidebar
            </Typography>
          </li>
          <li>
            <Typography variant="body1" paragraph>
              Click <strong>+ New Table</strong>
            </Typography>
          </li>
          <li>
            <Typography variant="body1" paragraph>
              Enter table name: <strong>products</strong>
            </Typography>
          </li>
          <li>
            <Typography variant="body1" paragraph>
              Add the following columns:
            </Typography>
            <ul>
              <li><strong>id</strong> (type: uuid, primary key, default: uuid_generate_v4())</li>
              <li><strong>title</strong> (type: text)</li>
              <li><strong>name</strong> (type: text)</li>
              <li><strong>img</strong> (type: text)</li>
              <li><strong>category</strong> (type: text)</li>
              <li><strong>created_at</strong> (type: timestamptz, default: now())</li>
            </ul>
          </li>
          <li>
            <Typography variant="body1" paragraph>
              Click <strong>Save</strong> to create the table
            </Typography>
          </li>
        </ol>
        
        <Typography variant="body1" paragraph>
          After creating the table, click the "Check Table Status" button below to verify it was created correctly.
        </Typography>
      </Paper>
    );
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Database Setup
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {message && !error && <Alert severity="info" sx={{ mb: 2 }}>{message}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Table is ready to use!</Alert>}
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={checkTableStatus}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} sx={{ mr: 1 }} /> : null}
        {loading ? 'Checking...' : 'Check Table Status'}
      </Button>
      
      {!success && !loading && createTableInstructions()}
      
      <Typography variant="body2" sx={{ mt: 4, color: 'text.secondary' }}>
        Note: You need to have the proper Supabase permissions to create tables.
      </Typography>
    </Box>
  );
}
