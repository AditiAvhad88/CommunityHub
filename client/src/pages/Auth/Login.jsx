import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Login Successful!");

      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
      }}
    >
      <div className="row min-vh-100 align-items-center">

        {/* LEFT SIDE */}

        <div className="col-lg-6 text-white d-none d-lg-flex flex-column justify-content-center px-5">

          <h1
            className="fw-bold"
            style={{
              fontSize: "55px",
            }}
          >
            🌍 Community Hub
          </h1>

          <h3 className="mt-4">
            Connect. Learn. Grow.
          </h3>

          <p
            className="mt-4"
            style={{
              fontSize: "20px",
              lineHeight: "35px",
              color: "#dbeafe",
            }}
          >
            Join thousands of developers,
            ask questions,
            share knowledge,
            make friends,
            earn points,
            and unlock premium features.
          </p>

          <div className="mt-5">

            <div className="mb-3">
              ✅ Ask Technical Questions
            </div>

            <div className="mb-3">
              ✅ Share Posts
            </div>

            <div className="mb-3">
              ✅ Earn Reward Points
            </div>

            <div className="mb-3">
              ✅ Connect With Friends
            </div>

            <div className="mb-3">
              ✅ Premium Subscription
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="col-lg-6 d-flex justify-content-center">

          <div
            className="card border-0 shadow-lg"
            style={{
              width: "430px",
              borderRadius: "25px",
              backdropFilter: "blur(20px)",
            }}
          >

            <div className="card-body p-5">

              <div className="text-center">

                <div
                  style={{
                    fontSize: "70px",
                  }}
                >
                  👋
                </div>

                <h2 className="fw-bold mt-3">
                  Welcome Back
                </h2>

                <p className="text-muted">
                  Login to continue
                </p>

              </div>

              <form onSubmit={loginUser}>

                <div className="mb-4">

                  <label className="fw-bold">
                    Email Address
                  </label>

                  <div className="input-group mt-2">

                    <span className="input-group-text">
                      📧
                    </span>

                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      required
                    />

                  </div>

                </div>

                <div className="mb-4">

                  <label className="fw-bold">
                    Password
                  </label>

                  <div className="input-group mt-2">

                    <span className="input-group-text">
                      🔒
                    </span>

                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      required
                    />

                  </div>

                </div>

                <button
                  className="btn btn-primary w-100 py-2 fw-bold"
                  style={{
                    borderRadius: "12px",
                    fontSize: "18px",
                  }}
                >
                  Login
                </button>

              </form>

              <div className="text-center mt-4">

                <Link
                  to="/forgot-password"
                  className="text-decoration-none"
                >
                  Forgot Password?
                </Link>

              </div>

              <hr />

              <div className="text-center">

                <p>

                  Don't have an account?

                  <Link
                    to="/register"
                    className="ms-2 fw-bold text-decoration-none"
                  >
                    Register
                  </Link>

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;