import mongoose from "mongoose";

const userSessionsSchema = mongoose.Schema({
  expires: { type: Date, required: true },
  session: { type: Object, required: true },
});

export const userSession = mongoose.model("usersessions", userSessionsSchema);
