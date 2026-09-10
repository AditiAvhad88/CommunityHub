import { useEffect, useState } from "react";
import API from "../../services/authService";

function FriendRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch requests when page opens
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.get("/friends/requests", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log("Friend Requests:", res.data);

      setRequests(res.data);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Unable to load requests");
    } finally {
      setLoading(false);
    }
  };

  const acceptRequest = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await API.put(
        `/friends/accept/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Friend Request Accepted Successfully ✅");

      // Remove accepted request instantly
      setRequests((prev) => prev.filter((r) => r._id !== id));

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div
        className="shadow-lg mb-5"
        style={{
          background: "linear-gradient(135deg,#0d6efd,#6610f2)",
          color: "white",
          borderRadius: "20px",
        }}
      >
        <div className="p-5 text-center">
          <h1>📨 Friend Requests</h1>
          <p>Accept requests and grow your network.</p>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="card shadow text-center p-5">
          <h1>📭</h1>
          <h3>No Pending Requests</h3>
        </div>
      ) : (
        <div className="row">
          {requests.map((request) => (
            <div className="col-lg-6 mb-4" key={request._id}>
              <div className="card shadow border-0">
                <div className="card-body d-flex justify-content-between align-items-center">

                  <div className="d-flex align-items-center">

                    <div
                      className="rounded-circle d-flex justify-content-center align-items-center me-3"
                      style={{
                        width: "70px",
                        height: "70px",
                        background:
                          "linear-gradient(135deg,#2563eb,#7c3aed)",
                        color: "white",
                        fontSize: "28px",
                        fontWeight: "bold",
                      }}
                    >
                      {request.sender?.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h5>{request.sender?.name}</h5>
                      <p>{request.sender?.email}</p>
                      <span className="badge bg-warning text-dark">
                        Pending
                      </span>
                    </div>

                  </div>

                  <button
                    className="btn btn-success"
                    onClick={() => acceptRequest(request._id)}
                  >
                    ✔ Accept
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FriendRequests;