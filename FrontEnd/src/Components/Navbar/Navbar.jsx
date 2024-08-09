// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link, NavLink } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import Navlogo from "../../Assets/Navbar-img/NavLogo.png";
// import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import { AuthContext } from "../../Context/AuthContext";

// const Navbar = ({scrollToKnowledge}) => {
//   const { isSubscribed, user, setUser, setIsSubscribed } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [isOpen, setIsOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("isSubscribed");
//     window.location.reload();
//   };

//   const menuVariants = {
//     closed: {
//       x: "100%",
//       transition: {
//         type: "spring",
//         stiffness: 400,
//         damping: 40
//       }
//     },
//     open: {
//       x: 0,
//       transition: {
//         type: "spring",
//         stiffness: 400,
//         damping: 40
//       }
//     }
//   };

//   const menuItems = [
//     { title: "HOME", path: "/", always: true },
//     { title: "MOVEMENT TRACKER", path: isSubscribed ? "/Data" : "/SubscriptionPage", always: true },
//     { title: "CALL PUT OI INDICATOR", path: isSubscribed ? "/CommutativeSum" : "/SubscriptionPage", always: true },
//     { title: "OI VS PRICE", path: isSubscribed ? "/StrikeGraph" : "/SubscriptionPage", always: true },
//     { title: "BUYER VS SELLER", path: isSubscribed ? "/Buyer_VS_Seller" : "/SubscriptionPage", always: true },
//     { title: "CUMULATIVE OI", path: isSubscribed ? "/oi" : "/SubscriptionPage", always: true },
//     { title: "SCREENER", path: isSubscribed ? "/screener" : "/SubscriptionPage", always: true },
//     { title: "ABOUT US", path: "/AboutUs", always: true },
//     { title: "REFUND & CANCELLATION", path: "/RefundandCancel", always: true },
//     { title: "T&C", path: "/termAndCondition", always: true },
//     { title: "PRIVACY", path: "/Privacypolicy", always: true },
//   ];

//   return (
//     <>
//       <nav className="bg-[#E6E6FF] sticky top-0 z-50 w-[100%] h-24 flex items-center justify-between px-5 sm:px-20">
//         <NavLink to="/">
//           <div className="left w-auto h-[100%] flex items-center">
//             <img className="h-20 cursor-pointer" src={Navlogo} alt="" />
//           </div>
//         </NavLink>
        
//         <div className="flex items-center gap-5">
//           {!user ? (
//             <Link to="/login" className="button z-20 py-[5px] flex items-center text-[2.25vw] md:text-[1vw] rounded-xl px-[15px] text-white">
//               LOG IN
//             </Link>
//           ) : (
//             <Link onClick={handleLogout} to="/" className="button z-20 py-[5px] flex items-center text-[12px] rounded-xl px-[15px] text-white">
//               LOG OUT
//             </Link>
//           )}

//           {!user  && (
//             <Link to={user ? "/SubscriptionPage" : "/login"} className="button z-20 py-[5px] flex items-center md:text-[1vw] text-[2.25vw] rounded-xl px-[15px] text-white">
//               SUBSCRIBE
//             </Link>
//           )}

// <button onClick={scrollToKnowledge} className="button z-20 py-[5px] flex items-center md:text-[1vw] text-[2.25vw] rounded-xl px-[15px] text-white">
//         HOW TO USE
//       </button>
//           <button onClick={() => setIsOpen(!isOpen)} className="text-xl md:text-3xl font-bold">
//             {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
//           </button>
//         </div>
//       </nav>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial="closed"
//             animate="open"
//             exit="closed"
//             variants={menuVariants}
//             className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-[#E6E6FF] bg-zinc-100 z-50 shadow-lg overflow-y-auto"
//           >
//             <div className="p-5 flex flex-col items-center mt-[5vw] h-full ">
//               <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-xl md:text-3xl ">
//                 <AiOutlineClose />
//               </button>
//               <ul className="space-y-5 px-4 sm:w-full">
//                 {menuItems.map((item, index) => (
//                   ((item.always || (user && item.loggedIn) || (!user && item.loggedOut))) && (
//                     <li key={index} className="mb-2">
//                       <NavLink
//                         to={item.path}
//                         onClick={() => setIsOpen(false)}
//                         className={({ isActive }) => `flex border-b-[1px] border-black/40 pb-[0.8vw] text-lg font-semibold ${isActive ? 'text-orange-600' : 'text-black/90'} hover:text-orange-500 transition-colors duration-400`}
//                       >
//                         {item.title}
//                       </NavLink>
//                     </li>
//                   )
//                 ))}
//               </ul>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Navbar;

