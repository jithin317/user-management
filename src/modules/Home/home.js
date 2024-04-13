import React from "react";
import "../../index.css";
import { motion } from "framer-motion";

export default function Home() {

  const motionStyles = {
    viewport: { once: true },
    initial: { opacity: 0 },
    whileInView: { opacity: 1, transition: { delay: 0.3, duration: 0.8 } },
    animate: { y: [0, -20, 0] },
    transition: {
      repeat: Infinity,
      duration: 5,
    },
  };

  const pageTransitions = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 10, delay: 10 } },
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-[#dce9ef] overflow-hidden">
      <div className="flex items-center flex-wrap">
        <div className="flex items-center w-[55%] h-[100vh]">
          <div className="w-[90%]">
            <p className="pl-20 text-[#22226a] leading-[4rem] py-3 xl:text-6xl lg:text-5xl text-4xl font-bold">
              User Management System: Empowering User Control
            </p>
            <p className="lg:text-xl text-lg px-20 text-[#797990] text-justify font-medium">
              A comprehensive platform leveraging the MERN stack for secure, efficient, and scalable management of user accounts, access permissions, and administrative tasks.
            </p>
            <button className="py-3 px-5 bg-[#4d4ea0] text-white text-lg font-medium mx-20 my-3 hover:bg-[#22226a] duration-500 rounded-r-full rounded-l-full">
              Get Started
            </button>
          </div>
        </div>
        <div className="flex flex-col w-[45%] h-[100vh]">
          <div className="flex justify-end m-4">
            <div className="mb-6 mx-5 cursor-pointer p-3 font-medium hover:border-2 hover:border-b-black border-2 border-transparent">Login</div>
            <div className="mb-6 mx-5 cursor-pointer p-3 bg-[#4d4ea0] hover:bg-[#22226a] duration-500 text-white font-medium rounded-l-full rounded-r-full px-5">Sign In</div>
          </div>
          <motion.div {...pageTransitions} className="flex flex-col justify-center items-center w-[100%] h-[100%]">
            <motion.div {...motionStyles} className=" rounded-full w-[90%] h-[95%] z-[50]">
              <img src={require("../../assets/home.jpg")} className="w-[100%] h-[100%] z-[-1] rounded-full overflow-hidden" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
