import React from "react";
import { Button, Grid, Paper, Typography, Box } from "@mui/material";

const SearchResults = ({ candidates, onEdit }) => {
  return (
    <Grid container spacing={4}>
      {candidates.length === 0 ? (
        <Grid item xs={12}>
          <Typography variant="h6" align="center" color="textSecondary">
            No candidates found. Try adjusting your filters.
          </Typography>
        </Grid>
      ) : (
        candidates.map((candidate) => (
          <Grid item xs={12} md={4} key={candidate.id}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Box>
                <Typography variant="h6" component="h2" gutterBottom>
                  {candidate.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Skills:</strong>{" "}
                  {Array.isArray(candidate.skills)
                    ? candidate.skills.join(", ")
                    : candidate.skills}
                </Typography>
                <Typography variant="body1">
                  <strong>Experience:</strong> {candidate.experience} years
                </Typography>
                <Typography variant="body1">
                  <strong>Location:</strong> {candidate.location}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onEdit(candidate)}
                  sx={{ mt: 2 }}
                >
                  Edit
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default SearchResults;
