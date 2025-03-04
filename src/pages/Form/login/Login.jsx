import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { TextField, Button, Container, Typography, Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const theme = createTheme();

const initialValues = {
  email: '',
  password: ''
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required')
});

const onSubmit = async (values, { setSubmitting, resetForm }) => {
  try {
    const {data} = await axios.get('http://localhost:8000/users');

    const response = data.find(user => user.email === values.email && user.password === values.password);
    if(!response) {
      alert('Invalid email or password');
      return;
    }

    localStorage.setItem("userid", response.id);
    console.log(response);
    console.log(values)
    setSubmitting(false);
    resetForm();
  } catch (error) {
    console.error(error);
  }
};

const Login = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Login
          </Typography>
          <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, handleChange, handleBlur, values, touched, errors }) => (
              <Form>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  label="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                  sx={{ mt: 3 }}
                >
                 {isSubmitting ? 'Submitting..' : 'Login'}
                </Button>
              </Form>
            )}
          </Formik>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Don't have an account? 
              <NavLink to="/signup" style={{ color: 'royalblue' }}> Signup</NavLink>
            </Typography>
            </Box>
        </Box>
      </Container>  
    </ThemeProvider>
  );
};

export default Login;