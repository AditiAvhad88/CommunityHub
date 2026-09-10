
import API from "../../services/authService";

function Subscription() {

  const updatePlan = async (plan) => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await API.put(
        "/users/subscription",
        {
          plan,
        },
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`,
          },
        }
      );

      alert(res.data.message);

    } catch (error) {

      alert(error.response?.data?.message);

    }

  };

  return (

    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="mb-4">
          ⭐ Upgrade Subscription
        </h2>

        <div className="d-grid gap-3">

          <button
            className="btn btn-secondary"
            onClick={() => updatePlan("FREE")}
          >
            FREE
          </button>

          <button
            className="btn btn-warning"
            onClick={() => updatePlan("BRONZE")}
          >
            BRONZE
          </button>

          <button
            className="btn btn-info"
            onClick={() => updatePlan("SILVER")}
          >
            SILVER
          </button>

          <button
            className="btn btn-success"
            onClick={() => updatePlan("GOLD")}
          >
            GOLD
          </button>

        </div>

      </div>

    </div>

  );

}

export default Subscription;
