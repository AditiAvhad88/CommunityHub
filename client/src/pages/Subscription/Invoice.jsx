import { useLocation, useNavigate } from "react-router-dom";

function Invoice() {

  const location = useLocation();
  const navigate = useNavigate();

  const { plan, amount } = location.state || {};

  const invoiceNumber =
    "INV-" + Math.floor(Math.random() * 1000000);

  const paymentDate =
    new Date().toLocaleString();

  return (

    <div className="container py-5">

      {/* Success Banner */}

      <div
        className="shadow-lg mb-5"
        style={{
          background:
            "linear-gradient(135deg,#16a34a,#22c55e)",
          color: "white",
          borderRadius: "20px",
        }}
      >

        <div className="p-5 text-center">

          <h1
            style={{
              fontSize: "70px",
            }}
          >
            ✅
          </h1>

          <h2 className="fw-bold">
            Payment Successful
          </h2>

          <p className="fs-5 mb-0">
            Thank you for upgrading your Community Hub membership.
          </p>

        </div>

      </div>

      <div className="row">

        {/* Invoice */}

        <div className="col-lg-8">

          <div
            className="card shadow-lg border-0"
            style={{
              borderRadius: "20px",
            }}
          >

            <div className="card-body p-5">

              <div className="d-flex justify-content-between">

                <div>

                  <h2 className="fw-bold">
                    🧾 Invoice
                  </h2>

                  <p className="text-muted">
                    Community Hub
                  </p>

                </div>

                <div className="text-end">

                  <h5>
                    Invoice No.
                  </h5>

                  <strong>
                    {invoiceNumber}
                  </strong>

                </div>

              </div>

              <hr />

              <table className="table">

                <tbody>

                  <tr>

                    <th>
                      Subscription Plan
                    </th>

                    <td>
                      {plan}
                    </td>

                  </tr>

                  <tr>

                    <th>
                      Amount Paid
                    </th>

                    <td className="fw-bold text-success">
                      ₹{amount}
                    </td>

                  </tr>

                  <tr>

                    <th>
                      Payment Status
                    </th>

                    <td className="text-success fw-bold">
                      Paid ✔
                    </td>

                  </tr>

                  <tr>

                    <th>
                      Payment Date
                    </th>

                    <td>
                      {paymentDate}
                    </td>

                  </tr>

                </tbody>

              </table>

              <div className="alert alert-success mt-4">

                🔒 This payment was processed securely.
                Thank you for choosing Community Hub.

              </div>

            </div>

          </div>

        </div>

        {/* Summary */}

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
                🎉
              </h1>

              <h3 className="fw-bold">
                Congratulations!
              </h3>

              <p className="text-muted">

                Your subscription has been activated successfully.

              </p>

              <button
                className="btn btn-primary w-100 rounded-pill mb-3"
                onClick={() =>
                  navigate("/home")
                }
              >
                🏠 Back to Home
              </button>

              <button
                className="btn btn-outline-success w-100 rounded-pill"
                onClick={() =>
                  window.print()
                }
              >
                🖨️ Print Invoice
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Invoice;