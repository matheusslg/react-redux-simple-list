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
  const [selectedUserToDelete, setSelectedUserToDelete] = useState({});
  const deleteUserDialogRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Fetch users list on the first render
   */
  useEffect(() => {
    if (!users.length) dispatch(fetchUsers());
  }, [users]);

  /**
   * Redirects to the user details page to add a new user
   */
  const handleNewUser = useCallback(() => navigate('/user'), [navigate]);

  /**
   * Redirects to the user details page to edit him
   */
  const handleEditUser = useCallback(userId => navigate(`/user/${userId}`), [navigate]);

  /**
   * Store the user to deleted data in a state to use inside the dialog
   */
  const handleDeleteUser = user => {
    setSelectedUserToDelete(user);
    deleteUserDialogRef.current.show();
  };

  return (
    <Container data-testid="Dashboard">
      <Typography variant="h4" sx={{ marginTop: 2 }}>
        Dashboard
      </Typography>
      <Card sx={{ marginTop: 2, marginBottom: 2 }}>
        <CardHeader
          title="User list"
          action={
            <Button variant="contained" onClick={handleNewUser} data-testid="AddUserButton">
              Add new
            </Button>
          }
        />
        <CardContent>
          {fetchedUsers ? (
            users.length ? (
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
                      <TableRow key={user.id} data-testid="UserRow">
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.address?.city}</TableCell>
                        <TableCell>
                          <Button variant="contained" color="warning" onClick={() => handleEditUser(user.id)} data-testid="EditButton">
                            Edit
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button variant="contained" color="error" onClick={() => handleDeleteUser(user)} data-testid="DeleteButton">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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
