import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { UserList } from 'src/components/Users';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth='lg'>
      <Box my={4}>
        <Typography variant='h4' component='h1' gutterBottom marginBottom={4}>
          OBS User Management App
        </Typography>
        <Box>
          <UserList />
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
