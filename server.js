import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import expressSession from "express-session";
import MongoStore from "connect-mongodb-session";
import AuthRoute from "./Routes/Auth/AuthRoute";
import ProductRoute from "./Routes/Products/Products";
import WishhListRoute from "./Routes/WishList/WishList";
import CartRoute from "./Routes/Cart/Cart";
dotenv.config();

const app = express();

//======================================================Middlewares=====================================================
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const mongoStore = MongoStore(expressSession);
const mongoURI = process.env.mongoURI;

const store = new mongoStore({
  collection: "usersessions",
  uri: mongoURI,
  expires: 10 * 60 * 60 * 24 * 1000,
});

app.use(
  expressSession({
    name: "_sid",
    secret: process.env.session_secret,
    saveUninitialized: false,
    resave: false,
    store: store,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 10 * 60 * 60 * 24 * 1000,
      sameSite: true,
    },
  })
);

//==================================================MongoDB Configs & Connection========================================
const mongoDB__connectionOptions = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(mongoURI, mongoDB__connectionOptions, (error) => {
  if (error) {
    return console.error(error);
  }
  console.log("Connection to MongoDB was successful");
});

//==================================================Server Endpoints====================================================
app.use(AuthRoute);
app.use(ProductRoute);
app.use(WishhListRoute);
app.use(CartRoute);
//=================================================Server Configs & Connection==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
