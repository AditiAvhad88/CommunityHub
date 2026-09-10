import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Auth
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";

// Feed
import Home from "../pages/Feed/Home";
import CreatePost from "../pages/Feed/CreatePost";
import PublicFeed from "../pages/Feed/PublicFeed";

// Questions
import AskQuestion from "../pages/Questions/AskQuestion";
import Questions from "../pages/Questions/Questions";
import QuestionDetails from "../pages/Questions/QuestionDetails";

// Profile
import Profile from "../pages/Profile/Profile";

// Leaderboard
import Leaderboard from "../pages/Leaderboard/Leaderboard";

// Notifications
import Notifications from "../pages/Notifications/Notifications";

// Friends
import Friends from "../pages/Friends/Friends";
import AddFriend from "../pages/Friends/AddFriend";
import FriendRequests from "../pages/Friends/FriendRequests";

// Subscription
import Subscription from "../pages/Subscription/Subscription";
import Plans from "../pages/Subscription/Plans";
import Payment from "../pages/Subscription/Payment";
import Invoice from "../pages/Subscription/Invoice";

// Components
import Navbar from "../components/Navbar";

function Layout() {
  const location = useLocation();

  // Hide navbar on Login & Register pages
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

        {/* Home */}
        <Route path="/home" element={<Home />} />

        {/* Feed */}
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/public-feed" element={<PublicFeed />} />

        {/* Questions */}
        <Route path="/ask-question" element={<AskQuestion />} />
        <Route path="/questions" element={<Questions />} />
        <Route
          path="/questions/:id"
          element={<QuestionDetails />}
        />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Leaderboard */}
        <Route
          path="/leaderboard"
          element={<Leaderboard />}
        />

        {/* Notifications */}
        <Route
          path="/notifications"
          element={<Notifications />}
        />

        {/* Friends */}
        <Route path="/friends" element={<Friends />} />
        <Route
          path="/add-friend"
          element={<AddFriend />}
        />
        <Route
          path="/friend-requests"
          element={<FriendRequests />}
        />

        {/* Subscription */}
        <Route
          path="/subscription"
          element={<Subscription />}
        />
        <Route path="/plans" element={<Plans />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/invoice" element={<Invoice />} />
      </Routes>
    </>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default AppRoutes;