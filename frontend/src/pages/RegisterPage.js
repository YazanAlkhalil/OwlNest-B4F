import { useState } from 'react'
import image from '../assets/images/—Pngtree—e-learning education online illustration_6548963.png'
import { InputAdornment, TextField } from '@mui/material'
import Button from '../components/Button'
import { BiPhone, BiUser } from 'react-icons/bi'
import { LuLock } from 'react-icons/lu'
import { MdArrowBack, MdEmail } from 'react-icons/md'
import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './test.css'
import { countries } from '../assets/js/countries'
import { useNavigate } from 'react-router-dom'


function RegisterPage() {
    const navigate = useNavigate()
    const [fistPage, setFistPage] = useState(false)
    const [value, setValue] = React.useState(null);

    return (
        <div className='grid grid-cols-2'>
            <div className='flex flex-col justify-center items-center'>
                <div className='w-2/4 flex flex-col justify-center items-center'>
                    <h1 className='text-4xl mb-6 font-bold'>Register</h1>
                    {
                        !fistPage ?
                            <>
                                <div className='flex flex-col gap-8 w-4/5'>
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
                                    <TextField
                                        className='w-full'
                                        id="input-with-icon-textfield"
                                        placeholder='password'
                                        // onChange={e => setPassword(e.target.value)}
                                        // value={password}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LuLock className='size-7' />
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                    />
                                    <TextField
                                        className='w-full'
                                        id="input-with-icon-textfield"
                                        placeholder='confirm password'
                                        // onChange={e => setPassword(e.target.value)}
                                        // value={password}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LuLock className='size-7' />
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                    />
                                </div>
                                <p className='font-bold text-left w-full hover:cursor-pointer my-8 hover:text-hover'>Forgot password</p>
                                <Button name='Next' onClick={() => { setFistPage(true) }} />
                                <div className='flex items-center w-4/5 my-8'>
                                    <div className='flex-grow h-1 bg-primary rounded'></div>
                                    <p className='mx-2'>Already have an account</p>
                                    <div className='flex-grow h-1 bg-primary rounded'></div>
                                </div>
                                <Button name='Login' onClick={() => {navigate('/login') }} />
                            </>
                            :
                            <>
                                <div className='flex my-8 flex-col gap-8 w-4/5'>

                                    <TextField
                                        className='w-full'
                                        id="input-with-icon-textfield"
                                        // onChange={e => setUsername(e.target.value)}
                                        // value={username}
                                        placeholder='phone number'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <BiPhone className='size-7' />
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                    />
                                    
                                    <div className='w-full'>      
                                        <FormControl className='w-full' variant="standard" sx={{ m: 0, minWidth: 120 }}>
                                            <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-standard-label"
                                                id="demo-simple-select-standard"
                                                // value={age}
                                                // onChange={handleChange}
                                                className='mt-0'
                                            >
                                                
                                                <MenuItem value={'male'}>Male</MenuItem>
                                                <MenuItem value={'female'}>Female</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className='flex items-end gap-2'>
                                    <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-standard-label">Country</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            // value={age}
                                            // onChange={handleChange}
                                            className='mt-0'
                                        >
                                            
        
                                            {
                                                countries.map(country => 
                                                    ( <MenuItem value={country}>{country}</MenuItem>)
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        className='w-full'
                                        id="input-with-icon-textfield"
                                        placeholder='City'
                                        // onChange={e => setPassword(e.target.value)}
                                        // value={password}
                                        // InputProps={{
                                        //     startAdornment: (
                                        //         <InputAdornment position="start">
                                        //             <LuLock className='size-7' />
                                        //         </InputAdornment>
                                        //     ),
                                        // }}
                                        variant="standard"
                                    />
                                    
                                    </div>
                                    <LocalizationProvider   dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Birth date"
                                            value={value}
                                            onChange={(newValue) => setValue(newValue)}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <Button name='Register' onClick={() => { }} />
                                <div className='flex-grow h-10 bg-primary rounded'></div>
                                <div onClick={() => { setFistPage(false) }} className='hover:text-hover hover:cursor-pointer flex justify-start w-full items-center gap-2'>
                                    <MdArrowBack className=''/>

                                <p className='  text-left w-4/5' >Go back</p>
                                </div>
                            </>
                    }

                </div>
            </div>
            <div className='test flex flex-col items-center justify-center h-screen'>
                <img className='w-3/4' src={image} />
            </div>
        </div>
    )


}

export default RegisterPage
