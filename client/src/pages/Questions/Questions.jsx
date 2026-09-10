import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/authService";

function Questions() {

  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {

    const result = questions.filter((item) =>
      item.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredQuestions(result);

  }, [search, questions]);

  const fetchQuestions = async () => {

    try {

      const res = await API.get("/questions");

      setQuestions(res.data);
      setFilteredQuestions(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

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
            ❓ Community Questions
          </h1>

          <p className="fs-5 mb-0">
            Ask questions, share knowledge and help others.
          </p>

        </div>

      </div>

      {/* Search */}

      <div className="card shadow border-0 mb-4">

        <div className="card-body">

          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="🔍 Search questions..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      {/* Empty */}

      {filteredQuestions.length === 0 ? (

        <div
          className="card border-0 shadow-lg text-center p-5"
          style={{
            borderRadius: "20px",
          }}
        >

          <h1 style={{ fontSize: "70px" }}>
            ❓
          </h1>

          <h3>No Questions Found</h3>

          <p className="text-muted">
            Try searching with another keyword.
          </p>

        </div>

      ) : (

        <div className="row">

          {filteredQuestions.map((question) => (

            <div
              className="col-lg-6 mb-4"
              key={question._id}
            >

              <div
                className="card shadow-lg border-0 h-100"
                style={{
                  borderRadius: "18px",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-6px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0px)";
                }}
              >

                <div className="card-body">

                  <div className="d-flex align-items-center mb-3">

                    <div
                      className="rounded-circle me-3 d-flex justify-content-center align-items-center"
                      style={{
                        width: "60px",
                        height: "60px",
                        background:
                          "linear-gradient(135deg,#2563eb,#7c3aed)",
                        color: "white",
                        fontSize: "24px",
                        fontWeight: "bold",
                      }}
                    >
                      {question.user?.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>

                      <h5 className="mb-1 fw-bold">
                        {question.user?.name}
                      </h5>

                      <small className="text-muted">
                        {new Date(
                          question.createdAt
                        ).toLocaleDateString()}
                      </small>

                    </div>

                  </div>

                  <h4 className="fw-bold">

                    {question.title}

                  </h4>

                  <p className="text-muted">

                    {question.description.length > 140
                      ? question.description.substring(0, 140) + "..."
                      : question.description}

                  </p>

                  <div className="d-flex justify-content-between align-items-center">

                    <span className="badge bg-info">

                      Question

                    </span>

                    <Link
                      to={`/questions/${question._id}`}
                      className="btn btn-primary rounded-pill"
                    >
                      👁 View Details
                    </Link>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default Questions;