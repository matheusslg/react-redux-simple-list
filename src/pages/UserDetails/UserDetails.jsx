import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, CardHeader, CardContent, Typography, Button, Box, CircularProgress, TextField } from '@mui/material';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';

/** Actions */
import { fetchUserById, updateUser, addUser } from '../../app/ducks/users';
import { toastMessage } from '../../app/ducks/toast';

const UserDetails = ({ isNewUser }) => {
  const { userId } = useParams();
  const { singleUser, fetched: fetchedUser } = useSelector(state => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userDetailsForm, setUserDetailsForm] = useState({
    initialValues: {
      name: '',
      email: '',
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required('This field is required'),
      email: Yup.string().email().required('This field is required'),
    }),
  });

  /**
   * Wait for userId URL param to get the user data from Redux
   */
  useEffect(() => {
    if (userId && !isNewUser) dispatch(fetchUserById(userId));
  }, [userId, isNewUser]);

  /**
   * Set the initial values for Formik and the 'onSubmit' fn for for button
   */
  useEffect(() => {
    if (Object.keys(singleUser).length && !isNewUser) {
      setUserDetailsForm({
        ...userDetailsForm,
        initialValues: {
          ...userDetailsForm.initialValues,
          name: singleUser.name,
          email: singleUser.email,
        },
        onSubmit: (values, bag) => handleUpdateUser(values, bag),
      });
    }
  }, [singleUser, isNewUser]);

  /**
   * Set the 'onSubmit' fn for form button
   */
  useEffect(() => {
    if (isNewUser) {
      setUserDetailsForm({
        ...userDetailsForm,
        onSubmit: (values, bag) => handleNewUser(values, bag),
      });
    }
  }, [isNewUser]);

  /**
   * Update the user locally inside the Redux
   */
  const handleUpdateUser = userDataValues => {
    dispatch(updateUser({ userId, userDataValues }));
    dispatch(toastMessage('User data updated successfully!'));
    navigate('/');
  };

  /**
   * Add a new user locally inside the Redux
   */
  const handleNewUser = userDataValues => {
    dispatch(addUser(userDataValues));
    dispatch(toastMessage('User created successfully!'));
    navigate('/');
  };

  /**
   * Redirects user to the initial page
   */
  const handleCancel = useCallback(() => navigate('/'), [navigate]);

  return (
    <Container>
      <Typography variant="h4" sx={{ marginTop: 2 }}>
        Dashboard
      </Typography>
      <Card sx={{ marginTop: 2, marginBottom: 2 }}>
        <CardHeader title={isNewUser ? 'New user' : 'User details'} />
        <CardContent>
          {fetchedUser || isNewUser ? (
            <Formik enableReinitialize {...userDetailsForm}>
              {formik => (
                <Form onSubmit={formik.handleSubmit}>
                  <Box
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <Field name="name">
                        {({ field, form }) => {
                          const showError = Boolean(form.touched[field.name] && form.errors[field.name]);
                          return (
                            <TextField
                              required
                              error={showError}
                              helperText={showError ? form.errors[field.name] : ''}
                              id="name"
                              label="Name"
                              value={formik.values.name}
                              onChange={e => formik.setFieldValue('name', e.target.value)}
                              onBlur={formik.handleBlur}
                            />
                          );
                        }}
                      </Field>
                      <Field name="email">
                        {({ field, form }) => {
                          const showError = Boolean(form.touched[field.name] && form.errors[field.name]);
                          return (
                            <TextField
                              required
                              error={showError}
                              helperText={showError ? form.errors[field.name] : ''}
                              id="email"
                              label="E-mail"
                              value={formik.values.email || ''}
                              onChange={e => formik.setFieldValue('email', e.target.value)}
                              onBlur={formik.handleBlur}
                            />
                          );
                        }}
                      </Field>
                    </div>
                  </Box>
                  <Box sx={{ display: 'flex', marginTop: 2 }} justifyContent="flex-end">
                    <Button sx={{ marginRight: 2 }} variant="contained" color="warning" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button variant="contained" type="submit" disabled={formik.isValidating || !formik.isValid || !formik.dirty}>
                      Submit
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          ) : (
            <Box sx={{ display: 'flex' }} justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserDetails;
