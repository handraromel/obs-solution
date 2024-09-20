import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { Modal } from "src/components/Common";
import { User } from "src/types/user";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: User | null;
}

const UserDelete: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  user,
}) => {
  if (!user) return null;

  return (
    <Modal open={open} onClose={onClose} title="Confirm Delete">
      <Typography variant="body1" gutterBottom>
        Are you sure you want to delete the user "{user.name}"?
      </Typography>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete
        </Button>
      </Box>
    </Modal>
  );
};

export default UserDelete;