import React, { useState, useContext } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navlogo from "../../Assets/Navbar-img/NavLogo.png";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = ({ scrollToKnowledge }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  // Define all possible menu items with their paths and authentication requirements
  const menuItems = [
    { title: "HOME", path: "/", requiresAuth: false },
    { title: "MOVEMENT TRACKER", path: "/Data", requiresAuth: true },
    { title: "CALL PUT OI INDICATOR", path: "/CommutativeSum", requiresAuth: true },
    { title: "OI VS PRICE", path: "/StrikeGraph", requiresAuth: true },
    { title: "BUYER VS SELLER", path: "/Buyer_VS_Seller", requiresAuth: true },
    { title: "CUMULATIVE OI", path: "/oi", requiresAuth: true },
    { title: "SCREENER", path: "/screener", requiresAuth: true },
    { title: "ABOUT US", path: "/AboutUs", requiresAuth: false },
    { title: "REFUND & CANCELLATION", path: "/RefundandCancel", requiresAuth: false },
    { title: "T&C", path: "/termAndCondition", requiresAuth: false },
    { title: "PRIVACY", path: "/Privacypolicy", requiresAuth: false },
  ];

  // Function to handle navigation with authentication check
  const handleNavigation = (path, requiresAuth) => {
    if (requiresAuth && !user) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <>
      <nav className="bg-[#E6E6FF] sticky top-0 z-50 w-[100%] h-24 flex items-center justify-between px-5 sm:px-20">
        <NavLink to="/">
          <div className="left w-auto h-[100%] flex items-center">
            <img className="h-20 cursor-pointer" src={Navlogo} alt="" />
          </div>
        </NavLink>

        <div className="flex items-center gap-5">
          {!user ? (
            <Link
              to="/login"
              className="button z-20 py-[5px] flex items-center text-[2.25vw] md:text-[1vw] rounded-xl px-[15px] text-white"
            >
              LOG IN
            </Link>
          ) : (
            <Link
              onClick={handleLogout}
              to="/"
              className="button z-20 py-[5px] flex items-center text-[12px] rounded-xl px-[15px] text-white"
            >
              LOG OUT
            </Link>
          )}

          <button
            onClick={scrollToKnowledge}
            className="button z-20 py-[5px] flex items-center md:text-[1vw] text-[2.25vw] rounded-xl px-[15px] text-white"
          >
            HOW TO USE
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xl md:text-3xl font-bold"
          >
            {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-[#E6E6FF] bg-zinc-100 z-50 shadow-lg overflow-y-auto"
          >
            <div className="p-5 flex flex-col items-center mt-[5vw] h-full">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-xl md:text-3xl"
              >
                <AiOutlineClose />
              </button>
              <ul className="space-y-5 px-4 sm:w-full">
                {menuItems.map((item, index) => (
                  <li key={index} className="mb-2">
                    <div
                      onClick={() =>
                        handleNavigation(item.path, item.requiresAuth)
                      }
                      className="cursor-pointer flex border-b-[1px] border-black/40 pb-[0.8vw] text-lg font-semibold text-black/90 hover:text-orange-500 transition-colors duration-400"
                    >
                      {item.title}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
