import API from "../services/authService";

function PostCard({ post }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const likePost = async () => {
    try {
      await API.put(
        `/posts/${post._id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Post Liked Successfully!");
      window.location.reload();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Error liking post"
      );
    }
  };

  return (
    <div
      className="card border-0 shadow-lg mb-4"
      style={{
        borderRadius: "18px",
        transition: "0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-5px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0px)";
      }}
    >
      <div className="card-body">

        {/* HEADER */}

        <div className="d-flex align-items-center mb-3">

          <div
            className="rounded-circle d-flex justify-content-center align-items-center"
            style={{
              width: "55px",
              height: "55px",
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {post.user?.name
              ? post.user.name
                  .charAt(0)
                  .toUpperCase()
              : "U"}
          </div>

          <div className="ms-3">

            <h5 className="mb-1 fw-bold">
              {post.user?.name || "Unknown User"}
            </h5>

            <small className="text-muted">
              {new Date(
                post.createdAt
              ).toLocaleString()}
            </small>

          </div>

        </div>

        {/* POST CONTENT */}

        <div
          className="mb-4"
          style={{
            fontSize: "17px",
            lineHeight: "1.7",
          }}
        >
          {post.content}
        </div>

        <hr />

        {/* FOOTER */}

        <div className="d-flex justify-content-between align-items-center">

          <button
            className="btn btn-danger rounded-pill px-4"
            onClick={likePost}
          >
            ❤️ Like ({post.likes?.length || 0})
          </button>

          <button
            className="btn btn-outline-primary rounded-pill px-4"
          >
            💬 Comment
          </button>

        </div>

      </div>
    </div>
  );
}

export default PostCard;