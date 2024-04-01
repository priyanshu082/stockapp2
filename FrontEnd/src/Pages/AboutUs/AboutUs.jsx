import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Link } from 'react-router-dom'
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
const AboutUS = () => {
    return (
        <>
            <Navbar />
            <div className="main w-full h-auto bg-[#E6E6FF] flex items-center justify-center py-[20px] ">
                <div className="contentBox w-[90%] h-auto bg-white rounded-lg px-10 py-5 shadow-2xl">
                    {/*Founder's Introduction */}
                    <div className="text-center py-5">
                        <h2 className="text-2xl font-bold mb-4">Founder's Introduction</h2>
                        <p className="text-lg mb-4">
                            Hello, I'm Amritesh Chauhan, the founder of RideOnWhale.com. Armed with a degree in civil engineering, my journey into the dynamic world of finance and options trading may seem unconventional, but it's a testament to the transformative power of passion and dedication.
                        </p>
                        {/* You can uncomment the following line to add an image */}
                        {/* <img src="path/to/amritesh_image.jpg" alt="Amritesh Chauhan - Founder" className="w-full mb-4" /> */}
                    </div>
                    {/* Professional Journey*/}
                    <div className=" text-center py-5">
                        <h2 className="text-2xl font-bold mb-4">Professional Journey</h2>
                        <p className="text-lg mb-4">
                            My early professional life was rooted in civil engineering, but my fascination with financial markets, particularly options trading, led me to embark on a parallel journey. For the past 12 years, I've immersed myself in the dynamic world of options trading, honing my skills and gaining invaluable insights along the way.
                        </p>
                    </div>
                    {/* Passion for Trading */}
                    <div className=" text-center py-5">
                        <h2 className="text-2xl font-bold mb-4">Passion for Trading</h2>
                        <p className="text-lg mb-4">
                            Driven by a deep-seated passion for option trading, I transitioned from being solely an options trader to a dedicated one. The intricate dance of numbers, market dynamics, and the thrill of strategic decision-making became my daily pursuit.
                        </p>
                    </div>
                    {/*Inception of RideOnWhale.com*/}
                    <div className=" text-center py-5">
                        <h2 className="text-2xl font-bold mb-4">Inception of RideOnWhale.com</h2>
                        <p className="text-lg">
                            The inception of RideOnWhale.com is a result of my desire to share the knowledge and expertise I've acquired over the years.                        </p>
                        <p className="text-lg ">
                            Despite not having a financial background, I've come to understand the nuances of the stock market, particularly NSE option chains,                        </p>
                        <p className="text-lg ">
                            and I'm excited to provide a platform that simplifies this information for others.                        </p>
                    </div>
                    {/*Our Mission*/}
                    <div className=" text-center py-5">
                        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                        <p className="text-lg ">
                            At RideOnWhale.com, our mission is clear: to empower individuals with the insights and tools needed to navigate the NSE option chain confidently.                     </p>
                        <p className="text-lg ">
                            We're here to bridge the gap between complex financial concepts and everyday traders, making information accessible and actionable.              </p>
                    </div>

                    {/*Commitment to Transparency*/}
                    <div className="text-center py-5">
                        <h2 className="text-2xl font-bold mb-4">Commitment to Transparency</h2>
                        <p className="text-lg ">I want to emphasize that my journey into the financial world started as a passion project, and RideOnWhale.com operates with transparency.                    </p>
                        <p className="text-lg ">While my educational background may not be in finance, my commitment to providing valuable insights and fostering a community of informed traders is unwavering.           </p>
                    </div>
                    {/* contactContainer */}
                    <div className="contactContainer  w-full h-auto flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        {/* contact box  */}
                        <div className=" p-2 mt-2">
                            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                            <p className="text-lg mb-2">Feel free to reach out to us:</p>
                            <ul className="">
                                <li className="text-lg mb-2">Email: <Link to="mailto:rideonwhale@gmail.com" className="nav text-blue-600">rideonwhale@gmail.com</Link></li>
                                <li className="text-lg mb-2">Phone: +91 123 456 7890</li>
                            </ul>
                        </div>
                        {/* socilal links box */}
                        <div className=" p-2 mt-2">
                            <h2 className="text-2xl font-bold mb-4">Connect with Us</h2>
                            <ul className="">
                                <li className=" text-lg mb-2 flex items-center gap-10">
                                    <Link to="https://twitter.com/rideonwhale" className="nav text-blue-600" target="_blank" rel="noopener noreferrer">Twitter</Link>
                                    <FaSquareXTwitter className='text-2xl' />
                                </li>
                                <li className="text-lg mb-2 flex items-center gap-4">
                                    <Link to="https://www.instagram.com/rideonwhale2023" className="nav text-blue-600" target="_blank" rel="noopener noreferrer">Instagram</Link>
                                    <FaInstagramSquare className='text-2xl text-red-600 pointer' />
                                </li>
                                <li className="text-lg mb-2 flex items-center gap-7">
                                    <Link to="https://www.youtube.com/@rideonwhale" className="nav text-blue-600" target="_blank" rel="noopener noreferrer">Youtube </Link>
                                    <FaYoutube className='text-2xl text-red-600' />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AboutUS