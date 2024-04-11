import React from "react";
import "../../index.css"

export default function Home() {
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden m-0 p-0 border-0" id="home-bg">
      <div className="w-[100%] h-[100%] bg-[#0000004f] flex flex-col justify-center items-center">
        <h1 className="text-white xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl xs:text-4xl text-3xl font-bold" id="div">USER MANAGEMENT SYSTEM</h1>
        <p className="text-white md:mx-10 mx-5 md:px-10 lg:text-3xl md:text-2xl text-xl text-center">A comprehensive platform leveraging the MERN stack for secure, efficient, and scalable management of user accounts, access permissions, and administrative tasks.</p>
        <div className="m-5">
          <button class='glowing-btn'><span class='glowing-txt'>GET<span class='faulty-letter'>START</span>ED</span></button>
        </div>
      </div>
    </div>
  );
}
