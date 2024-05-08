import mongoose, { Schema, Document } from "mongoose";
import { stringify } from "querystring";

//type defining message, extend Document so that it can be used for the mongoose schema
export interface Message extends Document {
  content: string;
  createdAt: Date;
}

//using message type here and creating the schema
const MessageSchema = new Schema<Message>({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

//type defining User, extend Document so that it can be used for the mongoose schema
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
}

//using User type here and creating the schema
const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify code expiry is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },

  isAcceptingMessage: {
    tyep: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});



//checking if the model is already created in the database, if not then creating the model in the database
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;