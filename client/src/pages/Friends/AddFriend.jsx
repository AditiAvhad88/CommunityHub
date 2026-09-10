import { useEffect, useState } from "react";
import API from "../../services/authService";

function AddFriend() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {

    try {

      const currentUser = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await API.get(
        "/auth/users",
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      setUsers(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const sendRequest = async (id) => {

    try {

      const currentUser = JSON.parse(
        localStorage.getItem("user")
      );

      await API.post(
        "/friends/send",
        {
          receiverId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      alert("Friend Request Sent Successfully ✅");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong."
      );

    }

  };

  if (loading) {
    return (
      <div className="container text-center mt-5">

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

      {/* Header */}

      <div
        className="shadow-lg mb-5"
        style={{
          background:
            "linear-gradient(135deg,#2563eb,#7c3aed)",
          color: "white",
          borderRadius: "20px",
        }}
      >

        <div className="p-5 text-center">

          <h1 className="fw-bold">
            ➕ Find Friends
          </h1>

          <p className="fs-5 mb-0">
            Connect with developers in the Community Hub.
          </p>

        </div>

      </div>

      {/* Empty */}

      {users.length === 0 ? (

        <div
          className="card shadow-lg border-0 text-center p-5"
          style={{
            borderRadius: "20px",
          }}
        >

          <h1 style={{ fontSize: "70px" }}>
            👥
          </h1>

          <h3>No Users Found</h3>

          <p className="text-muted">
            There are currently no users available.
          </p>

        </div>

      ) : (

        <div className="row">

          {users.map((user) => (

            <div
              key={user._id}
              className="col-lg-4 col-md-6 mb-4"
            >

              <div
                className="card border-0 shadow-lg h-100"
                style={{
                  borderRadius: "18px",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-6px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0px)";
                }}
              >

                <div className="card-body text-center">

                  <div
                    className="rounded-circle mx-auto mb-3 d-flex justify-content-center align-items-center"
                    style={{
                      width: "85px",
                      height: "85px",
                      background:
                        "linear-gradient(135deg,#2563eb,#7c3aed)",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "34px",
                    }}
                  >
                    {user.name
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>

                  <h4 className="fw-bold">
                    {user.name}
                  </h4>

                  <p className="text-muted">
                    {user.email}
                  </p>

                  <div className="mb-3">

                    <span className="badge bg-warning text-dark me-2">
                      ⭐ {user.points}
                    </span>

                    <span className="badge bg-primary">
                      💎 {user.subscriptionPlan}
                    </span>

                  </div>

                  <button
                    className="btn btn-success rounded-pill px-4"
                    onClick={() =>
                      sendRequest(user._id)
                    }
                  >
                    ➕ Add Friend
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

export default AddFriend;