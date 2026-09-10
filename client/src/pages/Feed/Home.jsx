import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/authService";
import PostCard from "../../components/PostCard";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

 const [posts, setPosts] = useState([]);

const [profile, setProfile] = useState({
  points: 0,
  subscriptionPlan: "FREE",
});

const [notifications, setNotifications] = useState([]);
const [friends, setFriends] = useState([]);
const [questions, setQuestions] = useState([]);

  useEffect(() => {
  fetchPosts();
  fetchDashboardData();
}, []);

 const fetchDashboardData = async () => {
  try {
    const headers = {
      Authorization: `Bearer ${user.token}`,
    };

    const [
      profileRes,
      notificationRes,
      friendRes,
      questionRes,
    ] = await Promise.all([
      API.get("/users/profile", { headers }),
      API.get("/notifications", { headers }),
      API.get("/friends", { headers }),
      API.get("/questions", { headers }),
    ]);

    setProfile(profileRes.data);
    setNotifications(notificationRes.data);
    setFriends(friendRes.data);
    setQuestions(questionRes.data);

  } catch (error) {
    console.log(error);
  }
};
  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const menu = [
    {
      title: "Create Post",
      icon: "📝",
      color: "primary",
      path: "/create-post",
    },
    {
      title: "Ask Question",
      icon: "❓",
      color: "success",
      path: "/ask-question",
    },
    {
      title: "My Profile",
      icon: "👤",
      color: "warning",
      path: "/profile",
    },
    {
      title: "Leaderboard",
      icon: "🏆",
      color: "info",
      path: "/leaderboard",
    },
    {
      title: "Notifications",
      icon: "🔔",
      color: "danger",
      path: "/notifications",
    },
    {
      title: "Friends",
      icon: "👥",
      color: "secondary",
      path: "/friends",
    },
    {
      title: "Add Friend",
      icon: "➕",
      color: "primary",
      path: "/add-friend",
    },
    {
      title: "Friend Requests",
      icon: "📨",
      color: "warning",
      path: "/friend-requests",
    },
    {
      title: "Subscription",
      icon: "💎",
      color: "dark",
      path: "/plans",
    },
    {
      title: "Public Feed",
      icon: "🌍",
      color: "success",
      path: "/public-feed",
    },
  ];

  return (
    <div className="container py-4">

      {/* HERO SECTION */}

      <div
        className="shadow-lg mb-5"
        style={{
          background:
            "linear-gradient(135deg,#0f172a,#1e293b)",
          color: "white",
          borderRadius: "20px",
        }}
      >
        <div className="row align-items-center p-5">

          <div className="col-md-8">

            <h1
              className="fw-bold"
              style={{
                fontSize: "30px",
              }}
            >
              Community Hub
            </h1>

            <h3 className="mt-4">
              Welcome back,
              <span className="text-warning">
                {" "}
                {user?.name}
              </span>{" "}
              👋
            </h3>

            <p
              className="mt-3"
              style={{
                fontSize: "20px",
                color: "#d1d5db",
              }}
            >
              Connect with developers, ask questions,
              share knowledge and earn reward points.
            </p>

            <div className="mt-4">

              <Link
                to="/create-post"
                className="btn btn-primary btn-lg me-3"
              >
                📝 Create Post
              </Link>

              <Link
                to="/ask-question"
                className="btn btn-warning btn-lg"
              >
                ❓ Ask Question
              </Link>

            </div>

          </div>

          <div className="col-md-4 text-center">

            <div
              style={{
                fontSize: "110px",
              }}
            >
              🌍
            </div>

            <h4 className="mt-3">
              Learn • Share • Grow
            </h4>

          </div>

        </div>
      </div>


<div className="row g-4 mb-5">

  <div className="col-lg-2 col-md-4 col-6">
    <div
      className="card border-0 shadow-lg text-center h-100"
      style={{
        background: "linear-gradient(135deg,#4f46e5,#6366f1)",
        color: "white",
        borderRadius: "20px",
      }}
    >
      <div className="card-body py-4">
        <div style={{ fontSize: "45px" }}>📝</div>
        <h6>Total Posts</h6>
        <h2>{posts.length}</h2>
      </div>
    </div>
  </div>

  <div className="col-lg-2 col-md-4 col-6">
    <div
      className="card border-0 shadow-lg text-center h-100"
      style={{
        background: "linear-gradient(135deg,#16a34a,#22c55e)",
        color: "white",
        borderRadius: "20px",
      }}
    >
      <div className="card-body py-4">
        <div style={{ fontSize: "45px" }}>❓</div>
        <h6>Questions</h6>
        <h2>{questions.length}</h2>
      </div>
    </div>
  </div>

  <div className="col-lg-2 col-md-4 col-6">
    <div
      className="card border-0 shadow-lg text-center h-100"
      style={{
        background: "linear-gradient(135deg,#0284c7,#38bdf8)",
        color: "white",
        borderRadius: "20px",
      }}
    >
      <div className="card-body py-4">
        <div style={{ fontSize: "45px" }}>👥</div>
        <h6>Friends</h6>
        <h2>{friends.length}</h2>
      </div>
    </div>
  </div>

  <div className="col-lg-2 col-md-4 col-6">
    <div
      className="card border-0 shadow-lg text-center h-100"
      style={{
        background: "linear-gradient(135deg,#ca8a04,#facc15)",
        color: "white",
        borderRadius: "20px",
      }}
    >
      <div className="card-body py-4">
        <div style={{ fontSize: "45px" }}>⭐</div>
        <h6>Points</h6>
        <h2>{profile.points}</h2>
      </div>
    </div>
  </div>

  <div className="col-lg-2 col-md-4 col-6">
    <div
      className="card border-0 shadow-lg text-center h-100"
      style={{
        background: "linear-gradient(135deg,#7c3aed,#a855f7)",
        color: "white",
        borderRadius: "20px",
      }}
    >
      <div className="card-body py-4">
        <div style={{ fontSize: "45px" }}>💎</div>
        <h6>Plan</h6>
        <h5>{profile.subscriptionPlan}</h5>
      </div>
    </div>
  </div>

  <div className="col-lg-2 col-md-4 col-6">
    <div
      className="card border-0 shadow-lg text-center h-100"
      style={{
        background: "linear-gradient(135deg,#dc2626,#ef4444)",
        color: "white",
        borderRadius: "20px",
      }}
    >
      <div className="card-body py-4">
        <div style={{ fontSize: "45px" }}>🔔</div>
        <h6>Alerts</h6>
        <h2>{notifications.length}</h2>
      </div>
    </div>
  </div>

</div>
      {/* DASHBOARD */}

     {/* QUICK ACTIONS */}

<h2 className="fw-bold mb-4">
  ⚡ Quick Actions
</h2>

<div className="row g-4">

        {menu.map((item, index) => (

          <div
            className="col-lg-4 col-md-6"
            key={index}
          >

            <Link
              to={item.path}
              className="text-decoration-none"
            >

              <div
                className={`card border-${item.color} shadow h-100`}
                style={{
                  borderRadius: "14px",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0px 15px 35px rgba(0,0,0,.18)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0px)";
                  e.currentTarget.style.boxShadow =
                    "";
                }}
              >

                <div
                  className="card-body text-center"
                  style={{
                    padding: "40px",
                  }}
                >

                  <div
                    style={{
                      fontSize: "55px",
                    }}
                  >
                    {item.icon}
                  </div>

                  <h4
                    className="mt-3 fw-bold"
                  >
                    {item.title}
                  </h4>

                </div>

              </div>

            </Link>

          </div>

        ))}

      </div>

      {/* POSTS */}

      <div className="mt-5">

        <h2 className="fw-bold mb-2">
  📰 Community Feed
</h2>

<p className="text-muted mb-4">
  Discover what members of the Community Hub are sharing today.
</p>

        {posts.length === 0 ? (

          <div className="alert alert-info">
            No Posts Available
          </div>

        ) : (

          posts.map((post) => (

            <div
              key={post._id}
              className="mb-4"
            >
              <PostCard post={post} />
            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Home;