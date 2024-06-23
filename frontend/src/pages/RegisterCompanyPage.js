import { InputAdornment, TextField } from '@mui/material'
import image from '../assets/images/—Pngtree—e-learning education online illustration_6548963.png'
import { useState } from 'react'
import { MdEmail } from 'react-icons/md'
import { BiUser } from 'react-icons/bi'
import { SiNike } from "react-icons/si";

function RegisterCompanyPage() {
    return (
        <div className='grid grid-cols-2'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-2xl mb-12'>Fill in your company details</h1>
                <div>
                    <TextField
                        className='w-full'
                        id="input-with-icon-textfield"
                        // onChange={e => setUsername(e.target.value)}
                        // value={username}
                        placeholder='username'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <BiUser className='size-7' />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                    <TextField
                        className='w-full'
                        id="input-with-icon-textfield"
                        // onChange={e => setUsername(e.target.value)}
                        // value={username}
                        placeholder='email'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MdEmail className='size-7' />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                    <label htmlFor='logo' className=' w-full flex items-center text-white hover:cursor-pointer p-2 bg-primary rounded'>

                          <SiNike/> 
                          <p>upload your logo</p> 
                    </label>
                    <input className='hidden'id='logo' type='file'/>

                </div>
            </div>
            <div className='test flex flex-col items-center justify-center h-screen'>
                <img className='w-3/4' src={image} />
            </div>
        </div>
    )
}

export default RegisterCompanyPage
