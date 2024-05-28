import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import Navlogo from "../../Assets/Navbar-img/NavLogo.png";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../../Context/AuthContext";


const Navbar = () => {
  const {isSubscribed , user , setUser, setIsSubscribed} = useContext(AuthContext);
  const navigate = useNavigate();

  AOS.init({
    offset: 200,
    duration: 1000,
    easing: "ease",
  });

  const [toggle, setToggle] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("isSubscribed")
    window.location.reload()
  };

  return (
    <>
      <nav className="bg-[#E6E6FF] w-full h-24 flex items-center justify-between px-5 sm:px-20  sm:max-md:px-5">
        <div className="left w-auto h-[100%] flex items-center">
          <img
            className="h-20 cursor-pointer"
            data-aos="fade-down"
            src={Navlogo}
            alt=""
          />
        </div>
        <div className="flex gap-5">
          <div className="sm:max-md:hidden hidden right h-[100%] w-auto sm:flex items-center gap-10 px-4">
            <ul className="flex items-center gap-10 text-[16px] text-[#265786]">

              <li data-aos="fade-down" data-aos-delay="400">
                <NavLink
                  className={({ isActive }) =>
                    `nav ${isActive ? "text-orange-600" : ""}`
                  }
                  to="/"
                >
                  HOME
                </NavLink>
              </li>

              <li data-aos="fade-down" data-aos-delay="600">
                {!user ? (
                  <NavLink
                    className={({ isActive }) =>
                      `nav ${isActive ? "text-orange-600" : ""}`
                    }
                    to="/AboutUs"
                  >
                    ABOUT US
                  </NavLink>
                ) : (
                  <NavLink
                    className={({ isActive }) =>
                      `nav ${isActive ? "text-orange-600" : ""}`
                    }
                   
                    to={!isSubscribed ? "/SubscriptionPage" :"/Data"}
                  >
                   PCR
                  </NavLink>
                )}
              </li>

              <li data-aos="fade-down" data-aos-delay="600">
                {!user? (
                  <NavLink
                    className={({ isActive }) =>
                      `nav ${isActive ? "text-orange-600" : ""}`
                    }
                    to="/RefundandCancel"
                  >
                    REFUND & CANCELLATION
                  </NavLink>
                ) : (
                  <NavLink
                    className={({ isActive }) =>
                      `nav ${isActive ? "text-orange-600" : ""}`
                    }
                  
                    to={!isSubscribed ? "/SubscriptionPage" :"/CommutativeSum"}
                  >
                  CALL v/s PUT
                  </NavLink>
                )}
              </li>

              <li data-aos="fade-down" data-aos-delay="600">
                {!user ? (
                  <NavLink
                    className={({ isActive }) =>
                      `nav ${isActive ? "text-orange-600" : ""}`
                    }
                    to="/termAndCondition"
                  >
                    T&C
                  </NavLink>
                ) : (
                  <NavLink
                    className={({ isActive }) =>
                      `nav ${isActive ? "text-orange-600" : ""}`
                    }
              
                    to={!isSubscribed ? "/SubscriptionPage" :"/StrikeGraph"}
                  >
                   PRICE
                  </NavLink>
                )}
              </li>       

              <li data-aos="fade-down" data-aos-delay="600">
                {!user ? (
                  <NavLink
                    className={({ isActive }) =>
                      `nav ${isActive ? "text-orange-600" : ""}`
                    }
                    to="/Privacypolicy"
                  >
                   PRIVACY
                  </NavLink>
                ) : (
                  <NavLink
                    className={({ isActive }) =>
                      `nav ${isActive ? "text-orange-600" : ""}`
                    }
                
                    to={!isSubscribed ? "/SubscriptionPage" :"/Buyer_VS_Seller"}
                  >
                   BUYERvsSELLER
                  </NavLink>
                )}
              </li>       

              <li data-aos="fade-down" data-aos-delay="600">
                {user && (
                  <NavLink
                    className={({ isActive }) =>
                      `nav ${isActive ? "text-orange-600" : ""}`
                    }
                    to={!isSubscribed ? "/SubscriptionPage" :"/screener"}
                  >
                   SCREENER
                  </NavLink>
                )}
              </li>           


            </ul>
          </div>

          <div className="flex gap-5">
            {!user ? (
              <Link
                to="/login"
                className="button z-20 py-[5px] flex items-center text-[12px] rounded-xl px-[15px] text-white"
                data-aos="fade-down"
                data-aos-delay="1400"
              >
                LOG IN
              </Link>
            ) : (
              <Link
                onClick={handleLogout}
                to="/"
                className="button z-20 py-[5px] flex items-center text-[12px] rounded-xl px-[15px] text-white"
                data-aos="fade-down"
                data-aos-delay="1400"
              >
                LOG OUT
              </Link>
            )}

            {toggle ? (
              <AiOutlineClose
                onClick={() => setToggle(!toggle)}
                className="sm:hidden block sm:max-md:block text-3xl font-bold"
              />
            ) : (
              <AiOutlineMenu
                onClick={() => setToggle(!toggle)}
                className="sm:hidden block sm:max-md:block text-3xl font-bold "
              />
            )}
          </div>

          <div>

         {!isSubscribed && ( <Link
                to={user ? "/SubscriptionPage" :"/login"}
                className="button z-20 py-[5px] flex items-center text-[14px] rounded-xl px-[15px] text-white"
                data-aos="fade-down"
                data-aos-delay="1400"
              >
                Subscribe
           </Link>) }

          </div>

        </div>
      </nav>

      {/* Mobile view dropdown */}
      {toggle && (
        <nav className="sm:hidden block sm:max-md:block bg-[#E6E6FF] w-full py-2 px-10 duration-1000 ">
          <ul className="flex flex-col gap-2">
            <li>
              <Link className="block text-[16px] text-[#265786]" to="/">
                HOME
              </Link>
            </li>

            <li>
            {!user ? (<Link className="block text-[16px] text-[#265786]" to="/AboutUs">
                ABOUT US
              </Link>):(<Link className="block text-[16px] text-[#265786]" 
    
              to={!isSubscribed ? "/SubscriptionPage" :"/Data"}
              >
                PCR
              </Link>)}
              
            </li>

            <li>
            {!user ? (<Link className="block text-[16px] text-[#265786]" to="/RefundandCancel">
            REFUND & CANCELLATION
              </Link>):(<Link className="block text-[16px] text-[#265786]" to={!isSubscribed ? "/SubscriptionPage" :"/CommutativeSum"} >
              CALL v/s PUT
              </Link>)}
            </li>


            <li>
            {!user ? (<Link className="block text-[16px] text-[#265786]" 
            to="/termAndCondition">
               T&C
              </Link>):(<Link className="block text-[16px] text-[#265786]" 
              
              to={!isSubscribed ? "/SubscriptionPage" :"/StrikeGraph"}>
               PRICE
              </Link>)}
            </li>

          
            <li>
            {!user ? 
            (<Link className="block text-[16px] text-[#265786]" to="/Privacypolicy">
                PRIVACY
              </Link>) : 
              (<Link className="block text-[16px] text-[#265786]" to={!isSubscribed ? "/SubscriptionPage" :"/Buyer_VS_Seller"}  >
                BUYERvsSELLER
              </Link>)
              }
            </li>

            <li>
            {!user && 
              (<Link className="block text-[16px] text-[#265786]" to={!isSubscribed ? "/SubscriptionPage" :"/screener"} >
                SCREENER
              </Link>)
              }
            </li>
    

          </ul>
        </nav>
      )}
    </>
  );
};

export default Navbar;
