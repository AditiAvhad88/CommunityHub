
const FriendRequest = require("../models/FriendRequest");
const User = require("../models/User");
const Notification = require("../models/Notification");

// ======================
// SEND FRIEND REQUEST
// ======================
const sendFriendRequest = async (req, res) => {
  try {

    console.log(req.body);
    console.log(req.user);

    const { receiverId } = req.body;

    if (!receiverId) {
      return res.status(400).json({
        message: "Receiver ID is required",
      });
    }

    if (receiverId === req.user._id.toString()) {
      return res.status(400).json({
        message: "You cannot send a request to yourself",
      });
    }

    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({
        message: "Receiver not found",
      });
    }

    const alreadySent = await FriendRequest.findOne({
      sender: req.user._id,
      receiver: receiverId,
      status: "PENDING",
    });

    if (alreadySent) {
      return res.status(400).json({
        message: "Friend request already sent",
      });
    }

    const request = await FriendRequest.create({
      sender: req.user._id,
      receiver: receiverId,
    });

    await Notification.create({
      user: receiverId,
      message: `${req.user.name} sent you a friend request`,
    });

    res.status(201).json(request);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ======================
// ACCEPT FRIEND REQUEST
// ======================
const acceptRequest = async (req, res) => {
  try {
    const request = await FriendRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    request.status = "ACCEPTED";
await request.save();

// Remove request after accepting
await FriendRequest.findByIdAndDelete(request._id);

    await User.findByIdAndUpdate(
  request.sender,
  {
    $addToSet: {
      friends: request.receiver,
    },
  }
);

await User.findByIdAndUpdate(
  request.receiver,
  {
    $addToSet: {
      friends: request.sender,
    },
  }
);

    res.json({
      message: "Friend request accepted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// GET FRIENDS
// ======================
const getFriends = async (req, res) => {
  try {

    const user = await User.findById(req.user._id)
      .populate("friends");

    console.log("USER:");
    console.log(user);

    console.log("FRIENDS:");
    console.log(user.friends);

    res.json(user.friends);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};          
// GET PENDING FRIEND REQUESTS
const getPendingRequests = async (req, res) => {

  try {

    const requests = await FriendRequest.find({
      receiver: req.user._id,
      status: "PENDING",
    }).populate(
      "sender",
      "name email points"
    );

    res.json(requests);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


module.exports = {
  sendFriendRequest,
  acceptRequest,
  getFriends,
  getPendingRequests,
};



