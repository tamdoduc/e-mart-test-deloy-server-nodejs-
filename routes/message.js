const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const Conversation = require("../Models/conversations");
const Message = require("../Models/messages");

router.get("/", (req, res) => res.send("MESSAGE ROUTE"));

// @route POST api/messages/addMessage
// @desc Add new Message
// @access Public
router.post("/addMessage", async (req, res) => {
  try {
    const { accountId1, accountId2, messageValue } = req.body;
    if (!accountId1 || !accountId2 || !messageValue)
      return res
        .status(400)
        .json({ success: false, message: "Missing information" });

    const oldConversation = await Conversation.findOne(
      { accountId1, accountId2 } || {
        accountId1: accountId2,
        accountId2: accountId1,
      }
    );
    if (!oldConversation) {
      const newConversation = new Conversation({
        accountId1,
        accountId2,
      });

      //All good

      newConversation.save();

      const newMessage = new Message({
        conversationId: newConversation._id,
        accountId: accountId1,
        messageValue,
      });

      newMessage.save();

      res.json({
        success: true,
        message: "Conversation created ",
        newConversation: newConversation,
        message2: "Message created",
        messageValue: newMessage,
      });
    } else {
      console.log("old: " + oldConversation);
      const newMessage = new Message({
        conversationId: oldConversation._id,
        accountId: accountId1,
        messageValue,
      });

      //  console.log("old id:" + oldConversation._id);
      //console.log("id:" + newMessage.conversationId);

      newMessage.save();
      res.json({
        success: true,
        message: "Conversation already",
        message2: "Message created",
        messageValue: newMessage,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " Internal server error",
    });
  }
});

// @route GET api/messages/allMessage
// @desc Get all message
// @access Public
router.get("/allMessage", async (req, res) => {
  try {
    const allMessage = await Message.find();
    res.json({
      success: true,
      message: "all message got",
      allMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " Internal server error",
    });
  }
});

// @route Get api/messages/lastMessageInConversation
// @desc Get Last Message In Conversation
// @access Public
router.get("/lastMessageInConversation", async (req, res) => {
  try {
    const { accountId1, accountId2 } = req.body;
    if (!accountId1 || !accountId2)
      return res
        .status(400)
        .json({ success: false, message: "Missing information" });

    const oldConversation = await Conversation.findOne(
      { accountId1, accountId2 } || {
        accountId1: accountId2,
        accountId2: accountId1,
      }
    );
    if (oldConversation) {
      const lastMessage = await Message.find({
        conversationId: oldConversation._id,
      })
        .sort({ $natural: -1 })
        .limit(1);
      res.json({
        success: true,
        lastMessage,
      });
    } else {
      res.json({
        success: false,
        message: "conversation not exist yet",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " Internal server error",
    });
  }
});
// @route Get api/messages/inConversation
// @desc Add messages in 1 conversation
// @access Public
router.get("/inConversation", async (req, res) => {
  try {
    const { accountId1, accountId2 } = req.body;
    if (!accountId1 || !accountId2)
      return res
        .status(400)
        .json({ success: false, message: "Missing information" });

    const oldConversation = await Conversation.findOne(
      { accountId1, accountId2 } || {
        accountId1: accountId2,
        accountId2: accountId1,
      }
    );
    if (oldConversation) {
      const allMessage = await Message.find({
        conversationId: oldConversation._id,
      });
      res.json({
        success: true,
        message: "messages in conversation",
        allMessage,
      });
    } else {
      res.json({
        success: false,
        message: "conversation not exist yet",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " Internal server error",
    });
  }
});

// @route POST api/products/create
// @desc Create product
// @access Public
router.delete("/deleteAll", async (req, res) => {
  try {
    const allMessage = await Message.deleteMany();
    res.json({
      success: true,
      message: "all message deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " Internal server error",
    });
  }
});

module.exports = router;
