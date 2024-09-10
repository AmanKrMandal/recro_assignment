import axios from "axios";

const BASE_URL =
  "https://66e038ff2fb67ac16f28d1a2.mockapi.io/api/candidates/data";

// Fetch all candidates
export const getCandidates = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    throw error;
  }
};

// Fetch a single candidate by ID
export const getCandidateById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching candidate with ID ${id}:`, error);
    throw error;
  }
};

// Add a new candidate
export const addCandidate = async (candidateData) => {
  try {
    const response = await axios.post(BASE_URL, candidateData);
    return response.data;
  } catch (error) {
    console.error("Error adding candidate:", error);
    throw error;
  }
};

// Update an existing candidate by ID
export const updateCandidate = async (id, candidateData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, candidateData);
    return response.data;
  } catch (error) {
    console.error(`Error updating candidate with ID ${id}:`, error);
    throw error;
  }
};

// Delete a candidate by ID
export const deleteCandidate = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting candidate with ID ${id}:`, error);
    throw error;
  }
};
