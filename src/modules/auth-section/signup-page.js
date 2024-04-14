import React, { useContext } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AuthButton } from "../../components/buttons/Buttons";
import AuthInputField from "../../components/InputFields/auth-input-field";
import { motionStyles, pageTransitions } from "./motion-styles";
// import { HandleSignUp } from "../../utils/signup-handler";
import { useNavigate } from "react-router-dom";
import {
  ErrorToast,
  InfoToast,
  SuccessToast,
  WarningToast,
} from "../../components/helpers/toast-container";
import axios from "axios";
import { AuthContext } from "../../contexts/auth-context";

export default function SignUp() {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };
  const { isAuthenticated, login, logout } = useContext(AuthContext);
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required!")
      .min(8, "Must be minimum 8 characters long!")
      .matches(
        /^[A-Za-z][A-Za-z0-9_]{7,29}$/,
        "Should'nt start with number,contain spaces or special characters"
      )
      .max(20, "Must be maximum 20 characters long!"),
    email: Yup.string()
      .email("Must be a valid email!")
      .required("Email is required!"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Password is required!"),
  });

  async function handleSignUp(values) {
    const { username, email, password } = values;
    InfoToast({ message: "Please Wait!" });
    try {
      const response = await axios.post(
        "http://localhost:5000/users/register",
        {
          username: username.toLowerCase().trim(),
          email: email.trim(),
          password: password.trim(),
        },
        {
          headers: {
            Accept: "application/json",
            "Accept-Language": "en_US",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log(response);
      localStorage.setItem("jwt_token", JSON.stringify(response?.data?.token));
      SuccessToast({ message: response?.data?.msg });
      login();
      if (response.status === 200) {
        return setTimeout(() => {
          navigate("/");
        }, 2000);
      }
      return ErrorToast({ message: "Some Error Occured!" });
    } catch (err) {
      console.log(err?.response?.data?.message || err?.message);
      WarningToast({ message: err?.response?.data?.message || err?.message });
    }
  }

  return (
    <motion.main
      {...pageTransitions}
      className="w-full bg-white  flex min-h-screen"
    >
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8 px-4 text-gray-600 sm:px-0">
          <div className="md:mt-5 text-center space-y-2 md:text-left">
            <h3 className="text-gray-800 text-3xl font-bold sm:text-3xl">
              Sign up
            </h3>
            <p className="text-center md:text-left">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={handleSignUp}
          >
            {({ values, isSubmitting }) => {
              return (
                <Form className="space-y-4">
                  <div>
                    <AuthInputField
                      label="Username"
                      name="username"
                      type="username"
                      id="username"
                      disabled={isSubmitting}
                    />
                    <AuthInputField
                      label="Email"
                      name="email"
                      type="email"
                      id="email"
                      disabled={isSubmitting}
                    />
                    <AuthInputField
                      label="Password"
                      name="password"
                      type="password"
                      id="password"
                      disabled={isSubmitting}
                      passwordCheck={true}
                      isPassword={true}
                    />
                  </div>
                  <AuthButton
                    type={"submit"}
                    disabled={isSubmitting}
                    text="Create an account"
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <motion.div
        {...motionStyles}
        className="relative flex-1 hidden h-screen items-center justify-center lg:flex"
      >
        <img
          src="https://i.ibb.co/HdmG5tH/12781040-5075546.jpgana"
          className="w-full h-full pointer-events-none"
        />
      </motion.div>
    </motion.main>
  );
}
