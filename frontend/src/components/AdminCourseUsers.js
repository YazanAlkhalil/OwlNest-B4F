import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { BiSearch } from 'react-icons/bi';
import { FormControlLabel, Switch } from '@mui/material';
import UserInCourse from './UserInCourse';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

function AdminCourseUsers() {
  const [data, setData] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [filteredData, setFilteredData] = React.useState([]);
  const [isParticipantOnly, setIsParticipantOnly] = React.useState(false);
  const { id } = useParams();

  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const getUsersFromCourses = async () => {
    const res = await fetch(`http://localhost:5000/api/admin/courses/${id}/users`, {
      credentials: 'include'
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(data.msg);
    } else {
      setData(data);
      setFilteredData(data);
    }
  };

  React.useEffect(() => {
    getUsersFromCourses();
  }, []);

  React.useEffect(() => {
    let tempData = data;
    if (searchValue !== '') {
      tempData = tempData.filter((user) =>
        user.name.toLowerCase().includes(searchValue)
      );
    }
    if (isParticipantOnly) {
      tempData = tempData.filter((user) => user.isParticipant);
    }
    setFilteredData(tempData);
  }, [searchValue, isParticipantOnly, data]);

  return (
    <div>
      <div className='my-10 flex justify-between'>
        <TextField
          id="input-with-icon-textfield"
          placeholder='search'
          onChange={handleSearch}
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
        <FormControlLabel
          checked={isParticipantOnly}
          onChange={(e) => setIsParticipantOnly(e.target.checked)}
          control={<Switch />}
          label="Participants only"
        />
      </div>
      <div className='grid grid-cols-4 py-2 rounded'>
        <div className='bg-secondary text-white p-4 rounded-l'>Name</div>
        <div className='bg-secondary text-white p-4'>Role</div>
        <div className='bg-secondary text-white p-4'>Completion date</div>
        <div className='bg-secondary text-white p-4 rounded-r'>Add/Remove</div>
        {filteredData.map((user, index) => (
          <UserInCourse key={user._id} user={user} index={index} refreshData={getUsersFromCourses} />
        ))}
      </div>
    </div>
  );
}

export default AdminCourseUsers;
