const mongoose = require("mongoose");
const schema = mongoose.Schema;

const MessagesSchema = new schema({
  conversationId: {
    type: schema.Types.ObjectId,
    ref: "conversations",
  },
  accountId: {
    type: schema.Types.ObjectId,
    ref: "accounts",
  },
  messageValue: {
    type: String,
  },
});

module.exports = mongoose.model("messages", MessagesSchema);
