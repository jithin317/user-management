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
  WarningToast,
} from "../../components/helpers/toast-container";

export default function AdminLogin() {
  const navigate = useNavigate();
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
        "http://localhost:5000/admin/login",
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
      localStorage.setItem(
        "admin_token",
        JSON.stringify(response?.data?.token)
      );
      SuccessToast({ message: response?.data?.msg });
      if (response.status === 200) {
        return setTimeout(() => {
          navigate("/admin");
        }, 2000);
      }
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
      <motion.div className="relative flex-1 hidden h-screen items-center justify-center lg:flex">
        <img
          alt="LoginImg"
          src={require("../../assets/images/adminIMG.jpg")}
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
                  <AuthButton
                    type={"submit"}
                    disabled={isSubmitting}
                    text="Sign in"
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </motion.main>
  );
}
