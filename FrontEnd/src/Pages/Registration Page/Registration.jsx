import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import companylogo from "../../Assets/Navbar-img/NavLogo.png";
import {authApi } from "../../Assets/config";

const Registration = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  // const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const rgExp = /^[a-zA-Z0-9._]+@[a-z]+.[a-z]{2,6}$/;
    const passexp = /^[a-zA-Z0-9]+[!@#$%^&*()_+=-]/;
    // name valiadation
    if (!name || name.length <= 5) {
      setNameError(true);
    } else {
      setNameError(false);
    }

    // phone valiadation
    if (mobile.length === 10) {
      setMobileError(false);
    } else {
      setMobileError(true);
    }

    // email valiadation
    if (!rgExp.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    // Password valiadation
    if (!passexp.test(password) || password.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (
      !name ||
      name.length <= 5 ||
      !rgExp.test(email) ||
      !passexp.test(password) ||
      password.length < 8
    ) {
      return false;
    }

    axios
      .post(`${authApi}/user/signup`, {
        name: name,
        email: email,
        mobile: mobile,
        password: password,
      })
      .then((result) => {
        console.log(result);
        localStorage.setItem("token",result.data.token);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="w-full bg-[#9698ED] h-[100Vh] flex items-center justify-center ">
        <div className="container shadow-lg backdrop-blur-md  bg-[#ffffffc5] rounded-lg overflow-hidden w-[90%] h-[80%] sm:w-[70%] sm:h-[90%] flex p-[20px] ">
          <div className="left group  hidden hover:rounded-tl-[80px]  rounded-tl-[15px] hover:rounded-tr-[15px] rounded-tr-[80px] hover:rounded-bl-[1px] rounded-bl-[80px] hover:rounded-br-[80px]  bg-[#9698ED] w-[40%] h-[100%] sm:flex items-center justify-center duration-300">
            <div className="image   w-[80%] h-[40%]">
              <img
                className="w-[100%] h-[100%] object-cover object-center  group-hover:scale-105 duration-300 ease-in"
                src={companylogo}
                alt=""
              />
            </div>
          </div>
          <div className="right w-[100%] h-[100%] sm:w-[60%] sm:h-[100%] flex  flex-col items-center sm:items-start sm:pl-[50px] justify-center ">
            <h2 className="text-2xl  mb-4">Create an Account</h2>

            <form
              className="w-[80%] flex flex-col items-center justify-center mb-4"
              onSubmit={handleSubmit}
            >
              <div className="mb-4  w-[100%]">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="off"
                  placeholder="Enter Your name"
                  onChange={(e) => setName(e.target.value)}
                  className=" w-full p-2 border border-[#302f2f84] focus:border-black duration-100 ease-in focus:outline-none rounded-md "
                />
                {nameError ? (
                  <h1 className="text-sm text-red-500">
                    'PLease enter Valid Name'{" "}
                  </h1>
                ) : null}
              </div>
              <div className="mb-4  w-[100%]">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="off"
                  placeholder="Enter Your email"
                  onChange={(e) => setEmail(e.target.value)}
                  className=" w-full p-2 border border-[#302f2f84] focus:border-black duration-100 ease-in focus:outline-none rounded-md"
                />
                {emailError ? (
                  <h1 className="text-sm text-red-500">
                    'PLease enter Valid Email'{" "}
                  </h1>
                ) : null}
              </div>
              <div className="mb-4  w-[100%]">
                <label
                  htmlFor="mobile"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  autoComplete="off"
                  placeholder="Enter Mobile"
                  onChange={(e) => setMobile(e.target.value)}
                  className=" w-full p-2 border border-[#302f2f84] focus:border-black duration-100 ease-in focus:outline-none rounded-md"
                />
                {mobileError ? (
                  <h1 className="text-sm text-red-500">
                    'PLease enter Valid Mobile'{" "}
                  </h1>
                ) : null}
              </div>
              <div className="mb-4 w-[100%]">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="off"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  className=" w-full p-2 border border-[#302f2f84] focus:border-black duration-100 ease-in focus:outline-none rounded-md"
                />
                {passwordError ? (
                  <h1 className="text-sm text-red-500">
                    ''PLease enter Password must be greater than 8 , use special
                    Characters and Numbers''{" "}
                  </h1>
                ) : null}
              </div>

              <button
                type="submit"
                className="button z-20 bg-[#9698ED] text-white py-2 px-4 rounded-md w-[100%] duration-300 ease-in"
              >
                Register
              </button>
              <Link
              to='/'
              className="button z-20 bg-[#3b3d98] text-white py-2 px-4 rounded-md w-[100%] duration-300 ease-in text-center mt-[15px]"
              >
                Home
              </Link>
              
            </form>

            <div className="gotologinpage w-[90%] sm:w-[70%] h-10 flex gap items-center gap-[10px]  pl-[15px] sm:pl-[0px]">
              <p className="text-sm"> Already have an account? </p>
              <Link
                to="/login"
                className="text-[#265786] nav animate-bounce  cursor-pointer hover:text-[#5759da] duration-200 ease-in"
              >
                Login Here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
