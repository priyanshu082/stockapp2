import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { localapi } from '../../Assets/config';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [serverOtp, setServerOtp] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleSendOtp = useCallback(async () => {
    if (cooldown > 0) return;
  
    setLoading(true);
    try {
      const response = await axios.post(`${localapi}/forgetotp`, { email });
      setServerOtp(response.data.data.otp);
      setStep(2);
      setCooldown(60);
    } catch (error) {
      setError(error.response?.data?.message || 'Error sending OTP');
    } finally {
      setLoading(false);
    }
  }, [email, cooldown]);

  const handleVerifyOtp = useCallback(() => {
    if (parseInt(otp) === serverOtp) {
      setError('');
      setStep(3);
    } else {
      setError('Invalid OTP');
    }
  }, [otp, serverOtp]);

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${localapi}/updatepass`, { email, password: newPassword });
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#9698ED] h-[100vh] flex items-center justify-center">
      <div className="container shadow-lg backdrop-blur-md bg-[#ffffffc5] rounded-lg overflow-hidden w-[90%] h-[80%] sm:w-[70%] sm:h-[90%] flex p-[20px]">
        <div className="w-full flex flex-col items-center justify-center">
          <h2 className="text-2xl mb-4">Forgot Password</h2>
          {step === 1 && (
            <div className="w-[80%]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 border rounded mb-4"
              />
              <button
                onClick={handleSendOtp}
                className={`bg-[#9698ED] text-white py-2 px-4 rounded w-full ${
                  cooldown > 0 || loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={cooldown > 0 || loading}
              >
                {loading ? 'Sending...' : cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Send OTP'}
              </button>
            </div>
          )}
          {step === 2 && (
  <div className="w-[80%]">
    <input
      type="text"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      placeholder="Enter OTP"
      className="w-full p-2 border rounded mb-4"
    />
    <button
      onClick={handleVerifyOtp}
      className={`bg-[#9698ED] text-white py-2 px-4 rounded w-full ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={loading}
    >
      {loading ? 'Verifying...' : 'Verify OTP'}
    </button>
    {cooldown > 0 && (
      <p className="text-sm text-gray-500 mt-2">
        Resend OTP in {cooldown}s
      </p>
    )}
    <div className="text-[14px] text-red-500 w-full mt-[20px] flex justify-center">
      Check your gmail's spam folder too!
    </div>
  </div>
)}
          {step === 3 && (
            <div className="w-[80%]">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="w-full p-2 border rounded mb-4"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                className="w-full p-2 border rounded mb-4"
              />
              <button
                onClick={handleUpdatePassword}
                className={`bg-[#9698ED] text-white py-2 px-4 rounded w-full ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          )}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;