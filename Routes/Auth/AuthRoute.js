import express from "express";
import authController from "../../Controller/Auth/AuthController";

const router = express.Router();
const AuthController = new authController();

router.post("/api/user-signup", (request, response) => {
  AuthController.SignUp(request, response);
});

router.post("/api/user-signin", (request, response) => {
  AuthController.SignIn(request, response);
});

router.get("/api/user-logout", (request, response) => {
  AuthController.LogOut(request, response);
});

router.get("/api/check-isUserLoggedin", (request, response) => {
  AuthController.isUserLoggedIn(request, response);
});

export default router;
