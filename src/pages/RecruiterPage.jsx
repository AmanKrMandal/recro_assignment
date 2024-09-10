import React, { useState, useEffect } from "react";
import { getCandidates, updateCandidate } from "../services/apiService";
import SearchResults from "../components/SearchResults";
import CandidateForm from "../components/CandidateForm"; // Import CandidateForm
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TextField, Button, Box, Typography } from "@mui/material";

const RecruiterPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [editingCandidate, setEditingCandidate] = useState(null); // Track the candidate being edited

  const [skillsFilter, setSkillsFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    const candidatesData = await getCandidates();
    setCandidates(candidatesData);
    setFilteredCandidates(candidatesData);
  };

  const handleSearch = () => {
    let filtered = candidates;

    // Handle skills filter
    if (skillsFilter) {
      filtered = filtered.filter((candidate) =>
        Array.isArray(candidate.skills)
          ? candidate.skills
              .join(", ")
              .toLowerCase()
              .includes(skillsFilter.toLowerCase())
          : (candidate.skills || "")
              .toLowerCase()
              .includes(skillsFilter.toLowerCase())
      );
    }

    if (experienceFilter) {
      filtered = filtered.filter(
        (candidate) => candidate.experience >= Number(experienceFilter)
      );
    }

    if (locationFilter) {
      filtered = filtered.filter((candidate) =>
        candidate.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredCandidates(filtered);
  };

  const handleEditCandidate = (candidate) => {
    setEditingCandidate(candidate); // Set the selected candidate for editing
  };

  const handleUpdateCandidate = async (id, candidateData) => {
    await updateCandidate(id, candidateData);
    setEditingCandidate(null); // Reset the form after update
    fetchCandidates(); // Fetch updated candidates
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Recruiter Page - Search Candidates
      </Typography>

      {/* Search Filters */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 4,
        }}
      >
        <TextField
          label="Skills (e.g., React, Node.js)"
          value={skillsFilter}
          onChange={(e) => setSkillsFilter(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Minimum Experience (Years)"
          value={experienceFilter}
          onChange={(e) => setExperienceFilter(e.target.value)}
          type="number"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ height: "fit-content" }}
        >
          Search
        </Button>
      </Box>

      {editingCandidate && (
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Edit Candidate
          </Typography>
          <CandidateForm
            initialValues={editingCandidate}
            onSubmit={(data) =>
              handleUpdateCandidate(editingCandidate.id, data)
            }
            editing={!!editingCandidate}
          />
        </Box>
      )}

      {/* Search Results Grid */}
      <Box mb={4}>
        <SearchResults
          candidates={filteredCandidates}
          onEdit={handleEditCandidate}
        />
      </Box>

      {/* Candidates Data Visualization */}
      <Typography variant="h5" gutterBottom>
        Candidates Experience Chart
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={filteredCandidates} layout="vertical">
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="experience" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RecruiterPage;
