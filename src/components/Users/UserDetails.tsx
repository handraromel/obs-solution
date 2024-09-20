import React, { useState, useEffect } from 'react';
import { Typography, Avatar, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Modal } from '../Common';
import { User } from 'src/types/user';

interface UserDetailsModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

const UserDetails: React.FC<UserDetailsModalProps> = ({ open, onClose, user }) => {
  const [randomImageUrl, setRandomImageUrl] = useState('');
  useEffect(() => {
    if (user) {
      setRandomImageUrl(`https://picsum.photos/200?random=${Date.now()}`);
    }
  }, [user]);

  if (!user) return null;

  return (
    <Modal open={open} onClose={onClose} title='User Details'>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }} container justifyContent='center'>
          <Box mb={2}>
            <Avatar src={randomImageUrl} alt={user.name} sx={{ width: 150, height: 150 }} />
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography variant='h6'>{user.name}</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography>
            <strong>Username:</strong> {user.username}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography>
            <strong>Email:</strong> {user.email}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography>
            <strong>Phone:</strong> {user.phone}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography>
            <strong>Website:</strong> {user.website}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography variant='h6'>Address</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography>
            <strong>Street:</strong> {user.address.street}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography>
            <strong>Suite:</strong> {user.address.suite}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography>
            <strong>City:</strong> {user.address.city}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography>
            <strong>Zipcode:</strong> {user.address.zipcode}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography>
            <strong>Latitude:</strong> {user.address.geo.lat}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography>
            <strong>Longitude:</strong> {user.address.geo.lng}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography variant='h6'>Company</Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography>
            <strong>Name:</strong> {user.company.name}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography>
            <strong>Catch Phrase:</strong> {user.company.catchPhrase}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography>
            <strong>BS:</strong> {user.company.bs}
          </Typography>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default UserDetails;
