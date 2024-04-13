import React, { useState } from "react";
import { PasswordEyeClose, PasswordEyeOpen } from "../../assets/icons/icons";
import { ErrorMessage, Field } from "formik";
import { motion } from "framer-motion";
import PasswordValidator from "../validator/password-validator";

export default function AuthInputField({
  label = "",
  type = "text",
  isPassword = false,
  passwordCheck = false,
  name = "",
  inputClassName = "",
  id = "",
  labelClassName = "text-sm",
  passwordCheckClass = "flex items-center justify-center gap-1",
  xVal = 20,
  disabled,
}) {
  const [eyeIsOpen, setEyeIsOpen] = useState(false);
  return (
    <motion.div>
      <Field name={name}>
        {({ meta, field }) => {
          return (
            <>
              <div className="relative">
                <label className="font-medium">{label}</label>
                <input
                  type={isPassword ? (eyeIsOpen ? "text" : type) : type}
                  {...field}
                  id={id}
                  className={
                    meta.touched && meta.error
                      ? `w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue shadow-sm rounded-lg ${inputClassName}` +
                        "border-red"
                      : "" +
                        `w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue shadow-sm rounded-lg ${inputClassName} ${
                          disabled ? "bg-gray-100" : ""
                        }`
                  }
                />
                {isPassword && (
                  <p
                    className="absolute right-[5%] top-[55%] cursor-pointer select-none"
                    onClick={() => setEyeIsOpen(!eyeIsOpen)}
                  >
                    {eyeIsOpen ? <PasswordEyeOpen /> : <PasswordEyeClose />}
                  </p>
                )}
              </div>
              {passwordCheck && (
                <PasswordValidator
                  passwordCheckClass={passwordCheckClass}
                  meta={meta}
                />
              )}
            </>
          );
        }}
      </Field>
      {!passwordCheck && (
        <div style={{ minHeight: "1.4rem" }}>
          <ErrorMessage name={name}>
            {(msg) => (
              <span className="text-rose-500 left text-[13px] flex justify-end">
                &middot; {msg}
              </span>
            )}
          </ErrorMessage>
        </div>
      )}
    </motion.div>
  );
}
