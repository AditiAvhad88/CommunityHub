import { useState } from "react";
import API from "../../services/authService";
import { useNavigate } from "react-router-dom";

function CreatePost() {

  const navigate = useNavigate();

  const [content, setContent] = useState("");

  const createPost = async (e) => {

    e.preventDefault();

    if (!content.trim()) {
      return alert("Please write something before posting.");
    }

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await API.post(
        "/posts",
        {
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Post Created Successfully 🎉");

      navigate("/home");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Error creating post."
      );

    }

  };

  return (

    <div className="container py-5">

      {/* Hero Section */}

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
            📝 Create a New Post
          </h1>

          <p className="fs-5 mb-0">
            Share your thoughts, ideas and experiences with the Community Hub.
          </p>

        </div>

      </div>

      <div className="row">

        {/* Post Form */}

        <div className="col-lg-8">

          <div
            className="card shadow-lg border-0"
            style={{
              borderRadius: "20px",
            }}
          >

            <div className="card-body p-4">

              <h3 className="fw-bold mb-4">
                What's on your mind?
              </h3>

              <form onSubmit={createPost}>

                <textarea
                  className="form-control mb-4"
                  rows="8"
                  placeholder="Share your ideas, achievements, projects, or ask something..."
                  value={content}
                  onChange={(e) =>
                    setContent(e.target.value)
                  }
                  required
                />

                <div className="d-flex justify-content-between align-items-center">

                  <small className="text-muted">
                    Express yourself professionally and respectfully.
                  </small>

                  <button
                    className="btn btn-primary btn-lg rounded-pill px-5"
                  >
                    🚀 Publish Post
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

        {/* Sidebar */}

        <div className="col-lg-4">

          <div
            className="card shadow-lg border-0"
            style={{
              borderRadius: "20px",
            }}
          >

            <div className="card-body">

              <h4 className="fw-bold mb-3">
                💡 Posting Tips
              </h4>

              <ul className="list-group list-group-flush">

                <li className="list-group-item">
                  ✅ Share useful knowledge.
                </li>

                <li className="list-group-item">
                  ✅ Keep your content clear and meaningful.
                </li>

                <li className="list-group-item">
                  ✅ Be respectful to everyone.
                </li>

                <li className="list-group-item">
                  ✅ Encourage discussion.
                </li>

                <li className="list-group-item">
                  ✅ Avoid posting duplicate content.
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

                Inspire others, share your ideas, and build meaningful conversations.

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default CreatePost;