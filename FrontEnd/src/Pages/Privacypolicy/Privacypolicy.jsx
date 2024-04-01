import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Link } from 'react-router-dom'


const Privacypolicy = () => {
    return (
        <>
            <Navbar />
            <div className="main w-full h-auto bg-[#E6E6FF] flex items-center justify-center py-[20px] ">
                <div className="contentBox w-[90%] h-auto bg-white rounded-lg px-10 py-5">
                    {/* Introduction */}
                    <div className="text-center py-5 ">
                        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                        <p className="text-lg">
                        RideOnWhale respects your privacy. This Privacy Policy explains how your information is handled on RideOnWhale.com and other community channels, such as Telegram, Whatsapp, Twitter, Facebook, Google+, and Quora ('Site(s) and the Service'). By accessing or using our Site(s), you agree to be bound by the terms and conditions of this Privacy Policy.
                        </p>
                    </div>
                    {/* policy changes */}
                    <div className="py-5 text-center  ">
                        <h2 className="text-2xl font-bold mb-4">Policy Changes</h2>
                        <p className="text-lg">We reserve the right to change this Privacy Policy at any time. Changes will be effective immediately upon notice, given through means like emails to registered users or posting the revised Policy on this page. It is your responsibility to review and be aware of any modifications.
                        </p>
                    </div>
                    {/* Consent and Processing */}
                    <div className="py-5 text-center  ">
                        <h2 className="text-2xl font-bold mb-4">Consent and Processing</h2>
                        <p className="text-lg">By using our Site(s) and the Service, you consent to the processing of your information as outlined in this Privacy Policy. Processing includes activities like using cookies and information collection, storage, and disclosure, all conducted in India.
                        </p>
                    </div>
                   {/* Location of Data Processing */}
                   <div className="py-5 text-center  ">
                        <h2 className="text-2xl font-bold mb-4">Location of Data Processing</h2>
                        <p className="text-lg">We and our service providers may be located in India. If you reside outside India, your personally identifiable information will be transferred to and processed in India. By using the Site(s) and/or the Service, you consent to such transfer and processing.
                        </p>
                    </div>
                    {/* Contact Information */}
                    <div className="py-5 text-center ">
                        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                        <p className="text-lg">
                            For questions or comments about this Privacy Policy or the use of your personally identifiable information, contact our privacy officer at{' '}
                            <Link to="mailto:rideonwhale@gmail.com" className="text-blue-500 underline">rideonwhale@gmail.com</Link>
                        </p>
                    </div>
                     {/* Why do we gather information? */}
                     <div className="py-5 text-center ">
                        <h2 className="text-2xl font-bold mb-4">Why do we gather information?</h2>
                        <p className="text-lg">
                        We gather, use, and disclose information to provide and administer requested products/services, understand user preferences, communicate with users, and manage user accounts. Information is used for marketing communications, newsletters, and updates about our company.
                        </p>
                    </div>
                      {/*Information Collected and Its Use:*/}
                      <div className="py-5 text-center ">
                        <h2 className="text-2xl font-bold mb-2">Information Collected and Its Use</h2>
                     <div className="py-2 text-center ">
                        <h2 className="text-xl font-semibold mb-1">Consumer Information</h2>
                        <p className="text-lg">
                        The contact information collected includes first and last name, email address, telephone/mobile number, and physical address. Information may also be collected through cookies, as described below.
                        </p>
                        <h2 className="text-xl font-semibold mb-1">Cookies and Log Data</h2>
                        <p className="text-lg">
                        Cookies are used to personalize information, record visits, and improve user experience. Log Data, including IP address, browser type, and web pages visited, is automatically recorded. This data is used for monitoring site usage and technical administration.
                        </p>
                    </div>
                    </div>

                     {/* Sharing Information */}
                     <div className="py-5 text-center ">
                        <h2 className="text-2xl font-bold mb-4">Sharing Information</h2>
                        <p className="text-lg">
                        We do not sell, license, lease, or disclose personal information to third parties except as noted. Information may be shared with agents, contractors, and other marketers to improve marketing efforts. Google Analytics is used for web analysis, and you can opt-out.
                        </p>
                    </div>

                      {/* ## Policy Changes */}
                      <div className="py-5 text-center ">
                        <h2 className="text-2xl font-bold mb-4"> Policy Changes</h2>
                        <p className="text-lg">
                        If our information practices change, you will be notified through the Site(s). We may use customer information for new, unanticipated uses, and any changes will be disclosed in the updated privacy policy.
                        </p>
                    </div>
                      {/* ## Personal Privacy */}
                      <div className="py-5 text-center ">
                        <h2 className="text-2xl font-bold mb-4"> Personal Privacy</h2>
                        <p className="text-lg">
                        We take utmost care of personal information at RideOnWhale to ensure no sharing with others.
                        </p>
                    </div>
                      {/* ## Notification of Changes */}
                      <div className="py-5 text-center ">
                        <h2 className="text-2xl font-bold mb-4"> Notification of Changes</h2>
                        <p className="text-lg">
                        If changes occur in this privacy policy, they will be promptly posted on our Site(s), and notice may be given through the RideOnWhale channels. You agree to accept electronic posting as notice.</p>
                    </div>
                    
                </div>

            </div>
        </>
    )
}

export default Privacypolicy