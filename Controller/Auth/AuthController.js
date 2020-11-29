import Bcrypt from "bcrypt";
import Formidable from "formidable";
import dotenv from "dotenv";
import { userModel } from "../../Models/Users/Users";
import { userSession } from "../../Models/UserSessions/UserSessions";

class AuthController {
  SignUp(request, response) {
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields, files) => {
        if (error) {
          console.error(error);
          return response.status(500, {
            msg: "Network Error: Failed to create account",
          });
        }

        const { email, password, verifiedPassword } = fields;

        if (!email || !password || !verifiedPassword) {
          return response.status(400).json({ msg: "All fields are required" });
        }

        if (password.trim() < 6) {
          return response.status(400).json({
            msg: "Password length must be at least 6 characters long",
          });
        }

        if (password.trim() !== verifiedPassword.trim()) {
          return response.status(400).json({ msg: "Password's do not match" });
        }

        const isUserExisting = await userModel.findOne({ email: email });

        if (isUserExisting) {
          return response
            .status(400)
            .json({ msg: "Account with this email already exist" });
        }

        const salt = await Bcrypt.genSalt(15);
        const hashedPassword = await Bcrypt.hash(password, salt);

        const newUser = new userModel({
          email: email,
          password: hashedPassword,
        });

        const savedUser = await newUser.save();
        return response
          .status(201)
          .json({ msg: "Account successfully created" });
      });
    } catch (error) {
      return response.status(500, {
        msg: "Server Error: Failed to create account",
      });
    }
  }

  SignIn(request, response) {
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields, files) => {
        if (error) {
          return response
            .status(500)
            .json({ msg: "Network Error: Failed to Signin" });
        }

        const { email, password } = fields;

        if (!email || !password) {
          return response.status(500).json({ msg: "All fields are required" });
        }

        const existingUser = await userModel.findOne({ email: email });

        if (!existingUser) {
          return response
            .status(404)
            .json({ msg: "Account with this email does not exist" });
        }

        const usersSavedPassword = existingUser.password;
        const isPasswordValid = await Bcrypt.compare(
          password,
          usersSavedPassword
        );

        if (!isPasswordValid) {
          return response.status(400).json({ msg: "Invalid credentials" });
        }

        const isUserSessionExisting = await userSession.findOne({
          "session.user.id": existingUser._id,
        });
        if (isUserSessionExisting) {
          return response
            .status(200)
            .json({ msg: "Account already signed in" });
        }
        request.session.user = {
          userMail: existingUser.email,
          id: existingUser._id,
          isAdmin: existingUser.isAdmin,
        };

        return response.status(200).send(request.sessionID);
      });
    } catch (error) {
      return response.status(500, { msg: "Server Error: Failed to Signin" });
    }
  }

  LogOut(request, response) {
    const isUserSessionExisting = request.session || false;
    try {
      if (isUserSessionExisting) {
        request.session.destroy();
        return response.status(200).json({ msg: "Logged Out" });
      }
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server Error: Failed to create account" });
    }
  }

  isUserLoggedIn(request, response) {
    const isUserSessionExisting = request.session || false;

    try {
      if (!isUserSessionExisting) {
        const user_role = isUserSessionExisting.user.isAdmin;
        return response.status(200).json({
          authenticated: false,
          admin: user_role,
        });
      }

      const user_role = isUserSessionExisting.user.isAdmin;
      return response.status(200).json({
        authenticated: true,
        admin: user_role,
      });
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server Error: Failed to create account" });
    }
  }
}

export default AuthController;
