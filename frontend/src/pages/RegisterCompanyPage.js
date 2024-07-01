import { InputAdornment, InputLabel, TextField } from '@mui/material'
import image from '../assets/images/—Pngtree—e-learning education online illustration_6548963.png'
import { useState } from 'react'
import { MdEmail } from 'react-icons/md'
import { BiUser } from 'react-icons/bi'
import { SiNike } from "react-icons/si";
import {countries} from '../assets/js/countries'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {toast } from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'


function RegisterCompanyPage() {
    const navigate = useNavigate()
    const [company,setCompany] = useState({
        companyName:'',
        logo:"",
        country:"",
        cityOfHQ:'',
        phoneNumber:"",
        sizeOfEmployment:"",
        description:""
    })

    async function submit(){
        const res = await fetch('http://localhost:5000/api/auth/register/company',{
            credentials:'include',
            method : 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...company
            })
        })
        const data = await res.json()
        if(!res.ok){
            toast.error(data.msg)
        }else {
            toast.success('Company Created successfully')
            localStorage.setItem('companyId', data.id)
            navigate('/admin/dashboard')
        }
    }
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
          setCompany({...company,logo:reader.result})
        };
        reader.readAsDataURL(file);
      }
      
    console.log(company) 

    return (
        <div className='grid grid-cols-2'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-2xl mb-12'>Fill in your company details</h1>
                <div className='flex flex-col gap-6'>
                    <TextField
                        className='w-full'
                        id="input-with-icon-textfield"
                        onChange={e => setCompany({...company,companyName : e.target.value})}
                        value={company.companyName}
                        placeholder='Company name'
                        variant="standard"
                    />

                    <label htmlFor='logo' className=' w-full flex items-center text-white hover:cursor-pointer p-2 px-4 bg-primary rounded'>
                        <SiNike className='mr-3' />
                        <p>upload your logo</p>
                    </label>
                    <input onChange={handleImageChange} className='hidden' id='logo' type='file' />
                    <TextField
                        className='w-full'
                        id="input-with-icon-textfield"
                        onChange={e => setCompany({...company,phoneNumber : e.target.value})}
                        value={company.phoneNumber}
                        placeholder='phone number'
                        
                        variant="standard"
                    />
                    <div className='flex items-end gap-2'>
                        <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Country</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={company.country}
                                onChange={e => setCompany({...company,country : e.target.value})}
                                className='mt-0'
                            >
                                {
                                    countries.map(country =>
                                        (<MenuItem key={country} value={country}>{country}</MenuItem>)
                                    )
                                }
                            </Select>
                        </FormControl>
                        <TextField
                            className='w-full'
                            id="input-with-icon-textfield"
                            placeholder='City'
                            onChange={e => setCompany({...company,cityOfHQ:e.target.value})}
                            value={company.city}

                            variant="standard"
                        />

                    </div>
                    <div className='w-full'>
                        <FormControl className='w-full' variant="standard" sx={{ m: 0, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Size</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={company.sizeOfEmployment}
                                onChange={(e) => setCompany({...company,sizeOfEmployment:e.target.value})}
                                className='mt-0'
                            >

                                <MenuItem value={'1-10 employees'}>1-10 employees</MenuItem>
                                <MenuItem value={'11-50 employees'}>11-50 employees</MenuItem>
                                <MenuItem value={'more than 50 employees'}>more than 50 employees</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <textarea
                        className='rounded p-2 border-solid border border-gray-400'
                        rows="4"
                        placeholder="Description"
                        style={{ resize: 'none' }}
                        value={company.description}
                        onChange={e=>setCompany({...company, description: e.target.value})}
                    />
                <button onClick={submit} className='self-end rounded p-3 bg-primary hover:bg-hover hover:cursor-pointer text-white'>
                    Create company
                </button>
                </div>
            </div>
            <div className='test flex flex-col items-center justify-center h-screen'>
                <img className='w-3/4' src={image} />
            </div>
        </div>
    )
}

export default RegisterCompanyPage
