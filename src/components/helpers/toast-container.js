import { toast } from "react-toastify";

export function SuccessToast({ message = "success" }) {
  return toast.success(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true, // Set hideProgressBar to true
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "custom-toast", // Apply the custom class
  });
}

export function ErrorToast({ message = "Not Authorized" }) {
  return toast.error(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true, // Set hideProgressBar to true
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "custom-toast", // Apply the custom class
  });
}

export function InfoToast({ message = "Not Authorized" }) {
  return toast.info(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true, // Set hideProgressBar to true
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "custom-toast", // Apply the custom class
  });
}

export function WarnToast({ message = "Not Found" }) {
  return toast.warn(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true, // Set hideProgressBar to true
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "custom-toast", // Apply the custom class
  });
}
