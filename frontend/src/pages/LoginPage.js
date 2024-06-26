import React, { useState } from 'react'
import image from '../assets/images/—Pngtree—e-learning education online illustration_6548963.png'
import './test.css'
import Button from '../components/Button'
import { InputAdornment, TextField } from '@mui/material'
import { BiUser } from 'react-icons/bi'
import { LuLock } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'


function LoginPage() {
    const navigate = useNavigate()
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')


    return (
        <div className='grid grid-cols-2'>
            <div className='flex flex-col justify-center items-center'>
                <div className='w-2/4 flex flex-col justify-center items-center'>

                    <h1 className='text-4xl mb-6 font-bold'>Login</h1>
                    <p className='font-light mb-10 text-left w-full'>Dive into your exclusive professional growth platform</p>
                    <div className='mb-10 w-4/5'>

                        <TextField
                            className='w-full'
                            id="input-with-icon-textfield"
                            onChange={e => setUsername(e.target.value)}
                            value={username}
                            placeholder='username'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BiUser className='size-7'/>
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                        />
                    </div>
                    <TextField
                        className='w-4/5'
                        id="input-with-icon-textfield"
                        placeholder='password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LuLock className='size-7'/>
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                    <div className='my-8 w-full flex justify-center'>

                    <Button  name='Login' onClick={() => { }} />
                    </div>
                    <p className='font-bold text-left w-full hover:cursor-pointer pl-1  hover:text-hover'>Forgot password</p>
                    <div className='flex items-center w-4/5 my-8'>
                        <div className='flex-grow h-1 bg-primary rounded'></div>
                        <p className='mx-2'>Get Started now</p>
                        <div className='flex-grow h-1 bg-primary rounded'></div>
                    </div>
                    <Button name='Register' onClick={() => {navigate('/register') }} />
                </div>
            </div>
            <div className='test flex flex-col items-center justify-center h-screen'>
                <img className='w-3/4' src={image} />
            </div>
        </div>
    )
}

export default LoginPage