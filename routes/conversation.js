const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const Conversation = require("../Models/conversations");
const Message = require("../Models/messages");

router.get("/", (req, res) => res.send("CONVERSATION ROUTE"));

module.exports = router;
