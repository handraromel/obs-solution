import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box my={4} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          404: Page Not Found
        </Typography>
        <Typography variant="body1">
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
