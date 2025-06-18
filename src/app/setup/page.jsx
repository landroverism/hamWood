'use client';

import SetupDatabase from '../components/SetupDatabase';
import AddSampleData from '../components/AddSampleData';
import { Box, Typography, Container, Divider } from '@mui/material';

export default function SetupPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Database Setup
        </Typography>
        <Typography variant="body1" paragraph>
          Use this page to set up your Supabase database tables and add sample data for testing.
        </Typography>
        
        <SetupDatabase />
        
        <Divider sx={{ my: 4 }} />
        
        <AddSampleData />
      </Box>
    </Container>
  );
}
