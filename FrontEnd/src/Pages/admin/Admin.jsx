import React, { useEffect, useState } from 'react';
import axios from "axios";
import { localapi } from "../../Assets/config";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${localapi}/users`);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const fetchSubscribers = async () => {
    try {
      const response = await axios.get(`${localapi}/subscribers`);
      setSubscribers(response.data.data);
    } catch (error) {
      console.error("Error fetching subscribers", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchSubscribers();
  }, []);

  const userHeadings = ["#", "Name", "Email", "Mobile"];
  const subscriberHeadings = ["#", "Email", "Start Date", "End Date"];

  return (
    <div className='pt-[4vw] px-[4vw] flex flex-col pb-[5vw] items-center'>
      <div className='text-[3.5vw] font-semibold mb-[3vw]'>
        Admin Dashboard
      </div>

      {/* Users Table */}
      <div className='flex flex-col w-[100%] justify-center items-center mb-[5vw] pb-[5vw] border-blue-500 border-b-[4px]'>
        <h2 className='text-[3vw] font-bold mb-[2vw]'>Users</h2>
        <table className="w-[80%] border-collapse border border-gray-400">
          <thead className='bg-gray-200'>
            <tr>
              {userHeadings.map((heading, index) => (
                <th
                  className="border text-center border-gray-300 px-4 py-2 text-left text-sm font-semibold"
                  key={index}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="even:bg-gray-100 text-center">
                  <td className="border border-gray-300 px-4 py-4 text-sm">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-4 text-sm">{user.name}</td>
                  <td className="border border-gray-300 px-4 py-4 text-sm">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-4 text-sm">{user.mobile}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border border-gray-300 px-4 py-2 text-center">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Subscribers Table */}
      <div className='flex flex-col w-[100%] justify-center items-center'>
        <h2 className='text-[3vw] font-bold mb-[2vw]'>Subscribers</h2>
        <table className="w-[80%] border-collapse border border-gray-400">
          <thead className='bg-gray-200'>
            <tr>
              {subscriberHeadings.map((heading, index) => (
                <th
                  className="border text-center border-gray-300 px-4 py-2 text-left text-sm font-semibold"
                  key={index}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subscribers.length > 0 ? (
              subscribers.map((subscriber, index) => (
                <tr key={index} className="even:bg-gray-100 text-center">
                  <td className="border border-gray-300 px-4 py-4 text-sm">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-4 text-sm">{subscriber.email}</td>
                  <td className="border border-gray-300 px-4 py-4 text-sm">{subscriber.start}</td>
                  <td className="border border-gray-300 px-4 py-4 text-sm">{subscriber.end}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border border-gray-300 px-4 py-2 text-center">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;