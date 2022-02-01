import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Box,
  CircularProgress,
} from '@mui/material';

import { fetchUsers } from '../../app/ducks/users';
import DeleteUserDialog from './components/DeleteUserDialog';

const Dashboard = () => {
  const { data: users, fetched: fetchedUsers } = useSelector(state => state.users);
  const deleteUserDialogRef = useRef();
  const [selectedUserToDelete, setSelectedUserToDelete] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Fetch users list on the first render
   */
  useEffect(() => {
    if (!fetchedUsers) dispatch(fetchUsers());
  }, [fetchedUsers]);

  /**
   * Redirects to the user details page to add a new user
   */
  const handleNewUser = useCallback(userId => navigate('/user-details/new'), [navigate]);

  /**
   * Redirects to the user details page to edit him
   */
  const handleEditUser = useCallback(userId => navigate(`/user-details/${userId}`), [navigate]);

  /**
   * Store the user to deleted data in a state to use inside the dialog
   */
  const handleDeleteUser = user => {
    setSelectedUserToDelete(user);
    deleteUserDialogRef.current.show();
  };

  const renderUsersList = useCallback(
    () => (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address?.city}</TableCell>
                <TableCell>
                  <Button variant="contained" color="warning" onClick={() => handleEditUser(user.id)}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => handleDeleteUser(user)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ),
    [users]
  );

  return (
    <Container>
      <Typography variant="h4" sx={{ marginTop: 2 }}>
        Dashboard
      </Typography>
      <Card sx={{ marginTop: 2, marginBottom: 2 }}>
        <CardHeader
          title="User list"
          action={
            <Button variant="contained" onClick={handleNewUser}>
              Add new
            </Button>
          }
        />
        <CardContent>
          {fetchedUsers ? (
            users.length ? (
              renderUsersList()
            ) : (
              <Box sx={{ display: 'flex' }} justifyContent="center" alignItems="center">
                No data available in table
              </Box>
            )
          ) : (
            <Box sx={{ display: 'flex' }} justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          )}
        </CardContent>
      </Card>
      <DeleteUserDialog ref={deleteUserDialogRef} userData={selectedUserToDelete} />
    </Container>
  );
};

export default Dashboard;
