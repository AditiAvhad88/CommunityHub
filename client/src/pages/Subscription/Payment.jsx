import { useLocation, useNavigate } from "react-router-dom";
import API from "../../services/authService";

function Payment() {

  const location = useLocation();
  const navigate = useNavigate();

  const { plan, amount } = location.state || {};

  const makePayment = async () => {

    try {

      const currentUser = JSON.parse(
        localStorage.getItem("user")
      );

      await API.put(
        "/users/subscription",
        {
          plan,
        },
        {
          headers: {
            Authorization:
              `Bearer ${currentUser.token}`,
          },
        }
      );

      alert("Payment Successful ✅");

      navigate("/invoice", {
        state: {
          plan,
          amount,
        },
      });

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Payment Failed"
      );

    }

  };

  return (

    <div className="container py-5">

      {/* Header */}

      <div
        className="shadow-lg mb-5"
        style={{
          background:
            "linear-gradient(135deg,#0f172a,#2563eb)",
          color: "white",
          borderRadius: "20px",
        }}
      >

        <div className="p-5 text-center">

          <h1 className="fw-bold">
            💳 Secure Payment
          </h1>

          <p className="fs-5 mb-0">
            Complete your subscription securely.
          </p>

        </div>

      </div>

      <div className="row">

        {/* Payment Summary */}

        <div className="col-lg-8">

          <div
            className="card shadow-lg border-0"
            style={{
              borderRadius: "20px",
            }}
          >

            <div className="card-body p-4">

              <h3 className="fw-bold mb-4">
                Order Summary
              </h3>

              <table className="table">

                <tbody>

                  <tr>

                    <td>
                      Subscription Plan
                    </td>

                    <td className="fw-bold">
                      {plan}
                    </td>

                  </tr>

                  <tr>

                    <td>
                      Amount
                    </td>

                    <td className="fw-bold text-success">
                      ₹{amount}
                    </td>

                  </tr>

                  <tr>

                    <td>
                      GST
                    </td>

                    <td>
                      Included
                    </td>

                  </tr>

                  <tr>

                    <td>
                      Payment Method
                    </td>

                    <td>
                      Community Hub Secure Payment
                    </td>

                  </tr>

                </tbody>

              </table>

              <div className="text-end mt-4">

                <h3 className="text-primary">

                  Total : ₹{amount}

                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* Payment Card */}

        <div className="col-lg-4">

          <div
            className="card shadow-lg border-0"
            style={{
              borderRadius: "20px",
            }}
          >

            <div className="card-body text-center">

              <h1
                style={{
                  fontSize: "70px",
                }}
              >
                💳
              </h1>

              <h3 className="fw-bold">

                Secure Checkout

              </h3>

              <p className="text-muted mt-3">

                Your payment is protected with
                encrypted security.

              </p>

              <button
                className="btn btn-success btn-lg rounded-pill w-100 mt-4"
                onClick={makePayment}
              >
                🔒 Pay ₹{amount}
              </button>

            </div>

          </div>

          <div
            className="card shadow-lg border-0 mt-4"
            style={{
              borderRadius: "20px",
            }}
          >

            <div className="card-body">

              <h5 className="fw-bold">
                Why Upgrade?
              </h5>

              <ul className="list-group list-group-flush">

                <li className="list-group-item">
                  ✅ Premium Badge
                </li>

                <li className="list-group-item">
                  ✅ Earn More Points
                </li>

                <li className="list-group-item">
                  ✅ Priority Support
                </li>

                <li className="list-group-item">
                  ✅ Exclusive Features
                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Payment;