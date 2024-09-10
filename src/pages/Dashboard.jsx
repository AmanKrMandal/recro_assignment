import React, { useEffect, useState } from "react";
import { getCandidates } from "../services/apiService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const result = await getCandidates();
      setCandidates(result);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const skillCounts = candidates.reduce((acc, candidate) => {
    (candidate.skills && Array.isArray(candidate.skills)
      ? candidate.skills
      : []
    ).forEach((skill) => {
      acc[skill] = acc[skill] ? acc[skill] + 1 : 1;
    });
    return acc;
  }, {});

  const skillData = Object.keys(skillCounts).map((skill) => ({
    name: skill,
    count: skillCounts[skill],
  }));

  return (
    <div style={{ padding: "16px" }}>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}
      >
        Dashboard
      </h1>
      {skillData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={skillData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No skills data available.</p>
      )}
    </div>
  );
};

export default Dashboard;
