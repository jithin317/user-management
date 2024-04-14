import React from "react";
import EditInputField from "../../components/InputFields/edit-input-field";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/helpers/toast-container";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const storedUserData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const token = JSON.parse(localStorage.getItem("jwt_token")) ?? null;

  const initialValues = {
    FirstName: storedUserData.FirstName || "",
    LastName: storedUserData.LastName || "",
    Gender: storedUserData.Gender || "",
    ContactNo: "",
    PermanentAddress: storedUserData.PermanentAddress || "",
    CurrentAddress: storedUserData.CurrentAddress || "",
    Birthday: toBirthday(storedUserData.Birthday || new Date()),
    About: storedUserData.About || "",
  };

  function toBirthday(dateStr) {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  }

  const validationSchema = Yup.object({
    FirstName: Yup.string()
      .required("FirstName is required")
      .min(1, "Must be minimum 1 characters long!")
      .max(15, "Must be maximum 15 characters long!"),
    LastName: Yup.string()
      .required("LastName is required")
      .min(1, "Must be minimum 1 characters long!")
      .max(15, "Must be maximum 15 characters long!"),
    Gender: Yup.string()
      .required("Gender is required")
      .oneOf(["Male", "Female"], 'Gender must be either "male" or "female"'),
    ContactNo: Yup.string()
      .min(13, "Enter valid phone number!")
      .max(13, "Enter valid phone number!")
      .required("Number is required"),
    PermanentAddress: Yup.string().max(
      70,
      "Must be maximum 15 characters long!"
    ),
    CurrentAddress: Yup.string().max(70, "Must be maximum 15 characters long!"),
    Birthday: Yup.date()
      .required("Birthday is required")
      .max(new Date(), "Birthday cannot be in the future"),
    About: Yup.string().max(30, "Must be maximum 30 characters long!"),
  });

  async function handleSubmit(values, { resetForm }) {
    try {
      const response = await axios.post(
        "http://localhost:5000/profile",
        { ...values },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      SuccessToast({ message: response.data.message || "Updated" });
      resetForm();
      localStorage.removeItem("userData");
      navigate("/profile");
    } catch (err) {
      ErrorToast({ message: err.message || "Error occured" });
    }
  }

  return (
    <main className="py-12 bg-gray-200">
      <div className="max-w-screen-lg bg-white border-t-4 border-primary_hover mx-auto px-4 py-4 rounded-2xl text-gray-600 md:px-8">
        <div className="max-w-lg mx-auto space-y-3 text-center">
          <p className="text-indigo-500 text-3xl font-semibold sm:text-4xl">
            Edit Info
          </p>
        </div>
        <div className="mt-5 max-w-lg md:max-w-full mx-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => {
              console.log(values);
              return (
                <Form className="flex flex-col md:flex-row md:gap-5">
                  <div className="flex w-full flex-col items-center gap-x-6">
                    <EditInputField
                      id={"FirstName"}
                      type={"text"}
                      label={"First Name"}
                      placeholder={"John"}
                      name={"FirstName"}
                    />
                    <EditInputField
                      id={"LastName"}
                      type={"text"}
                      label={"Last Name"}
                      placeholder={"Doe"}
                      name={"LastName"}
                    />
                    <div className="w-full">
                      <label htmlFor="phone-number" className="font-medium">
                        Contact number
                      </label>
                      <Field
                        defaultCountry="in"
                        id="phone-number"
                        className={`w-full mt-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg`}
                        component={PhoneInput}
                        inputStyle={{
                          color: "rgb(89,91,104)",
                          width: "100%",
                          background: "transparent",
                          fontSize: "18px",
                        }}
                        name="ContactNo"
                        onChange={(value) => setFieldValue("ContactNo", value)}
                        autoFormat
                      />
                      <div className="h-[1rem] w-full flex justify-end items-center">
                        <ErrorMessage name={"ContactNo"}>
                          {(msg) => (
                            <span className="block text-sm text-[#F94B4B] text-right">
                              &middot; {msg}
                            </span>
                          )}
                        </ErrorMessage>
                      </div>
                    </div>
                    <EditInputField
                      isGender={true}
                      id={"Gender"}
                      label={"Gender"}
                      name={"Gender"}
                    />
                    <EditInputField
                      id={"PermanentAddress"}
                      type={"text"}
                      label={"PermanentAddress"}
                      name={"PermanentAddress"}
                    />
                  </div>
                  <div className="w-full">
                    <EditInputField
                      id={"CurrentAddress"}
                      type={"text"}
                      label={"CurrentAddress"}
                      name={"CurrentAddress"}
                    />
                    <div className="w-full flex flex-col">
                      <div className="w-full flex flex-col ">
                        <label htmlFor={"birthday"} className="font-medium">
                          Birthday
                        </label>
                        <Field name="Birthday">
                          {({ field }) => {
                            return (
                              <DatePicker
                                id="birthday"
                                {...field}
                                showMonthDropdown
                                showYearDropdown
                                selected={values.Birthday}
                                scrollableYearDropdown
                                yearDropdownItemNumber={45}
                                minDate={new Date(1990, 0, 1)} // Minimum date (1st January 2000)
                                maxDate={new Date()}
                                onChange={(date) => {
                                  if (date !== values.Birthday) {
                                    setFieldValue("Birthday", date);
                                  }
                                }}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select a date"
                                className={`w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg`}
                              />
                            );
                          }}
                        </Field>
                      </div>
                      <div className="h-[1rem] w-full flex justify-end items-center">
                        <ErrorMessage name={"Birthday"}>
                          {(msg) => (
                            <span className="block text-sm text-[#F94B4B] text-right">
                              &middot; {msg}
                            </span>
                          )}
                        </ErrorMessage>
                      </div>
                    </div>
                    <div className="w-full flex flex-col">
                      <div className="w-full flex flex-col">
                        <label htmlFor={"about"} className="font-medium">
                          About
                        </label>
                        <Field
                          as="textarea"
                          name="About"
                          id="about"
                          rows={6}
                          className={`w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg`}
                        />
                        <div className="h-[1rem] w-full flex justify-end items-center">
                          <ErrorMessage name={"About"}>
                            {(msg) => (
                              <span className="block text-sm text-[#F94B4B] text-right">
                                &middot; {msg}
                              </span>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                      Save
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </main>
  );
}
