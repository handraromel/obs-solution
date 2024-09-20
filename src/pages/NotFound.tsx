import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const NotFoundSVG = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500' width='300' height='300'>
    <circle cx='250' cy='250' r='200' fill='#f0f0f0' />
    <text x='250' y='220' fontSize='120' textAnchor='middle' fill='#9e9e9e'>
      404
    </text>
    <path d='M200,280 Q250,340 300,280' fill='none' stroke='#9e9e9e' strokeWidth='10' />
    <circle cx='175' cy='200' r='25' fill='#9e9e9e' />
    <circle cx='325' cy='200' r='25' fill='#9e9e9e' />
  </svg>
);

const NotFoundPage: React.FC = () => {
  return (
    <Container maxWidth='md'>
      <Paper elevation={3} sx={{ mt: 8, p: 4, textAlign: 'center' }}>
        <Box mb={4}>
          <NotFoundSVG />
        </Box>
        <Typography variant='h4' component='h1' gutterBottom color='primary'>
          Oops! Page Not Found
        </Typography>
        <Typography variant='body1'>
          The page you&apos;re looking for seems to have wandered off. Don&apos;t worry, even the
          best explorers get lost sometimes!
        </Typography>
        <Button
          component={Link}
          to='/'
          variant='contained'
          color='primary'
          size='large'
          startIcon={<HomeIcon />}
          sx={{ mt: 2 }}
        >
          Return to Homepage
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;
