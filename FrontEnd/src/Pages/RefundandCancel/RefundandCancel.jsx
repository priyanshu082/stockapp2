import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Link } from 'react-router-dom'


const RefundandCancel = () => {
    return (
        <>
            <Navbar />
            <div className="main w-full h-auto bg-[#E6E6FF] flex items-center justify-center py-[20px] ">
                <div className="contentBox w-[90%] h-auto bg-white rounded-lg px-10 py-5">
                    {/* Introduction */}
                    <div className="text-center py-5 ">
                        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                        <p className="text-lg">
                            This Refund and Cancellation Policy outlines the terms and conditions for refunds on payments made on RideOnWhale.com. Users are encouraged to carefully read and understand the policy before making any payments.
                        </p>
                    </div>
                    {/* Refund Conditions */}
                    <div className="py-5 text-center  ">
                        <h2 className="text-2xl font-bold mb-4">Refund Conditions</h2>
                        <ul className="list-disc text-left text-lg  pl-8">
                            <li> Amount once paid through the payment gateway shall not be refunded, except in the following circumstances</li>
                            <ul className='list-disc text-left text-lg  pl-8'>
                                <li> Multiple debiting of Customer’s Card/Bank Account due to technical error.</li>
                                <li> Customer's account being debited with excess amount in a single transaction due to technical error.</li></ul>
                            <li>In case of technical error resulting in payment being charged but subscription unsuccessful, the Customer may be provided with the subscription by RideOnWhale at no extra cost.</li>
                            <li>If the Customer wishes to seek a refund in such cases, the amount will be refunded after deduction of Payment Gateway charges or any other charges.</li>

                        </ul>
                    </div>
                    {/* Refund Application */}
                    <div className="py-5 text-center  ">
                        <h2 className="text-2xl font-bold mb-4">Refund Application</h2>
                        <ul className="list-disc text-left text-lg  pl-8">
                            <li>The customer must submit an application for a refund along with the transaction number and the original payment receipt (if any)</li>
                            <li>The application in the prescribed format should be sent to                             <Link to="mailto:rideonwhale@gmail.com" className="text-blue-500 underline">rideonwhale@gmail.com</Link>
                            </li>
                            <li>The application will be processed manually, and after verification, if the claim is found valid, the excess amount will be refunded through electronic mode within 21 calendar days.</li>
                            <li> It may take 5–21 days for the money to reflect in the bank account, depending on the bank’s policy.</li>
                        </ul>
                    </div>
                    {/* Non-Liability:*/}
                    <div className="py-5 text-center 00">
                        <h2 className="text-2xl font-bold mb-4">Non-Liability</h2>
                        <ul className="list-disc text-left text-lg pl-8">
                            <li>The company assumes no responsibility and shall incur no liability if it is unable to affect any payment instruction(s) under the following circumstances:</li>
                            <ul className=" list-decimal text-left text-lg pl-8">
                            <li> Incomplete, inaccurate, invalid, or delayed payment instruction(s) issued by the user.</li>
                            <li>Insufficient funds or limits in the payment account to cover the specified amount.</li>
                            <li>Funds available in the payment account are subject to encumbrance or charge.</li>
                            <li> Refusal or delay by the user's bank or the NCC in honoring the payment instruction(s).</li>
                            <li>  Events beyond the company's control, including fire, flood, natural disasters, bank strikes, power outages, and system failures.</li>
                            </ul>
                        </ul>
                    </div>
                    {/* Termination */}
                    <div className="py-5 text-center 00">
                        <h2 className="text-2xl font-bold mb-4">Termination</h2>
                        <ul className="list-disc text-left text-lg pl-8">
                            <li>The company may suspend or terminate a user's account or services, with or without notice, for any reason or no reason. Termination is effective immediately.</li>
                            <li>Upon termination, the user agrees to stop using the services.</li>
                        </ul>
                    </div>
                    {/* Dispute Resolution */}
                    <div className="py-5 text-center ">
                        <h2 className="text-2xl font-bold mb-4">Dispute Resolution</h2>
                        <p className="text-lg">
                        The company may resolve disputes through binding arbitration in accordance with the Indian Arbitration & Conciliation Act, 1996. Disputes will be arbitrated on an individual basis.
                        </p>
                    </div>
                   
            
                </div>

            </div>
        </>
    )
}

export default RefundandCancel