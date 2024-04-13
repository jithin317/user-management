import { motion } from "framer-motion";

export function AuthButton({
  className = "",
  text = "Login",
  onClkFn,
  type,
  disabled,
}) {
  return (
    <motion.button
      aria-label={text}
      type={type}
      disabled={disabled}
      onClick={onClkFn}
      className={`w-full px-4 py-2 text-white font-medium bg-dark hover:bg-dark_hover active:bg-blue rounded-lg duration-150 ${className} disabled:bg-opacity-50 group`}
    >
      <svg
        aria-hidden="true"
        role="status"
        className={`inline w-4 h-4 me-3 text-white animate-spin ${
          disabled ? "block" : "hidden"
        }`}
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
      {text}
    </motion.button>
  );
}

export function DashboardButton({
  className = "",
  onClkFn,
  text = "",
  children,
  disabled,
}) {
  return (
    <button
      className="bg-blue flex items-center transition duration-200 justify-center gap-2 text-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] hover:-translate-y-1 text-white mx-8 md:mx-0 md:mr-4 rounded-md py-2 px-4 hover:bg-blue_hover disabled:opacity-50 disabled:pointer-events-none"
      onClick={onClkFn}
      disabled={disabled}
    >
      {text}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#fff"
        width={15}
        height={15}
        viewBox="0 0 448 512"
      >
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
      </svg>
    </button>
  );
}
