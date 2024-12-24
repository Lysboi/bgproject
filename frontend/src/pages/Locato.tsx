import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import PageTransition from '../components/PageTransition';

const Locato: React.FC = () => {
  return (
    <PageTransition>
      <Container maxWidth="lg">
        <Box sx={{ 
          minHeight: 'calc(100vh - 64px)', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4
        }}>
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Locato
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
            Yakında burada konumunuzu keşfedeceksiniz!
          </Typography>
        </Box>
      </Container>
    </PageTransition>
  );
};

export default Locato; 