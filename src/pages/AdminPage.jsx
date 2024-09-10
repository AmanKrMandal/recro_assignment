import React, { useState, useEffect } from "react";
import {
  getCandidates,
  addCandidate,
  updateCandidate,
  deleteCandidate,
} from "../services/apiService";
import CandidateForm from "../components/CandidateForm";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from "@mui/material";

const AdminPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [editingCandidate, setEditingCandidate] = useState(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    const candidates = await getCandidates();
    setCandidates(candidates);
  };

  const handleAddCandidate = async (candidateData) => {
    await addCandidate(candidateData);
    fetchCandidates();
  };

  const handleEditCandidate = (candidate) => {
    setEditingCandidate({
      ...candidate,
      skills: Array.isArray(candidate.skills)
        ? candidate.skills.join(", ")
        : candidate.skills,
    });
  };

  const handleUpdateCandidate = async (id, candidateData) => {
    await updateCandidate(id, candidateData);
    setEditingCandidate(null);
    fetchCandidates();
  };

  const handleDeleteCandidate = async (id) => {
    await deleteCandidate(id);
    fetchCandidates();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Page - Manage Candidates
      </Typography>

      <CandidateForm
        initialValues={
          editingCandidate || {
            name: "",
            skills: "",
            experience: "",
            location: "",
          }
        }
        onSubmit={
          editingCandidate
            ? (data) => handleUpdateCandidate(editingCandidate.id, data)
            : handleAddCandidate
        }
        editing={!!editingCandidate}
      />

      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          Candidates List
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Skills</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {candidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>{candidate.name}</TableCell>
                  <TableCell>
                    {Array.isArray(candidate.skills)
                      ? candidate.skills.join(", ")
                      : candidate.skills || "N/A"}
                  </TableCell>
                  <TableCell>{candidate.experience}</TableCell>
                  <TableCell>{candidate.location}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditCandidate(candidate)}
                      sx={{ mr: 2 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteCandidate(candidate.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AdminPage;
