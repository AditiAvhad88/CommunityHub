import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/authService";

function AskQuestion() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const askQuestion = async (e) => {

    e.preventDefault();

    if (!title.trim()) {
      return alert("Please enter a question title.");
    }

    if (!description.trim()) {
      return alert("Please enter the question description.");
    }

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await API.post(
        "/questions",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`,
          },
        }
      );

      alert("Question Posted Successfully ✅");

      navigate("/questions");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Error posting question"
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
            "linear-gradient(135deg,#2563eb,#7c3aed)",
          color: "white",
          borderRadius: "20px",
        }}
      >

        <div className="p-5 text-center">

          <h1 className="fw-bold">
            ❓ Ask a Question
          </h1>

          <p className="fs-5 mb-0">
            Get help from the Community Hub members.
          </p>

        </div>

      </div>

      <div className="row">

        {/* Form */}

        <div className="col-lg-8">

          <div
            className="card shadow-lg border-0"
            style={{
              borderRadius: "20px",
            }}
          >

            <div className="card-body p-4">

              <h3 className="mb-4">
                Create New Question
              </h3>

              <form onSubmit={askQuestion}>

                <div className="mb-4">

                  <label className="fw-bold mb-2">
                    Question Title
                  </label>

                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter a clear and short title..."
                    value={title}
                    onChange={(e) =>
                      setTitle(e.target.value)
                    }
                    required
                  />

                </div>

                <div className="mb-4">

                  <label className="fw-bold mb-2">
                    Description
                  </label>

                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Explain your problem in detail..."
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                    required
                  />

                </div>

                <button
                  className="btn btn-primary btn-lg rounded-pill px-5"
                >
                  🚀 Post Question
                </button>

              </form>

            </div>

          </div>

        </div>

        {/* Tips */}

        <div className="col-lg-4">

          <div
            className="card shadow-lg border-0"
            style={{
              borderRadius: "20px",
            }}
          >

            <div className="card-body">

              <h4 className="fw-bold mb-3">
                💡 Writing Tips
              </h4>

              <ul className="list-group list-group-flush">

                <li className="list-group-item">
                  ✅ Keep the title short and meaningful.
                </li>

                <li className="list-group-item">
                  ✅ Explain your problem clearly.
                </li>

                <li className="list-group-item">
                  ✅ Mention what you've already tried.
                </li>

                <li className="list-group-item">
                  ✅ Use simple language.
                </li>

                <li className="list-group-item">
                  ✅ One question per post.
                </li>

              </ul>

            </div>

          </div>

          <div
            className="card shadow-lg border-0 mt-4"
            style={{
              borderRadius: "20px",
            }}
          >

            <div className="card-body text-center">

              <h1 style={{ fontSize: "60px" }}>
                🌍
              </h1>

              <h4 className="fw-bold">
                Community Hub
              </h4>

              <p className="text-muted">

                Ask questions, help others,
                earn points and grow your knowledge.

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AskQuestion;