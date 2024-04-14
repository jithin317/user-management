import React from "react";
import "../../index.css";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "../../assets/icons/icons";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
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

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.9,
        staggerChildren: 0.5,
        duration: 1,
      },
    },
  };

  const link = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center flex-wrap">
        <div className="flex relative items-center w-[55%] ">
          <div></div>
          <motion.div
            variants={container}
            viewport={{ once: true }}
            initial="hidden"
            whileInView="visible"
            className="w-[85%] flex flex-col items-start  gap-6"
          >
            <div className="absolute -bottom-32 left-60">
              <ArrowLeft />
            </div>
            <div className="absolute -bottom-36 -left-10">
              <ArrowRight />
            </div>
            <motion.p
              variants={link}
              className="pl-20 text-dark leading-[4rem] py-3 xl:text-6xl lg:text-5xl text-4xl font-bold"
            >
              User Management System: Empowering User Control
            </motion.p>
            <motion.p
              variants={link}
              className="lg:text-md text-lg px-20 text-gray-500 text-justify"
            >
              A comprehensive platform leveraging the MERN stack for secure,
              efficient, and scalable management of user accounts, access
              permissions, and administrative tasks.
            </motion.p>
            <motion.button
              onClick={() => navigate("/login")}
              variants={link}
              className="py-3 px-14 bg-dark text-white text-lg font-medium mx-20 my-3 hover:bg-dark_hover duration-500 rounded-xl"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
        <div className="flex flex-col relative w-[45%]">
          <div className="absolute top-0 left-0 max-w-[20rem]">
            <img
              className="w-full h-full"
              src="https://i.ibb.co/s26F26L/light-grey-dots-background.jpg"
            />
          </div>
          <div className="absolute bottom-0 right-0 max-w-[20rem]">
            <img
              className="w-full h-full"
              src="https://i.ibb.co/s26F26L/light-grey-dots-background.jpg"
            />
          </div>
          <motion.div
            {...pageTransitions}
            className="flex flex-col justify-center items-center w-[100%] h-[100%]"
          >
            <motion.div
              {...motionStyles}
              className=" rounded-full w-[90%] h-[95%] z-[50]"
            >
              <img
                src={require("../../assets/images/home.png")}
                className="w-[100%] h-[100%] rounded-full overflow-hidden"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
