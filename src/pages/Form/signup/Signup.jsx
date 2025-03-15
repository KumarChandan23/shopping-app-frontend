import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Captcha from "../../../component/captcha/Captcha";
import { toast } from "react-toastify";

const Signup = () => {

  const [isValidated, setIsValidated] = useState(false);
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { confirmPassword, ...userData } = values;
      await axios.post("http://localhost:9000/api/v1/users/register", JSON.stringify(userData), {
        headers: { "Content-Type": "application/json" }
      });
      toast.success("User Registerd Successfully....");
      setSubmitting(false);
      resetForm();
    } catch (error) {
      toast.error("Error Occured while Registering new user", error);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, handleChange, handleBlur, values, errors, touched }) => (
        <Box
          sx={{ maxWidth: "400px",mx: "auto",mt: 2,p: 3,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "white",
          }}
        >
          <Typography variant="h4" textAlign="center" gutterBottom>
            Signup
          </Typography>
          <Form>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="User Name"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
            </Box>
            <Captcha onValidate={setIsValidated} />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting || !isValidated}
            >
              {isSubmitting ? "Submitting..." : "Signup"}
            </Button>
          </Form>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2">
              Already have an account?
              <NavLink to="/login" style={{ color: "royalblue" }}> Login</NavLink>
            </Typography>
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default Signup;
