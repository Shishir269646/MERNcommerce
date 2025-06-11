"use client";
import { useState } from "react";
import "remixicon/fonts/remixicon.css";

const Login = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="h-full w-full bg-pink-500 flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative h-[400px] w-[600px] bg-white rounded-[20px] overflow-hidden">
                {/* Login Form */}
                <div
                    className={`absolute h-[300px] w-[250px] m-auto top-0 ${isHovered ? "left-[250px]" : "left-[-300px]"
                        } right-0 bottom-0 transition-all duration-1000 z-10`}
                >
                    <form className="flex flex-col items-center">
                        <h1 className="text-black text-xl text-center">LOGIN</h1>
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            className="h-10 w-[280px] rounded-md mt-2 pl-2 bg-gray-300 text-pink-700 outline-none border-none"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            className="h-10 w-[280px] rounded-md mt-2 pl-2 bg-gray-300 text-pink-700 outline-none border-none"
                        />
                        <button
                            type="submit"
                            className={`h-10 w-[280px] rounded-md mt-5 ${isHovered ? "border-4 border-white" : ""
                                } bg-pink-700 text-white text-base font-medium transition-all duration-1000`}
                        >
                            LOGIN
                        </button>
                        <p className="text-gray-500 text-sm text-center mt-2">
                            Forget Username or Password?
                        </p>
                    </form>
                </div>

                {/* Subscribe Section */}
                <div
                    className={`absolute bg-pink-700 h-[300px] w-[250px] m-auto top-0 ${isHovered
                        ? "left-[-300px] scale-100 opacity-100"
                        : "left-[-900px] scale-0 opacity-0"
                        } right-0 bottom-0 rounded-[20px] transition-all duration-1000`}
                >
                    <a
                        href="#"
                        className="absolute block left-[-55px] top-[15px]  bg-white text-pink-700 text-center transform -rotate-[25deg] text-lg h-[25px] w-[200px] no-underline"
                    >
                        Subscribe
                    </a>
                    <button className="absolute m-auto left-0 top-0 right-0 bottom-0 h-10 w-full border-none outline-none text-pink-700 text-base bg-white transition-all duration-1000 text-center overflow-hidden">
                        <p className="p1 transition-all duration-1000">THE INVINCIBLE KREATOR</p>
                        <p>Code by KybroTIK</p>
                    </button>
                </div>

                {/* Decorative Elements */}
                <span className="design-1">
                    <span className="design-1a"></span>
                </span>
                <span className="design-mini-1">
                    <span className="design-mini-1a"></span>
                </span>
                <span className="design-mini-2">
                    <span className="design-mini-2a"></span>
                </span>
            </div>


        </div>
    );
};

export default Login;
