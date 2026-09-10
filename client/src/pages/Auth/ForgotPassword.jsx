import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/authService";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const forgotPassword = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/forgot-password",
        {
          email,
          phone,
        }
      );

      setNewPassword(res.data.newPassword);

      alert("Password Reset Successfully");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong"
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

        {/* Left Side */}

        <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-center text-white px-5">

          <h1
            className="fw-bold"
            style={{ fontSize: "55px" }}
          >
            🔐 Forgot Password
          </h1>

          <h3 className="mt-4">
            Recover Your Account
          </h3>

          <p
            className="mt-4"
            style={{
              fontSize: "20px",
              lineHeight: "35px",
              color: "#dbeafe",
            }}
          >
            Enter your registered Email or Mobile Number.
            We'll generate a new password for you.
          </p>

          <div className="mt-5">

            <div className="mb-3">
              ✅ Fast Recovery
            </div>

            <div className="mb-3">
              ✅ Secure Reset
            </div>

            <div className="mb-3">
              ✅ One Reset Per Day
            </div>

          </div>

        </div>

        {/* Right Side */}

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
                  🔑
                </div>

                <h2 className="fw-bold mt-3">
                  Reset Password
                </h2>

                <p className="text-muted">
                  Enter your registered details
                </p>

              </div>

              <form onSubmit={forgotPassword}>

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
                    />

                  </div>

                </div>

                <div className="mb-4">

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
                    />

                  </div>

                </div>

                <button
                  className="btn btn-warning w-100 py-2 fw-bold"
                  style={{
                    borderRadius: "12px",
                    fontSize: "18px",
                  }}
                >
                  Reset Password
                </button>

              </form>

              {newPassword && (

                <div
                  className="alert alert-success mt-4"
                >

                  <h5>Your New Password</h5>

                  <h4 className="fw-bold">
                    {newPassword}
                  </h4>

                  <small>
                    Please save it and login again.
                  </small>

                </div>

              )}

              <hr />

              <div className="text-center">

                <Link
                  to="/"
                  className="text-decoration-none fw-bold"
                >
                  ← Back to Login
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ForgotPassword;