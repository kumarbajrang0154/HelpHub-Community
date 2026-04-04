import React, { useEffect, useState } from "react";
import axios from "../../services/axios";

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("/api/request/my");

        // ✅ SAFE CHECK
        if (res?.data?.requests) {
          setRequests(res.data.requests);
        } else {
          setRequests([]);
        }

      } catch (err) {
        console.error("API ERROR:", err);

        // ✅ show error instead of white screen
        setError(
          err?.response?.data?.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="p-6 text-white min-h-screen bg-black">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* ✅ LOADING */}
      {loading && <p>Loading...</p>}

      {/* ✅ ERROR */}
      {error && (
        <p className="text-red-500">Error: {error}</p>
      )}

      {/* ✅ DATA */}
      {!loading && !error && requests.length === 0 && (
        <p>No requests found</p>
      )}

      {!loading && !error && requests.length > 0 && (
        <div className="grid gap-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-gray-800 p-4 rounded-xl shadow-md"
            >
              <h2 className="text-lg font-semibold">
                {req.title || "No Title"}
              </h2>

              <p className="text-gray-400">
                {req.description || "No Description"}
              </p>

              <span className="text-sm mt-2 inline-block">
                Status: {req.status || "pending"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;