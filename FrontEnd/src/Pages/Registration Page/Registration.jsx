import React, { useState, useEffect, useCallback,useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import companylogo from "../../Assets/Navbar-img/NavLogo.png";
import { authApi, localapi } from "../../Assets/config";

const OtpModal = React.memo(({ otp, setOtp, otpError, handleVerifyOtp, handleSendOtp, cooldown }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl mb-4">Enter OTP</h2>
        <input
          ref={inputRef}
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter OTP"
          maxLength={4}
        />
        {otpError && <p className="text-red-500 mb-2">Invalid OTP</p>}
        <button
          onClick={handleVerifyOtp}
          className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
        >
          Verify OTP
        </button>
        <button
          onClick={handleSendOtp}
          className={`bg-green-500 text-white py-2 px-4 rounded ${
            cooldown > 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={cooldown > 0}
        >
          {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
        </button>
        <div className="text-[14px] text-red-500 w-full mt-[20px] flex justify-center ">
                Check yourn gmail's spam Folder too!
                </div>
      </div>
    </div>
  );
});


const Registration = () => {
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [error,setError]=useState();
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [serverOtp, setServerOtp] = useState(null);


  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleVerifyOtp = useCallback(() => {
    if (parseInt(otp) === serverOtp) {
      setOtpError(false);
      handleRegister();
    } else {
      setOtpError(true);
    }
  }, [otp, serverOtp]);
  
  const handleSendOtp = useCallback(async () => {
    if (cooldown > 0) return;
    
    setLoading(true);
    try {
      const response = await axios.post(`${localapi}/registerotp`, { email });
      setServerOtp(response.data.data.otp);
      setShowOtpModal(true);
      setCooldown(60);
    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  }, [cooldown, email, setServerOtp, setShowOtpModal, setCooldown, setError, setLoading]);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const result = await axios.post(`${localapi}/register`, {
        name,
        email,
        mobile,
        password,
      });
      console.log(result.data);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Error registering user");
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit =async (e) => {
    e.preventDefault();
    const rgExp = /^[a-zA-Z0-9._]+@[a-z]+.[a-z]{2,6}$/;
    const passexp = /^[a-zA-Z0-9]+[!@#$%^&*()_+=-]/;

   

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

    handleSendOtp();
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
              className={`button z-20 bg-[#9698ED] text-white py-2 px-4 rounded-md w-[100%] duration-300 ease-in ${
                cooldown > 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={cooldown > 0 || loading}
            >
              {loading ? "Loading..." : cooldown > 0 ? `Wait ${cooldown}s` : "Register"}
            </button>

              <Link
              to='/'
              className="button z-20 bg-[#3b3d98] text-white py-2 px-4 rounded-md w-[100%] duration-300 ease-in text-center mt-[15px]"
              >
                Home
              </Link>
              
            </form>
            <div className="text-[20px] text-red-500 w-full mb-[10px] flex justify-center ml-[-3.5vw]">
              {error && (<div>{error}</div>)}
            </div>

            <div className="gotologinpage w-[90%] sm:w-[70%]  h-10 flex gap items-center gap-[10px]  pl-[15px] sm:pl-[0px]">
              <p className="text-sm"> Already have an Account? </p>
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
      {showOtpModal && (
  <OtpModal
    otp={otp}
    setOtp={setOtp}
    otpError={otpError}
    handleVerifyOtp={handleVerifyOtp}
    handleSendOtp={handleSendOtp}
    cooldown={cooldown}
  />
)}
    </>
  );
};

export default Registration;
