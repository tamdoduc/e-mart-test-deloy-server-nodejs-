const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ConversationsSchema = new schema({
  accountId1: {
    type: schema.Types.ObjectId,
    ref: "accounts",
  },
  accountId2: {
    type: schema.Types.ObjectId,
    ref: "accounts",
  },
});

module.exports = mongoose.model("conversations", ConversationsSchema);
