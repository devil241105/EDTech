const chatroomSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true, // E.g., "JEE Study Group"
    },
  
    examTag: {
      type: String,
      required: true, // E.g., "#jee", "#neet"
    },
  
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Users participating in the chatroom
      },
    ],
  
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        text: {
          type: String,
          required: true,
        },
        sentAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Chatroom = mongoose.model("Chatroom", chatroomSchema);
  
  export default Chatroom;
  