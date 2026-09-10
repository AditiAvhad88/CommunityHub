import { useEffect, useState } from "react";
import API from "../../services/authService";

function PublicFeed() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {

    try {

      const res = await API.get("/posts");

      setPosts(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="container mt-5">

      <h2 className="text-center mb-4">
        🌍 Community Public Feed
      </h2>

      {
        posts.length === 0
        ?
        <h4>No Posts Yet</h4>
        :
        posts.map((post) => (

          <div
            className="card shadow mb-4"
            key={post._id}
          >

            <div className="card-body">

              <h5>
                {post.user?.name}
              </h5>

              <hr />

              <p>
                {post.content}
              </p>

              <button
                className="btn btn-outline-danger"
              >
                ❤️ {post.likes.length}
              </button>

            </div>

          </div>

        ))
      }

    </div>

  );

}

export default PublicFeed;

