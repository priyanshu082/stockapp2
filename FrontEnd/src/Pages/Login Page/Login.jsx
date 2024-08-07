import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import companylogo from "../../Assets/Navbar-img/NavLogo.png";
import { AuthContext } from "../../Context/AuthContext";
import { authApi, localapi } from "../../Assets/config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const { user,setUser } = useContext(AuthContext);

  // const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${localapi}/login`, { email, password })
      .then((result) => {
        if (result) {
       
          if (typeof result.data.data !== 'string') {
            // If it's not a string, stringify it before storing in localStorage
            localStorage.setItem("user", JSON.stringify(result.data.data));
        } else {
            // If it's already a string, directly store it in localStorage
            localStorage.setItem("user", result.data.data);
        }
          setUser(result.data.data)
          navigate("/");
           window.location.reload()
        }
      })
      .catch((err) => {
        console.log(err)
        setLoginError(err.response.data.message)
      });
      
  };

  return (
    <>
      <div className="w-full bg-[#9698ED] h-[100Vh] flex items-center justify-center ">
        <div className="container shadow-lg backdrop-blur-md  bg-[#ffffffc5] rounded-lg overflow-hidden w-[90%] h-[80%] sm:w-[70%] sm:h-[90%] flex p-[20px] ">
          <div className="left group hidden hover:rounded-tl-[80px]  rounded-tl-[15px] hover:rounded-tr-[15px] rounded-tr-[80px] hover:rounded-bl-[1px] rounded-bl-[80px] hover:rounded-br-[80px]  bg-[#9698ED] w-[40%] h-[100%] sm:flex items-center justify-center duration-300 ease-in">
            <div className="image w-[80%] h-[40%]">
              <img
                className="w-[100%] h-[100%] object-cover object-center  group-hover:scale-105 duration-300 ease-in "
                src={companylogo}
                alt=""
              />
            </div>
          </div>
          <div className="right w-[100%] h-[100%] sm:w-[60%] sm:h-[100%] flex  flex-col items-center sm:items-start sm:pl-[50px] justify-center ">
            <h2 className="text-2xl  mb-4">Login</h2>
            <form
              className="w-[80%]   flex flex-col items-center justify-center mb-4"
              onSubmit={handleSubmit}
            >
              <div className="mb-4  w-[100%]">
                {loginError ? (
                  <h1 className="text-sm text-red-500">
                  </h1>
                ) : null}
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
                  placeholder="enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  className=" w-full p-2 border border-[#302f2f84] focus:border-black duration-100 ease-in focus:outline-none rounded-md "
                />
              </div>

              <div className="mb-4  w-[100%]">
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
                  placeholder="enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  className=" w-full p-2 border border-[#302f2f84] focus:border-black duration-100 ease-in focus:outline-none rounded-md "
                />
              </div>

              <button
                type="submit"
                className="button z-20 bg-[#9698ED] text-white py-2 px-4 rounded-md  w-[100%] duration-1000 ease-in"
              >
                Login
              </button>
              <Link
              to='/'
              className="button z-20 bg-[#3b3d98] text-white py-2 px-4 rounded-md w-[100%] duration-300 ease-in text-center mt-[15px]"
              >
                Home
              </Link>
            </form>


            <div className="text-[20px] text-red-500 w-full mb-[15px] flex justify-center ml-[-3.5vw]">
                  {loginError && (<div>{loginError}</div>)}
                  

            </div>

            <Link
              to="/forgot-password"
              className="text-red-400 font-semibold cursor-pointer hover:text-[#5759da] duration-200 ease-in mt-2"
            >
              Forgot Password?
            </Link>

            <div className="gotologinpage w-[90%] sm:w-[70%] h-10 flex gap items-center gap-[10px]  pl-[15px] sm:pl-[0px]">
              <p className="text-sm"> Don't have an Account? </p>
              <Link
                to="/register"
                className="text-[#265786] nav animate-bounce  cursor-pointer hover:text-[#5759da] duration-200 ease-in"
              >
                SignUp Here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
