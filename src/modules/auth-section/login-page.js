import React, { useContext } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { AuthButton } from "../../components/buttons/Buttons";
import AuthInputField from "../../components/InputFields/auth-input-field";
import { motion } from "framer-motion";
import { motionStyles, pageTransitions } from "./motion-styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ErrorToast,
  InfoToast,
  SuccessToast,
  WarnToast,
} from "../../components/helpers/toast-container";
import { AuthContext } from "../../contexts/auth-context";
// import { HandleGoogleCreds } from "../../utils/googlecred-handler";
// import { HandleLogin } from "../../utils/login-handler";

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useContext(AuthContext);
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required!"),
    password: Yup.string().required("Password is required!"),
  });

  async function handleSignIn(values) {
    try {
      const { username, password } = values;
      InfoToast({ message: "Please Wait!" });
      const response = await axios.post(
        "http://localhost:5000/users/login",
        {
          username: username.toLowerCase(),
          password,
        },
        {
          headers: {
            Accept: "application/json",
            "Accept-Language": "en_US",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );
      console.log(response?.data?.msg);
      localStorage.setItem("jwt_token", JSON.stringify(response?.data?.token));
      SuccessToast({ message: response?.data?.msg });
      login();
      if (response.status === 200) {
        return setTimeout(() => {
          navigate("/profile");
        }, 2000);
      }
      return ErrorToast({ message: "Some Error Occured!" });
    } catch (err) {
      console.log(err?.response?.data?.message || err?.message);
      WarnToast({ message: err?.response?.data?.message || err?.message });
    }
  }

  return (
    <motion.main
      {...pageTransitions}
      className="w-full bg-white  flex min-h-screen"
    >
      <motion.div
        {...motionStyles}
        className="relative flex-1 hidden h-screen items-center justify-center lg:flex"
      >
        <img
          alt="LoginImg"
          src="https://i.ibb.co/hB6zQJM/24070702-bwink-bld-03-single-03-min.jpg"
          className="w-full h-full pointer-events-none"
        />
      </motion.div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6 px-4 text-gray-600 sm:px-0">
          <div className="mt-5 text-center space-y-2 md:text-left">
            <h3 className="text-gray-800 text-3xl font-bold sm:text-3xl">
              Login to your account
            </h3>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={handleSignIn}
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
                      label="Password"
                      name="password"
                      type="password"
                      id="password"
                      isPassword={true}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-x-3">
                      <input
                        type="checkbox"
                        id="remember-me-checkbox"
                        className="checkbox-item peer hidden"
                      />
                      <label
                        htmlFor="remember-me-checkbox"
                        className="relative flex w-5 h-5 bg-white peer-checked:bg-gray-900 rounded-md border ring-offset-2 ring-gray-900 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                      ></label>
                      <label
                        htmlFor="remember-me-checkbox"
                        className="cursor-pointer select-none"
                      >
                        Remember me
                      </label>
                    </div>
                    <div>
                      <button className="text-indigo-600 font-medium hover:text-indigo-700">
                        Forgot Password ?
                      </button>
                    </div>
                  </div>
                  <AuthButton
                    type={"submit"}
                    disabled={isSubmitting}
                    text="Sign in"
                  />
                </Form>
              );
            }}
          </Formik>
          {/* <div>
            <GoogleButton
              onClkFn={() => HandleGoogleCreds(navigate)}
              text="Continue with Google"
            />
          </div> */}
          <p className="text-center">
            Don't have an account?{" "}
            <Link
              to={"/sign-up"}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </motion.main>
  );
}
