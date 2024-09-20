import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { addUser, updateUser } from "src/store/slices/userSlice";
import { User } from "src/types/user";
import { AppDispatch } from "src/store";

interface UserFormProps {
  initialData?: User;
  onSubmit?: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<User>({
    id: 0,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleNumericChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    allowDecimal = false
  ) => {
    const { name, value } = e.target;

    const regex = allowDecimal ? /^[+-]?[0-9]*[.,]?[0-9]*$/ : /^[+-]?[0-9]*$/;

    if (regex.test(value)) {
      setFormData((prevData) => {
        if (name === "phone") {
          return {
            ...prevData,
            [name]: value,
          };
        } else if (name === "zipcode") {
          return {
            ...prevData,
            address: {
              ...prevData.address,
              [name]: value,
            },
          };
        }
        return prevData;
      });
    }
  };

  const handleGeoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (/^-?\d*\.?\d*$/.test(value)) {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          geo: {
            ...prevData.address.geo,
            [name]: value,
          },
        },
      }));
    }
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      company: {
        ...prevData.company,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      dispatch(updateUser(formData));
    } else {
      const newUser: User = {
        ...formData,
        id: Date.now(),
      };
      dispatch(addUser(newUser));
    }

    if (onSubmit) {
      onSubmit(formData);
    }

    // Reset form on regular submit
    if (!initialData) {
      setFormData({
        id: 0,
        name: "",
        username: "",
        email: "",
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
          geo: {
            lat: "",
            lng: "",
          },
        },
        phone: "",
        website: "",
        company: {
          name: "",
          catchPhrase: "",
          bs: "",
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ pt: 1 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleNumericChange}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Website"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle1">Address</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Street"
            name="street"
            value={formData.address.street}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Suite"
            name="suite"
            value={formData.address.suite}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="City"
            name="city"
            value={formData.address.city}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Zipcode"
            name="zipcode"
            value={formData.address.zipcode}
            onChange={handleNumericChange}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Latitude"
            name="lat"
            value={formData.address.geo.lat}
            onChange={handleGeoChange}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Longitude"
            name="lng"
            value={formData.address.geo.lng}
            onChange={handleGeoChange}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle1">Company</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Company Name"
            name="name"
            value={formData.company.name}
            onChange={handleCompanyChange}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Catch Phrase"
            name="catchPhrase"
            value={formData.company.catchPhrase}
            onChange={handleCompanyChange}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="BS"
            name="bs"
            value={formData.company.bs}
            onChange={handleCompanyChange}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary">
              {initialData ? "Update User" : "Add User"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserForm;
