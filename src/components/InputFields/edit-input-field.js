import { ErrorMessage, Field } from "formik";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";

export default function EditInputField({
  name,
  id,
  placeholder,
  type,
  inputClassName = "",
  label,
  isGender = false,
  as = "",
}) {
  return (
    <div className="w-full flex flex-col">
      {!isGender ? (
        <Field as={as} name={name}>
          {({ field, meta, form }) => {
            return (
              <div className="w-full ">
                <label htmlFor={id} className="font-medium">
                  {label}
                </label>
                <input
                  type={type}
                  id={id}
                  placeholder={placeholder}
                  {...field}
                  className={`w-full mt-2 px-3 py-2 text-gray-500  bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${inputClassName}`}
                />
              </div>
            );
          }}
        </Field>
      ) : (
        <div className="w-full">
          <label htmlFor={id} className="font-medium">
            {label}
          </label>
          <Field
            as="select"
            id={id}
            name={name}
            className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg`}
          >
            <option value="" className="bg-white text-gray-400">
              Select
            </option>
            <option value="Male" className="bg-white  text-gray-400">
              Male
            </option>
            <option value="Female" className="bg-white text-gray-400">
              Female
            </option>
            <option value="other" className="bg-white text-gray-400">
              Other
            </option>
          </Field>
        </div>
      )}
      <div className="h-[1rem] w-full flex justify-end items-center">
        <ErrorMessage name={name}>
          {(msg) => (
            <span className="block text-sm text-[#F94B4B] text-right">
              &middot; {msg}
            </span>
          )}
        </ErrorMessage>
      </div>
    </div>
  );
}
