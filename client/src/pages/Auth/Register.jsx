import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/authService";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();

    try {

      await API.post("/auth/register", {
        name,
        email,
        phone,
        password,
      });

      alert("Registration Successful");

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }

  };

  return (

    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#2563eb,#38bdf8)"
      }}
    >

      <div className="row min-vh-100 align-items-center">

        {/* LEFT */}

        <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-center text-white px-5">

          <h1
            className="fw-bold"
            style={{ fontSize: "55px" }}
          >
            🚀 Join Community Hub
          </h1>

          <h3 className="mt-4">
            Start Your Learning Journey
          </h3>

          <p
            className="mt-4"
            style={{
              fontSize: "20px",
              lineHeight: "35px",
              color: "#dbeafe",
            }}
          >
            Build your profile, connect with developers,
            share ideas, ask questions and become part
            of an amazing community.
          </p>

          <div className="mt-5">

            <div className="mb-3">
              ✅ Create Unlimited Posts
            </div>

            <div className="mb-3">
              ✅ Ask & Answer Questions
            </div>

            <div className="mb-3">
              ✅ Make Friends
            </div>

            <div className="mb-3">
              ✅ Earn Points
            </div>

            <div className="mb-3">
              ✅ Unlock Premium Plans
            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="col-lg-6 d-flex justify-content-center">

          <div
            className="card border-0 shadow-lg"
            style={{
              width: "460px",
              borderRadius: "25px",
            }}
          >

            <div className="card-body p-5">

              <div className="text-center">

                <div style={{ fontSize: "65px" }}>
                  📝
                </div>

                <h2 className="fw-bold mt-3">
                  Create Account
                </h2>

                <p className="text-muted">
                  Register to continue
                </p>

              </div>

              <form onSubmit={registerUser}>

                <div className="mb-3">

                  <label className="fw-bold">
                    Full Name
                  </label>

                  <div className="input-group mt-2">

                    <span className="input-group-text">
                      👤
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      required
                    />

                  </div>

                </div>

                <div className="mb-3">

                  <label className="fw-bold">
                    Email
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

                <div className="mb-3">

                  <label className="fw-bold">
                    Mobile Number
                  </label>

                  <div className="input-group mt-2">

                    <span className="input-group-text">
                      📱
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Mobile Number"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value)
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
                  className="btn btn-success w-100 py-2 fw-bold"
                  style={{
                    borderRadius: "12px",
                    fontSize: "18px",
                  }}
                >
                  Register
                </button>

              </form>

              <hr />

              <div className="text-center">

                Already have an account?

                <Link
                  to="/"
                  className="ms-2 fw-bold text-decoration-none"
                >
                  Login
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Register;