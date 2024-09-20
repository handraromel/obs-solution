import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const AnimatedCloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: 8,
  top: 8,
  color: theme.palette.grey[500],
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "rotate(90deg)",
  },
}));

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  actions,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography
          sx={{ borderBottom: "1px solid #cfd8dc", fontSize: "34px" }}
        >
          {title}
        </Typography>
        <AnimatedCloseButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </AnimatedCloseButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

export default Modal;
