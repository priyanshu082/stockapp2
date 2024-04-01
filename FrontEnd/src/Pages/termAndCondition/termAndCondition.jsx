import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Link } from 'react-router-dom'


const termAndCondition = () => {
    return (
        <>
            <Navbar />
            <div className="main w-full h-auto bg-[#E6E6FF] flex items-center justify-center py-[20px] ">
                <div className="contentBox w-[90%] h-auto bg-white rounded-lg px-10 py-5">
                    {/* Introduction */}
                    <div className="text-center py-5 ">
                        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                        <p className="text-lg">
                            By accessing and using RideOnWhale.com ('Website'), users agree to the
                            following terms and conditions and the accompanying Privacy Policy.
                            Continued use implies acceptance of any future modifications to these
                            terms.
                        </p>
                    </div>
                    {/* Registration and termination */}
                    <div className="py-5 text-center  ">
                        <h2 className="text-2xl font-bold mb-4">Registration and Termination</h2>
                        <ul className="list-disc text-left text-lg  pl-8">
                            <li>RideOnWhale reserves the right to deny access or terminate accounts without notice for unauthorized use or violation of terms.</li>
                            <li>Termination does not waive any rights held by RideOnWhale, and all granted rights revert to RideOnWhale upon termination.</li>
                        </ul>
                    </div>
                    {/* licence */}
                    <div className="py-5 text-center  ">
                        <h2 className="text-2xl font-bold mb-4">License</h2>
                        <ul className="list-disc text-left text-lg  pl-8">
                            <li>Users are granted a non-exclusive, revocable license to view the website for personal use.</li>
                            <li>No rights are granted for adaptation, editing, republishing, etc., without the prior written permission of RideOnWhale.</li>
                        </ul>
                    </div>
                    {/* data mining */}
                    <div className="py-5 text-center 00">
                        <h2 className="text-2xl font-bold mb-4">Data Mining</h2>
                        <ul className="list-disc text-left text-lg pl-8">
                            <li>Automated collection of data from the website is strictly prohibited.</li>
                            <li>Copyright for the website material, including text, images, and multimedia, belongs to RideOnWhale and its licensors.</li>
                        </ul>
                    </div>
                    {/* security */}
                    <div className="py-5 text-center 00">
                        <h2 className="text-2xl font-bold mb-4">Security</h2>
                        <ul className="list-disc text-left text-lg pl-8">
                            <li>Unauthorized use, entry, password misuse, or interference is strictly prohibited.</li>
                            <li>Users are responsible for securing login information.</li>
                            <li>RideOnWhale may employ technology for aggregate statistical information but does not monitor individual user behavior.</li>
                        </ul>
                    </div>
                    {/* Service Delays */}
                    <div className="py-5 text-center ">
                        <h2 className="text-2xl font-bold mb-4">Service Delays</h2>
                        <ul className="list-disc text-left text-lg pl-8">
                            <li>RideOnWhale reserves the right, without obligation or notice, to modify, improve, or suspend the website for maintenance.</li>
                            <li>Services described on the website may be discontinued or changed at RideOnWhale's discretion.</li>
                        </ul>
                    </div>
                    {/* Liability */}
                    <div className="py-5 text-center ">
                        <h2 className="text-2xl font-bold mb-4">Liability</h2>
                        <ul className="list-disc text-left text-lg pl-8">
                            <li>RideOnWhale and its affiliates are not liable for direct, indirect, or incidental damages arising from website use.</li>
                            <li>Continuous, uninterrupted, or secure access to the website is not guaranteed.</li>
                        </ul>
                    </div>
                    {/* Entire Agreement */}
                    <div className="py-5 text-center ">
                        <h2 className="text-2xl font-bold mb-4">Entire Agreement</h2>
                        <ul className="list-disc text-left text-lg pl-8">
                            <li>This User Agreement constitutes the entire agreement between the parties.</li>
                            <li>Users assume full responsibility for gains and losses; RideOnWhale does not guarantee accuracy or endorse views.</li>
                        </ul>
                    </div>
                    {/* Disclaimer */}
                    <div className="py-5 text-center ">
                        <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
                        <ul className="list-disc text-left text-lg pl-8">
                            <li>Information on RideOnWhale.com is for educational purposes only and does not constitute specific recommendations.</li>
                            <li>Users acknowledge the high risks associated with trading and investing, taking sole responsibility for their activities.</li>
                            <li>Past performance does not guarantee future results.</li>
                            <li>Services provided are non-refundable.</li>
                        </ul>
                    </div>
                    {/* Contact Information */}
                    <div className="py-5 text-center ">
                        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                        <p className="text-lg">
                            For inquiries regarding these terms and conditions, users can contact RideOnWhale's privacy officer at{' '}
                            <Link to="mailto:rideonwhale@gmail.com" className="text-blue-500 underline">rideonwhale@gmail.com</Link>
                        </p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default termAndCondition