import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Captcha from '../../../component/captcha/Captcha';


const Login = () => {

  const theme = createTheme();
  const [isvalidated, setIsValidated] = useState(false)
  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required')
  });

  const navigate = useNavigate();

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { data } = await axios.get('http://localhost:8000/users');

      const response = data.find(user => user.email === values.email && user.password === values.password);
      if (!response) {
        alert('Invalid email or password');
        return;
      }

      localStorage.setItem("userid", response.id);
      setSubmitting(false);
      resetForm();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

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
                <Captcha onValidate={setIsValidated} />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting || !isvalidated}
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