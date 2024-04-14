import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  ErrorToast,
  InfoToast,
  SuccessToast,
} from "../../components/helpers/toast-container";
import axios from "axios";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const initialValues = {
    email: "",
    otp: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Enter Valid Email").required(),
    otp: Yup.string(),
  });

  async function handleSubmit(values) {
    if (show) {
      console.log(values);
      const { otp } = values;
      const realOTP = JSON.parse(localStorage.getItem("OTP")) ?? null;
      if (otp === +realOTP) {
        localStorage.removeItem("OTP");
        return navigate("/reset-password");
      }
      return ErrorToast({ message: "Check your OTP and try again..." });
    }
    try {
      InfoToast({ message: "Sending OTP, Please Wait..." });
      const response = await axios.post(
        "http://localhost:5000/users/forgot-password",
        { email: values.email }
      );
      //   console.log(response.data);
      localStorage.setItem("email", JSON.stringify(values.email));
      localStorage.setItem("OTP", JSON.stringify(response.data.OTP));
      setShow(true);
      SuccessToast({ message: response.data.message });
    } catch (err) {
      console.log(err);
      ErrorToast({ message: err.message });
    }
  }

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <h1 className="text-4xl font-medium">Reset password</h1>
      <p className="text-slate-500">Fill up the form to reset the password</p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          return (
            <Form className="my-10">
              <div className="flex flex-col space-y-5">
                <Field name="email">
                  {({ field, meta }) => {
                    return (
                      <label htmlFor="email">
                        <p className="font-medium text-slate-700 pb-2">
                          Email address
                        </p>
                        <input
                          {...field}
                          type="email"
                          className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                          placeholder="Enter email address"
                        />
                      </label>
                    );
                  }}
                </Field>
                {show && (
                  <Field name="otp">
                    {({ field, meta }) => {
                      return (
                        <label htmlFor="OTP">
                          <p className="font-medium text-slate-700 pb-2">OTP</p>
                          <input
                            {...field}
                            type="number"
                            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                            placeholder="Enter OTP"
                          />
                        </label>
                      );
                    }}
                  </Field>
                )}

                <button
                  type="submit"
                  className="w-full py-3 font-medium text-white bg-dark hover:bg-dark_hover rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
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

                  <span>Submit</span>
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
