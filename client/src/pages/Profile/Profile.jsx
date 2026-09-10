import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/authService";

function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

const [formData, setFormData] = useState({
  name: "",
  phone: "",
  language: "",
});

const [loading, setLoading] = useState(false);

 // ================================
// Load Profile on Page Load
// ================================

useEffect(() => {
  fetchProfile();
}, []);

// ================================
// Fetch User Profile
// ================================

const fetchProfile = async () => {
  try {
    const currentUser = JSON.parse(
      localStorage.getItem("user")
    );

    const res = await API.get(
      "/users/profile",
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );

    setUser(res.data);

    setFormData({
      name: res.data.name || "",
      phone: res.data.phone || "",
      language: res.data.language || "",
    });

  } catch (error) {
    console.log(error);
  }
};

// ================================
// Handle Input Change
// ================================

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

// ================================
// Update Profile
// ================================

const updateProfile = async () => {
  try {

    setLoading(true);

    const currentUser = JSON.parse(
      localStorage.getItem("user")
    );

    await API.put(
      "/users/profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );

    alert("Profile Updated Successfully");

    setEditMode(false);

    fetchProfile();

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Error Updating Profile"
    );

  } finally {

    setLoading(false);

  }
};

// ================================
// Cancel Editing
// ================================

const cancelEdit = () => {

  setEditMode(false);

  setFormData({
    name: user.name || "",
    phone: user.phone || "",
    language: user.language || "",
  });

};

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <div
          className="spinner-border text-primary"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">

      {/* Profile Header */}

      <div
        className="shadow-lg mb-5"
        style={{
          background:
            "linear-gradient(135deg,#2563eb,#7c3aed)",
          color: "white",
          borderRadius: "20px",
        }}
      >
        <div className="row align-items-center p-5">

          <div className="col-md-3 text-center">

            <div
              className="rounded-circle mx-auto d-flex justify-content-center align-items-center"
              style={{
                width: "130px",
                height: "130px",
                background: "white",
                color: "#2563eb",
                fontSize: "55px",
                fontWeight: "bold",
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>

          </div>

          <div className="col-md-9">

            <h1 className="fw-bold">
              {user.name}
            </h1>

            <h5 className="mt-2">
              {user.email}
            </h5>

            <div className="mt-4">

              <span className="badge bg-warning text-dark fs-6 me-3">
                ⭐ {user.points} Points
              </span>

              <span className="badge bg-light text-dark fs-6">
                💎 {user.subscriptionPlan}
              </span>

            </div>

          </div>

        </div>
      </div>

      {/* Statistics */}

      <div className="row g-4 mb-5">

        <div className="col-md-4">
          <div
            className="card shadow border-0 text-center h-100"
            style={{ borderRadius: "18px" }}
          >
            <div className="card-body">
              <h1>⭐</h1>
              <h5>Total Points</h5>
              <h2 className="text-warning">
                {user.points}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card shadow border-0 text-center h-100"
            style={{ borderRadius: "18px" }}
          >
            <div className="card-body">
              <h1>💎</h1>
              <h5>Subscription</h5>
              <h2 className="text-primary">
                {user.subscriptionPlan}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card shadow border-0 text-center h-100"
            style={{ borderRadius: "18px" }}
          >
            <div className="card-body">
              <h1>📧</h1>
              <h5>Email Verified</h5>
              <h2 className="text-success">
                Yes
              </h2>
            </div>
          </div>
        </div>

      </div>

      {/* Account Information */}

      <div
        className="card shadow-lg border-0"
        style={{ borderRadius: "20px" }}
      >
        <div className="card-body p-5">

          <h3 className="fw-bold mb-4">
            👤 Account Information
          </h3>

          <table className="table table-borderless">

      <tbody>

<tr>
  <th width="220">Full Name</th>
  <td>
    {editMode ? (
      <input
        className="form-control"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
    ) : (
      user.name
    )}
  </td>
</tr>

<tr>
  <th>Email</th>
  <td>{user.email}</td>
</tr>

<tr>
  <th>Phone</th>
  <td>
    {editMode ? (
      <input
        className="form-control"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />
    ) : (
      user.phone || "Not Added"
    )}
  </td>
</tr>

<tr>
  <th>Language</th>
  <td>
    {editMode ? (
      <input
        className="form-control"
        name="language"
        value={formData.language}
        onChange={handleChange}
      />
    ) : (
      user.language || "Not Added"
    )}
  </td>
</tr>

<tr>
  <th>Subscription Plan</th>
  <td>
    <span className="badge bg-primary">
      {user.subscriptionPlan}
    </span>
  </td>
</tr>

<tr>
  <th>Reward Points</th>
  <td>
    <span className="badge bg-warning text-dark">
      {user.points}
    </span>
  </td>
</tr>

</tbody>

          </table>

         <div className="mt-4">

  {editMode ? (
    <>
      <button
        className="btn btn-success btn-lg me-3"
        onClick={updateProfile}
        disabled={loading}
      >
        {loading ? "Saving..." : "💾 Save Changes"}
      </button>

      <button
        className="btn btn-secondary btn-lg"
        onClick={() => setEditMode(false)}
      >
        Cancel
      </button>
    </>
  ) : (
    <>
      <button
        className="btn btn-primary btn-lg me-3"
        onClick={() => setEditMode(true)}
      >
        ✏ Edit Profile
      </button>

      <Link
        to="/plans"
        className="btn btn-warning btn-lg me-3"
      >
        💎 Upgrade Plan
      </Link>

      <Link
        to="/leaderboard"
        className="btn btn-outline-primary btn-lg"
      >
        🏆 Leaderboard
      </Link>
    </>
  )}

</div>

        </div>
      </div>

    </div>
  );
}

export default Profile;