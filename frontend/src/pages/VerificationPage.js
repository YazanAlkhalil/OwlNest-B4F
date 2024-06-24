import * as React from 'react';
import PropTypes from 'prop-types';
import { Input as BaseInput } from '@mui/base/Input';
import { Box, styled } from '@mui/system';
import image from '../assets/images/—Pngtree—e-learning education online illustration_6548963.png'
import OTPInput from '../components/OTP';

function VerificationPage() {
    const [disabled, setDisabled] = React.useState(false);
    const [timeLeft, setTimeLeft] = React.useState(0);

    const handleClick = () => {
        setDisabled(true);
        setTimeLeft(180); // 3 minutes in seconds

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    setDisabled(false);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };

    React.useEffect(() => {
        if (timeLeft === 0 && disabled) {
            setDisabled(false);
        }
    }, [timeLeft, disabled]);
    const [otp, setOtp] = React.useState('')
    return (
        <div className='grid grid-cols-2'>
            <div className='flex flex-col justify-center items-center px-[19%]'>
                <h1 className='text-3xl text-center'>A verification code was sent to your email</h1>
                <p className='my-6 font-light'>
                    please enter the code here to verify your email address
                </p>
                <OTPInput separator={<span>-</span>} value={otp} onChange={setOtp} length={5} />
                <button className='mt-6 bg-primary px-6 py-3 rounded-xl text-white hover:cursor-pointer hover:bg-hover text-xl'>Confirm</button>

                <div className='flex gap-3 mt-20 justify-start w-full items-center'>
                    <button className='bg-secondary hover:bg-[#3f6188d0] rounded p-2 text-white hover:cursor-pointer disabled:bg-gray-500 disabled:hover:cursor-default' onClick={handleClick} disabled={disabled}>
                        resend
                    </button>
                    {timeLeft > 0 && (
                        <div>
                            {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)} until next resend
                        </div>
                    )}
                </div>
            </div>
            <div className='test flex flex-col items-center justify-center h-screen'>
                <img className='w-3/4' src={image} />
            </div>
        </div>
    )
}

export default VerificationPage
