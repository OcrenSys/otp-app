import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const OTP_LENGTH = 4;
const OTPForm: React.FC = () => {
	const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
	const [isButtonEnabled, setIsButtonEnabled] = useState(false);
	const predefinedOTP =
		new URLSearchParams(window.location.search).get('otp') || '';

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const value = e.target.value;
		if (!/^\d*$/.test(value)) return;

		const newOtp = [...otp];
		newOtp[index] = value;

		setOtp(newOtp);

		if (value && index < OTP_LENGTH - 1) {
			const nextInput = document.getElementById(`otp-${index + 1}`);
			if (nextInput) nextInput.focus();
		}
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.key === 'Backspace' && !otp[index] && index > 0) {
			const prevInput = document.getElementById(`otp-${index - 1}`);
			if (prevInput) prevInput.focus();
		} else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
			const nextInput = document.getElementById(`otp-${index + 1}`);
			if (nextInput) nextInput.focus();
		} else if (e.key === 'ArrowLeft' && index > 0) {
			const prevInput = document.getElementById(`otp-${index - 1}`);
			if (prevInput) prevInput.focus();
		}
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		const pasteData = e.clipboardData.getData('text');
		if (/^\d{4}$/.test(pasteData)) {
			setOtp(pasteData.split(''));
		}
	};

	const notify = () =>
		toast(`OTP ${otp.join('')} correct!`, {
			duration: 3000,
			position: 'top-center',
			icon: '👏',
			iconTheme: {
				primary: '#000',
				secondary: '#fff'
			},
			ariaProps: {
				role: 'status',
				'aria-live': 'polite'
			}
		});

	useEffect(() => {
		if (otp.join('') === predefinedOTP) {
			setIsButtonEnabled(true);
		} else {
			setIsButtonEnabled(false);
		}
	}, [otp, predefinedOTP]);

	return (
		<div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
			<h1 className="text-2xl font-semibold text-center mb-4">
				Enter your OTP
			</h1>
			<div className="flex justify-center space-x-2 mb-4">
				{otp.map((digit, index) => (
					<input
						key={index}
						id={`otp-${index}`}
						type="text"
						value={digit}
						onChange={(e) => handleChange(e, index)}
						onKeyDown={(e) => handleKeyDown(e, index)}
						onPaste={handlePaste}
						maxLength={1}
						className="w-12 h-12 text-center text-xl rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
					/>
				))}
			</div>
			<button
				disabled={!isButtonEnabled}
				className={`w-full py-2 mt-2 rounded-md text-lg ${
					isButtonEnabled
						? 'bg-green-500 hover:bg-green-600 cursor-pointer'
						: 'bg-gray-600 cursor-not-allowed'
				}`}
				onClick={notify}
			>
				Submit
			</button>
			<Toaster />
		</div>
	);
};

export default OTPForm;
