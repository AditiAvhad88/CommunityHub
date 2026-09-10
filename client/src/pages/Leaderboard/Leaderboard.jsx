import { useEffect, useState } from "react";
import API from "../../services/authService";

function Leaderboard() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {

    try {

      const currentUser = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await API.get(
        "/users/leaderboard",
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

  const medal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return "🏅";
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

      {/* HEADER */}

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
            🏆 Leaderboard
          </h1>

          <p className="fs-5 mb-0">
            Top Contributors of Community Hub
          </p>

        </div>
      </div>

      {/* USERS */}

      {users.map((user, index) => (

        <div
          key={user._id}
          className="card border-0 shadow-lg mb-4"
          style={{
            borderRadius: "18px",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0px)";
          }}
        >

          <div className="card-body">

            <div className="row align-items-center">

              {/* Rank */}

              <div className="col-md-1 text-center">

                <h2>
                  {medal(index)}
                </h2>

                <h6>
                  #{index + 1}
                </h6>

              </div>

              {/* Avatar */}

              <div className="col-md-2 text-center">

                <div
                  className="rounded-circle mx-auto d-flex justify-content-center align-items-center"
                  style={{
                    width: "70px",
                    height: "70px",
                    background:
                      "linear-gradient(135deg,#2563eb,#7c3aed)",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "28px",
                  }}
                >
                  {user.name
                    ?.charAt(0)
                    .toUpperCase()}
                </div>

              </div>

              {/* User Info */}

              <div className="col-md-5">

                <h4 className="fw-bold">
                  {user.name}
                </h4>

                <p className="text-muted mb-0">
                  {user.email}
                </p>

              </div>

              {/* Points */}

              <div className="col-md-2 text-center">

                <span className="badge bg-warning text-dark fs-6">
                  ⭐ {user.points} pts
                </span>

              </div>

              {/* Plan */}

              <div className="col-md-2 text-center">

                <span className="badge bg-primary fs-6">
                  💎 {user.subscriptionPlan}
                </span>

              </div>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default Leaderboard;

