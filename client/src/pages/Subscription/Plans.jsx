import { useNavigate } from "react-router-dom";

function Plans() {

  const navigate = useNavigate();

  const plans = [

    {
      name: "FREE",
      price: 0,
      color: "secondary",
      icon: "🆓",
      badge: "Starter",
      features: [
        "Create Posts",
        "Ask Questions",
        "Like Posts",
        "Basic Profile",
      ],
    },

    {
      name: "BRONZE",
      price: 199,
      color: "warning",
      icon: "🥉",
      badge: "Popular",
      features: [
        "Everything in FREE",
        "Priority Support",
        "Transfer Points",
        "Extra Rewards",
      ],
    },

    {
      name: "SILVER",
      price: 399,
      color: "primary",
      icon: "🥈",
      badge: "Best Value",
      features: [
        "Everything in BRONZE",
        "Premium Badge",
        "Unlimited Transfers",
        "Exclusive Community",
      ],
    },

    {
      name: "GOLD",
      price: 699,
      color: "danger",
      icon: "🥇",
      badge: "Premium",
      features: [
        "Everything in SILVER",
        "VIP Support",
        "Maximum Rewards",
        "Gold Member Badge",
      ],
    },

  ];

  const choosePlan = (plan, amount) => {

    navigate("/payment", {
      state: {
        plan,
        amount,
      },
    });

  };

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
            💎 Subscription Plans
          </h1>

          <p className="fs-5 mb-0">

            Choose the perfect membership for your Community Hub journey.

          </p>

        </div>

      </div>

      {/* Plans */}

      <div className="row g-4">

        {plans.map((plan) => (

          <div
            className="col-lg-3 col-md-6"
            key={plan.name}
          >

            <div
              className={`card shadow-lg border-${plan.color}`}
              style={{
                borderRadius: "20px",
                transition: ".3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {

                e.currentTarget.style.transform =
                  "translateY(-10px)";

                e.currentTarget.style.boxShadow =
                  "0px 18px 35px rgba(0,0,0,.2)";

              }}
              onMouseLeave={(e) => {

                e.currentTarget.style.transform =
                  "translateY(0px)";

                e.currentTarget.style.boxShadow = "";

              }}
            >

              <div className="card-body text-center p-4">

                <span
                  className={`badge bg-${plan.color} mb-3`}
                >
                  {plan.badge}
                </span>

                <h1
                  style={{
                    fontSize: "60px",
                  }}
                >
                  {plan.icon}
                </h1>

                <h3 className="fw-bold mt-2">
                  {plan.name}
                </h3>

                <h1
                  className={`text-${plan.color} fw-bold my-4`}
                >
                  ₹{plan.price}
                </h1>

                <ul
                  className="list-group list-group-flush text-start mb-4"
                >

                  {plan.features.map((feature, index) => (

                    <li
                      key={index}
                      className="list-group-item"
                    >
                      ✅ {feature}
                    </li>

                  ))}

                </ul>

                <button
                  className={`btn btn-${plan.color} w-100 btn-lg rounded-pill`}
                  onClick={() =>
                    choosePlan(
                      plan.name,
                      plan.price
                    )
                  }
                >
                  Select Plan
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Bottom Section */}

      <div
        className="card shadow-lg border-0 mt-5"
        style={{
          borderRadius: "20px",
        }}
      >

        <div className="card-body text-center p-5">

          <h2>
            🚀 Why Upgrade?
          </h2>

          <p
            className="text-muted mt-3"
            style={{
              fontSize: "18px",
            }}
          >

            Unlock premium features, earn more points,
            access exclusive benefits, receive faster support,
            and become a top contributor in Community Hub.

          </p>

        </div>

      </div>

    </div>

  );

}

export default Plans;