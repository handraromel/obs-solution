import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Box,
  Typography,
  Pagination,
} from "@mui/material";
import { fetchUsers, deleteUser, updateUser } from "src/store/slices/userSlice";
import { RootState, AppDispatch } from "src/store";
import { User } from "src/types/user";
import { UserAction, UserDetails, UserSubmission, UserDelete } from ".";

const USERS_PER_PAGE = 7;

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsActionModalOpen(true);
  };

  const handleDetails = (user: User) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const handleDeletePrompt = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (selectedUser) {
      dispatch(deleteUser(selectedUser.id));
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  const handleCloseActionModal = () => {
    setSelectedUser(null);
    setIsActionModalOpen(false);
  };

  const handleCloseDetailsModal = () => {
    setSelectedUser(null);
    setIsDetailsModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setSelectedUser(null);
    setIsDeleteModalOpen(false);
  };

  const handleSubmit = (user: User) => {
    dispatch(updateUser(user));
    handleCloseActionModal();
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const paginatedUsers = users.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  );

  return (
    <Box>
      {users.length === 0 ? (
        <Typography variant="h6" align="center" style={{ padding: "16px" }}>
          No users found.
        </Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Website</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.company.name}</TableCell>
                    <TableCell>{user.address.city}</TableCell>
                    <TableCell>{user.website}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{ mr: 1 }}
                        onClick={() => handleDetails(user)}
                      >
                        Details
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ mr: 1 }}
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ mr: 1 }}
                        onClick={() => handleDeletePrompt(user)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      <Box marginY={5}>
        <UserSubmission />
      </Box>
      <Box display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(users.length / USERS_PER_PAGE)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
      <UserAction
        open={isActionModalOpen}
        onClose={handleCloseActionModal}
        user={selectedUser}
        onSubmit={handleSubmit}
      />
      <UserDetails
        open={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        user={selectedUser}
      />
      <UserDelete
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDelete}
        user={selectedUser}
      />
    </Box>
  );
};

export default UserList;
