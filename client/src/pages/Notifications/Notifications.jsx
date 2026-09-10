import { useEffect, useState } from "react";
import API from "../../services/authService";

function Notifications() {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {

      const currentUser = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await API.get(
        "/notifications",
        {
          headers: {
            Authorization:
              `Bearer ${currentUser.token}`,
          },
        }
      );

      setNotifications(res.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {

    try {

      const currentUser = JSON.parse(
        localStorage.getItem("user")
      );

      await API.put(
        `/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${currentUser.token}`,
          },
        }
      );

      fetchNotifications();

    } catch (error) {
      console.log(error);
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
            🔔 Notifications
          </h1>

          <p className="fs-5 mb-0">
            Stay updated with your latest activities
          </p>

        </div>
      </div>

      {/* EMPTY */}

      {notifications.length === 0 ? (

        <div
          className="card shadow-lg border-0 text-center p-5"
          style={{
            borderRadius: "20px",
          }}
        >

          <h1 style={{ fontSize: "70px" }}>
            📭
          </h1>

          <h3>No Notifications</h3>

          <p className="text-muted">
            You're all caught up!
          </p>

        </div>

      ) : (

        notifications.map((item) => (

          <div
            key={item._id}
            className="card shadow-lg border-0 mb-4"
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

              <div className="d-flex justify-content-between align-items-start">

                <div className="d-flex">

                  <div
                    className="rounded-circle me-3"
                    style={{
                      width: "18px",
                      height: "18px",
                      marginTop: "8px",
                      background:
                        item.isRead
                          ? "#9ca3af"
                          : "#22c55e",
                    }}
                  ></div>

                  <div>

                    <h5 className="fw-bold">

                      {item.message}

                    </h5>

                    <small className="text-muted">

                      {new Date(
                        item.createdAt
                      ).toLocaleString()}

                    </small>

                  </div>

                </div>

                {!item.isRead && (

                  <button
                    className="btn btn-success btn-sm"
                    onClick={() =>
                      markAsRead(item._id)
                    }
                  >
                    ✔ Mark Read
                  </button>

                )}

              </div>

            </div>

          </div>

        ))

      )}

    </div>
  );
}

export default Notifications;