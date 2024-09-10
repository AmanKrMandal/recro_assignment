import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";

const CandidateForm = ({ initialValues, onSubmit, editing }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    skills: Yup.string().required("Skills are required"),
    experience: Yup.number()
      .min(0, "Experience must be 0 or more")
      .required("Experience is required"),
    location: Yup.string().required("Location is required"),
  });

  return (
    <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: "#fff" }}>
      <Typography variant="h5" gutterBottom>
        {editing ? "Edit Candidate" : "Add New Candidate"}
      </Typography>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const updatedValues = {
            ...values,
            skills: values.skills.split(",").map((skill) => skill.trim()),
          };

          onSubmit(updatedValues);
          resetForm();
        }}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <Form>
            <Box mb={3}>
              <TextField
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Box>

            <Box mb={3}>
              <TextField
                label="Skills (Comma separated e.g., React, Node.js)"
                name="skills"
                value={values.skills}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                error={touched.skills && Boolean(errors.skills)}
                helperText={touched.skills && errors.skills}
              />
            </Box>

            <Box mb={3}>
              <TextField
                label="Experience (Years)"
                name="experience"
                type="number"
                value={values.experience}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                error={touched.experience && Boolean(errors.experience)}
                helperText={touched.experience && errors.experience}
              />
            </Box>

            <Box mb={3}>
              <TextField
                label="Location"
                name="location"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                error={touched.location && Boolean(errors.location)}
                helperText={touched.location && errors.location}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              {editing ? "Update Candidate" : "Add Candidate"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CandidateForm;
