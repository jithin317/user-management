import { Form, Formik } from "formik";
import React from "react";
import { Link, json, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AuthInputField from "../../components/InputFields/auth-input-field";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/helpers/toast-container";
import axios from "axios";

export default function ResetPassword() {
  const navigate = useNavigate();
  const initialValues = {
    password: "",
    cpassword: "",
  };
  const validationSchema = Yup.object({
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Password is required!"),
    cpassword: Yup.string()
      .required("Password is required!")
      .oneOf([Yup.ref("password")], "Passwords must be equal"),
  });

  async function handleSubmit(values) {
    try {
      const email = JSON.parse(localStorage.getItem("email")) ?? null;
      const response = await axios.post(
        "http://localhost:5000/users/reset-password",
        { ...values, email }
      );
      SuccessToast({ message: response.data.message });
      localStorage.removeItem("email");
      navigate("/login");
    } catch (err) {
      console.log(err);
      ErrorToast({ message: err.message });
    }
  }

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <h1 className="text-4xl font-medium">Change password</h1>
      <p className="text-slate-500">Fill up the form to change the password</p>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          return (
            <Form className="my-10">
              <div className="flex flex-col space-y-5">
                <AuthInputField
                  label="New Password"
                  isPassword={true}
                  name="password"
                  type="password"
                  id="password"
                />
                <AuthInputField
                  label="Re-Enter Password"
                  isPassword={true}
                  name="cpassword"
                  type="password"
                  id="cpassword"
                />
                <button
                  type="submit"
                  className="w-full py-3 font-medium text-white bg-black hover:bg-black_hover rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                    />
                  </svg>

                  <span>Change password</span>
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <p className="text-center">
        Not registered yet?{" "}
        <Link
          to="/sign-up"
          className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
        >
          <span>Register now </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </span>
        </Link>
      </p>
    </div>
  );
}
