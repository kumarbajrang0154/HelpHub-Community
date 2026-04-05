import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import { getProfile } from "../../services/authApi";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const profileData = await getProfile();
        setUser(profileData);

        // Fetch user requests
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
          err?.response?.data?.message || err.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 text-white min-h-screen bg-black">
      {/* ✅ LOADING */}
      {loading && <p className="text-center">Loading...</p>}

      {/* ✅ ERROR */}
      {error && (
        <p className="text-red-500 text-center">Error: {error}</p>
      )}

      {/* ✅ USER PROFILE SECTION */}
      {!loading && user && (
        <div className="mb-8 bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800">
          <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Full Name</p>
              <p className="text-lg font-semibold">{user.name}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Email Address</p>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* ✅ REQUESTS SECTION */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Requests</h2>

        {!loading && !error && requests.length === 0 && (
          <p className="text-gray-400">No requests found</p>
        )}

        {!loading && !error && requests.length > 0 && (
          <div className="grid gap-4">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 hover:border-gray-600 transition"
              >
                <h3 className="text-lg font-semibold">
                  {req.title || "No Title"}
                </h3>

                <p className="text-gray-300 mt-2">
                  {req.description || "No Description"}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm inline-block bg-blue-900 px-3 py-1 rounded">
                    Status: <span className="font-semibold">{req.status || "pending"}</span>
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;