import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { PiPlus, PiMinus } from 'react-icons/pi';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

function UserInCourse({ user, index, refreshData }) {
    const [role, setRole] = React.useState(user.role === "admin" ? 'trainer': user.role);
    const { id } = useParams();
    const handleChange = async (event) => {
        const newRole = event.target.value;
        setRole(newRole);
        if(user.isParticipant){
            const res = await fetch(`http://localhost:5000/api/admin/courses/${id}/users/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ role: newRole }),
            });
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.msg);
            } else {
                toast.success(data.msg);
                refreshData();
            }
        }
    };

    const handleAdd = async () => {
        const url = `http://localhost:5000/api/admin/courses/${id}/users/${user._id}`;
        const method = 'POST';
        const res = await fetch(url, {
            method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role }),
        });
        const data = await res.json();
        if (!res.ok) {
            toast.error(data.msg);
        } else {
            toast.success(data.msg);
            refreshData();
        }
    };
    async function handleRemove(){
        const res = await fetch(`http://localhost:5000/api/admin/courses/${id}/users/${user._id}`,{
            method : 'DELETE',
            credentials : 'include',
        })
        const data = await res.json();
        if(!res.ok){
            toast.error(data.msg)
        }else {
            toast.success(data.msg)
            refreshData()
        }

    }
    return (
        <>
            <div className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'} p-2 rounded-l`}>{user.name}</div>
            <div className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'} p-2`}>
                <Box sx={{ maxWidth: 100 }}>
                    <FormControl fullWidth>
                        <InputLabel id="role-select-label">Role</InputLabel>
                        <Select
                            labelId="role-select-label"
                            id="role-select"
                            value={role === "admin" ? 'trainer': role}
                            label="Role"
                            onChange={handleChange}
                        >
                            <MenuItem value={"trainee"}>Trainee</MenuItem>
                            {<MenuItem value={"trainer"}>Trainer</MenuItem> }
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <div className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'} p-2`}>
                {user.completionDate || 'N/A'}
            </div>
            <div className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'} p-2 rounded-r pl-10`}>
                {user.isParticipant
                    ? <PiMinus className='hover:cursor-pointer bg-white p-2 box-content rounded' onClick={handleRemove} />
                    : <PiPlus className='hover:cursor-pointer bg-white p-2 box-content rounded' onClick={handleAdd} />}
            </div>
        </>
    );
}

export default UserInCourse;
