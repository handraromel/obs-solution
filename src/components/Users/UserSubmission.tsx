import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import { UserAction } from ".";
import { User } from "src/types/user";
import { useDispatch } from "react-redux";
import { addUser } from "src/store/slices/userSlice";
import { AppDispatch } from "src/store";

const UserSubmission: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (user: User) => {
    try {
      await dispatch(addUser(user)).unwrap();
      handleCloseModal();
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  return (
    <>
      <Box mt={2} display="flex" justifyContent="center">
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Add User
        </Button>
        <UserAction
          open={isModalOpen}
          onClose={handleCloseModal}
          user={null}
          onSubmit={handleSubmit}
        />
      </Box>
    </>
  );
};

export default UserSubmission;
