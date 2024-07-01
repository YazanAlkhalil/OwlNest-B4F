import React, { useEffect, useState } from 'react';
import FormDialog from '../components/admin/AddUserDialog';
import { InputAdornment, TextField } from '@mui/material';
import { BiSearch } from 'react-icons/bi';
import UserInCourseAdmin from '../components/UserInCourseAdmin';
import toast from 'react-hot-toast';

function AdminUsers() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const getUsersFromCompany = async () => {
      try {
        const res = await fetch('http://localhost:5000//api/admin/:companyId/users');
        const result = await res.json();
        if (!res.ok) {
          toast.error(data.msg)
        }
        setData(result);
        setFilteredData(result);
      } catch (error) {
        console.log(error.message);
      }
    };

    getUsersFromCompany();
  }, []);

  useEffect(() => {
    if (searchValue !== '') {
      const search = searchValue.toLowerCase();
      const tempData = data.filter(user => user.name.toLowerCase().includes(search));
      setFilteredData(tempData);
    } else {
      setFilteredData(data);
    }
  }, [searchValue, data]);

  return (
    <div>
      <div className='flex justify-between items-center'>
        <FormDialog className='self-start' />
        <TextField
          placeholder='search'
          id="input-with-icon-textfield"
          onChange={e => setSearchValue(e.target.value)}
          value={searchValue}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BiSearch />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </div>
      <div className='grid grid-cols-4'>
        <div className='bg-secondary text-white p-4 rounded-l'>Name</div>
        <div className='bg-secondary text-white p-4'>Role</div>
        <div className='bg-secondary text-white p-4'>Last login</div>
        <div className='bg-secondary text-white p-4 rounded-r'>Actions</div>
        {filteredData.map((user, index) => (
          <UserInCourseAdmin key={JSON.stringify(user)} index={index} user={user} />
        ))}
      </div>
    </div>
  );
}

export default AdminUsers;
