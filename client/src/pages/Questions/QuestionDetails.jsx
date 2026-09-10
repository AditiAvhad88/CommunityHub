import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/authService";

function QuestionDetails() {

  const { id } = useParams();

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.get(
        `/questions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setQuestion(res.data.question);
      setAnswers(res.data.answers);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const submitAnswer = async (e) => {

    e.preventDefault();

    if (!answer.trim()) {
      return alert("Please write your answer.");
    }

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      await API.post(
        `/answers/${id}`,
        {
          answer,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Answer Added Successfully ✅");

      setAnswer("");

      fetchQuestion();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong."
      );

    }

  };

  const upvoteAnswer = async (answerId) => {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      await API.put(
        `/answers/${answerId}/upvote`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      fetchQuestion();

    } catch (error) {

      alert(
        error.response?.data?.message
      );

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

      {/* Question Card */}

      <div
        className="shadow-lg mb-5"
        style={{
          background:
            "linear-gradient(135deg,#2563eb,#7c3aed)",
          color: "white",
          borderRadius: "20px",
        }}
      >

        <div className="p-5">

          <div className="d-flex align-items-center mb-4">

            <div
              className="rounded-circle me-3 d-flex justify-content-center align-items-center"
              style={{
                width: "70px",
                height: "70px",
                background: "white",
                color: "#2563eb",
                fontSize: "28px",
                fontWeight: "bold",
              }}
            >
              {question.user?.name
                ?.charAt(0)
                .toUpperCase()}
            </div>

            <div>

              <h4 className="mb-1">
                {question.user?.name}
              </h4>

              <small>

                {new Date(
                  question.createdAt
                ).toLocaleDateString()}

              </small>

            </div>

          </div>

          <h2 className="fw-bold">

            {question.title}

          </h2>

          <p
            className="mt-3"
            style={{
              fontSize: "18px",
            }}
          >
            {question.description}
          </p>

        </div>

      </div>

      {/* Total Answers */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h3>
          💬 Answers ({answers.length})
        </h3>

      </div>

      {/* Answers */}

      {answers.length === 0 ? (

        <div
          className="card shadow border-0 text-center p-5 mb-5"
          style={{
            borderRadius: "20px",
          }}
        >

          <h1 style={{ fontSize: "70px" }}>
            💬
          </h1>

          <h3>No Answers Yet</h3>

          <p className="text-muted">
            Be the first one to answer this question.
          </p>

        </div>

      ) : (

        answers.map((item) => (

          <div
            key={item._id}
            className="card shadow-lg border-0 mb-4"
            style={{
              borderRadius: "18px",
              transition: "0.3s",
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
                    fontWeight: "bold",
                    fontSize: "22px",
                  }}
                >
                  {item.user?.name
                    ?.charAt(0)
                    .toUpperCase()}
                </div>

                <div>

                  <h5 className="mb-1">

                    {item.user?.name}

                  </h5>

                  <small className="text-muted">

                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}

                  </small>

                </div>

              </div>

              <p
                style={{
                  fontSize: "17px",
                }}
              >
                {item.answer}
              </p>

              <button
                className="btn btn-success rounded-pill"
                onClick={() =>
                  upvoteAnswer(item._id)
                }
              >
                👍 Upvote ({item.upvotes?.length || 0})
              </button>

            </div>

          </div>

        ))

      )}

      {/* Answer Form */}

      <div
        className="card shadow-lg border-0"
        style={{
          borderRadius: "20px",
        }}
      >

        <div className="card-body p-4">

          <h3 className="mb-4">

            ✍️ Write Your Answer

          </h3>

          <form onSubmit={submitAnswer}>

            <textarea
              className="form-control mb-4"
              rows="6"
              placeholder="Share your knowledge..."
              value={answer}
              onChange={(e) =>
                setAnswer(e.target.value)
              }
            />

            <button
              className="btn btn-primary btn-lg rounded-pill px-5"
            >
              Submit Answer
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default QuestionDetails;