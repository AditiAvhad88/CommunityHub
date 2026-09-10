import { useEffect, useState } from "react";
import API from "../../services/authService";

function Friends() {

  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await API.get(
        "/friends",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setFriends(res.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
            👥 My Friends
          </h1>

          <p className="fs-5 mb-0">
            Stay connected with your community.
          </p>

        </div>
      </div>

      {/* Empty State */}

      {friends.length === 0 ? (

        <div
          className="card shadow-lg border-0 text-center p-5"
          style={{
            borderRadius: "20px",
          }}
        >

          <h1 style={{ fontSize: "70px" }}>
            👥
          </h1>

          <h3>No Friends Yet</h3>

          <p className="text-muted">
            Send a friend request and start connecting.
          </p>

        </div>

      ) : (

        <div className="row">

          {friends.map((friend) => (

            <div
              key={friend._id}
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
                    "translateY(-5px)";
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
                      width: "80px",
                      height: "80px",
                      background:
                        "linear-gradient(135deg,#2563eb,#7c3aed)",
                      color: "white",
                      fontSize: "32px",
                      fontWeight: "bold",
                    }}
                  >
                    {friend.name
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>

                  <h4 className="fw-bold">
                    {friend.name}
                  </h4>

                  <p className="text-muted">
                    {friend.email}
                  </p>

                  <span className="badge bg-warning text-dark fs-6">
                    ⭐ {friend.points} Points
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Friends;
