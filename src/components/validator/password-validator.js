import React from "react";
import { CheckedIcon, RejectIcon } from "../../assets/icons/icons";

export default function PasswordValidator({ passwordCheckClass, meta }) {
  return (
    <div className="flex flex-wrap gap-2 text-xs w-[20rem] m-3 select-none">
      <p
        className={
          meta.touched && meta.value.length < 8
            ? `${passwordCheckClass} text-red`
            : meta.touched
            ? `${passwordCheckClass} text-lime-600`
            : `${passwordCheckClass} light_gray`
        }
      >
        {meta.touched && meta.value.length < 8 ? (
          <RejectIcon fill="#F94B4B" />
        ) : meta.touched ? (
          <CheckedIcon />
        ) : (
          <RejectIcon />
        )}
        {"  "}8 characters minimum
      </p>
      <p
        className={
          meta.touched && !Boolean(meta.value.match(/\d/))
            ? `${passwordCheckClass} text-red`
            : meta.touched
            ? `${passwordCheckClass} text-lime-600`
            : `${passwordCheckClass} light_gray`
        }
      >
        {meta.touched && !Boolean(meta.value.match(/\d/)) ? (
          <RejectIcon fill="#F94B4B" />
        ) : meta.touched ? (
          <CheckedIcon />
        ) : (
          <RejectIcon />
        )}{" "}
        1 number
      </p>
      <p
        className={
          meta.touched && !Boolean(meta.value.match(/[^A-Za-z0-9]/))
            ? `${passwordCheckClass} text-red`
            : meta.touched
            ? `${passwordCheckClass} text-lime-600`
            : `${passwordCheckClass} light_gray`
        }
      >
        {meta.touched && !Boolean(meta.value.match(/[^A-Za-z0-9]/)) ? (
          <RejectIcon fill="#F94B4B" />
        ) : meta.touched ? (
          <CheckedIcon />
        ) : (
          <RejectIcon />
        )}{" "}
        1 special character
      </p>
      <p
        className={
          meta.touched && meta.value === meta.value.toLowerCase()
            ? `${passwordCheckClass} text-red`
            : meta.touched
            ? `${passwordCheckClass} text-lime-600`
            : `${passwordCheckClass} light_gray`
        }
      >
        {meta.touched && meta.value === meta.value.toLowerCase() ? (
          <RejectIcon fill="#F94B4B" />
        ) : meta.touched ? (
          <CheckedIcon />
        ) : (
          <RejectIcon />
        )}{" "}
        1 uppercase letter
      </p>
    </div>
  );
}
