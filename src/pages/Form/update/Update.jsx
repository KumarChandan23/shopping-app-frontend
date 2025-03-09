import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import Captcha from "../../../component/captcha/Captcha";

const validationSchema = Yup.object({
  username: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const Update = () => {
  const [isValidated, setIsValidated] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Form data submitted:", values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        width: { xs: "90%", sm: "75%", md: "50%", lg: "40%" },
        mt: 4,
        p: { xs: 2, sm: 3 },
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        backgroundColor: "white",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", mb: 3, fontSize: { xs: "1.5rem", sm: "2rem" } }}
      >
        Update Account
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <Box sx={{ mb: 2 }}>
              <Field
                as={TextField}
                fullWidth
                label="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Field
                as={TextField}
                fullWidth
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Field
                as={TextField}
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
              <Field
                as={TextField}
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

            {/* Captcha Validation */}
            <Captcha onValidate={setIsValidated} />

            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={!isValidated || isSubmitting} // Disable until CAPTCHA is validated
              sx={{
                mt: 2,
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Update;
