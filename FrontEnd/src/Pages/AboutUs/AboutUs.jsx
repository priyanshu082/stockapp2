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
      <header className="py-5">
        <h1 className="text-4xl font-bold mb-4">Welcome to Rideonwhale.com</h1>
        <p className="text-lg mb-4">
          Your ultimate resource for cutting-edge insights and real-time data on options trading. Since our establishment in 2022, we have been committed to empowering option traders with the knowledge, tools, and data they need to excel in the dynamic option trading market.
        </p>
      </header>
      
      <section className="py-5">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg mb-4">
          At Rideonwhale.com, our mission is to simplify options trading and provide traders with comprehensive, accurate analysis and real-time data. We aim to make complex trading strategies accessible and actionable, helping traders of all levels achieve their financial goals.
        </p>
      </section>
      
      <section className="py-5">
        <h2 className="text-2xl font-bold mb-4">Who We Serve</h2>
        <p className="text-lg mb-4">
          Our platform is designed for option traders looking to elevate their trading skills. Whether you're an experienced professional or a newcomer to the market, Rideonwhale.com offers invaluable resources to enhance your strategies and improve your trading outcomes. We are your trusted partner in navigating the complexities of options trading.
        </p>
      </section>
      
      <section className="py-5">
        <h2 className="text-2xl font-bold mb-4">What Sets Us Apart</h2>
        <p className="text-lg mb-4">
          What distinguishes Rideonwhale.com is our dedication to quality, accuracy, and real-time information. Our expert analysts bring extensive experience and deep market insights, ensuring you have the latest and most reliable data at your fingertips. We transform complex data into clear, actionable strategies to help you stay ahead of market trends.
        </p>
      </section>
      
      <section className="py-5">
        <h2 className="text-2xl font-bold mb-4">Real-Time Option Chain Data</h2>
        <p className="text-lg mb-4">
          One of our standout features is providing real-time option chain data. We understand the importance of timely information in options trading, and our platform ensures you have access to up-to-the-minute data. This empowers you to make informed decisions and respond quickly to market changes.
        </p>
      </section>
      
      <section className="py-5">
        <h2 className="text-2xl font-bold mb-4">Our Core Values</h2>
        <ul className="text-lg mb-4 text-start ml-[0vw] list-disc list-inside">
          <li><strong>Integrity:</strong> We maintain the highest standards of honesty and transparency in our analyses and recommendations.</li>
          <li><strong>Education:</strong> We are committed to educating our users, helping them become more confident and successful traders.</li>
          <li><strong>Innovation:</strong> We continuously seek innovative solutions to deliver unparalleled insights and enhance our platform’s user experience.</li>
          <li><strong>Community:</strong> We foster a supportive and vibrant community where traders can share ideas, strategies, and grow together.</li>
        </ul>
      </section>
      
      <section className="py-5">
        <h2 className="text-2xl font-bold mb-4">Our Journey</h2>
        <p className="text-lg mb-4">
          Since our launch in 2016, Rideonwhale.com has grown into a trusted resource for thousands of traders. Our journey is marked by continuous improvement and a relentless pursuit of excellence. Our greatest achievement is the trust and loyalty of our users, which drives us to keep innovating and providing top-tier trading insights.
        </p>
      </section>
      
      <section className="py-5">
        <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
        <p className="text-lg mb-4">
          Rideonwhale.com is not a SEBI (Securities and Exchange Board of India) registered entity. We do not provide financial or investment advice and do not recommend any action to be taken based on the information provided on our platform. All content is for informational purposes only, and traders should conduct their own research or consult with a financial advisor before making any trading decisions.
        </p>
      </section>
      
      <section className="py-5">
        <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
        <ul className="text-lg mb-4 text-start ml-[0vw] list-disc list-inside">
          <li><strong>Expert Analysis:</strong> In-depth, timely market analysis from seasoned analysts.</li>
          <li><strong>Educational Resources:</strong> Comprehensive materials, from beginner guides to advanced strategies.</li>
          <li><strong>Real-Time Data:</strong> Access to real-time option chain data and market updates.</li>
          <li><strong>Community Support:</strong> A vibrant community of traders sharing knowledge and experiences.</li>
        </ul>
      </section>
      
      <section className="py-5">
        <h2 className="text-2xl font-bold mb-4">Join Us</h2>
        <p className="text-lg mb-4">
          Start your trading journey with Rideonwhale.com and unlock your full potential. With our expert guidance, real-time data, and comprehensive resources, you'll be well-equipped to navigate the dynamic world of options trading confidently. Let’s ride the wave of success together!
        </p>
        <p className="text-lg mb-4">
          For more information or to start exploring our resources, visit our website at <a href="https://rideonwhale.com" className="text-blue-600 underline">Rideonwhale.com</a>. Join the Rideonwhale.com community today and take the next step in your trading journey.
        </p>
      </section>
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