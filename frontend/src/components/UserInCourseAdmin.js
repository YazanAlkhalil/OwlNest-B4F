import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { MdClose } from 'react-icons/md';
import { CgDetailsMore } from "react-icons/cg";
import React from 'react';
import toast from 'react-hot-toast';

function UserInCourseAdmin({ user, index, onUserRemoved , onRoleUpdated}) {
    const [role, setRole] = React.useState(user.role);
    const companyId = localStorage.getItem('companyId')

    const handleChange = async (event) => {
        const newRole = event.target.value;
        setRole(newRole);
        try {
            const companyId = localStorage.getItem('companyId');
            const res = await fetch(`http://localhost:5000/api/admin/${companyId}/users/${user.id}`, {
                method: 'PUT',
                credentials : 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: newRole }),
            });
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.msg);
            } else {
                toast.success(data.msg);
                onRoleUpdated();
            }
        } catch (error) {
            console.error('Error updating role: ', error);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/admin/${companyId}/users/${user.id}`, {
                method: 'DELETE',
                credentials : "include"
            });
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.msg);
            } else {
                onUserRemoved();
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <div className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}  p-2 rounded-l`}>{user.name}</div>
            <div className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}  p-2 `}>
                <Box sx={{ maxWidth: 100 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={role}
                            label="Role"
                            onChange={handleChange}
                        >
                            <MenuItem value={"trainee"}>Trainee</MenuItem>
                            <MenuItem value={"trainer"}>Trainer</MenuItem>
                            <MenuItem value={"admin"}>Admin</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <div className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}  p-2  `}> {user.completionDate}</div>
            <div className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'} p-2 rounded-r pl-0 flex items-center gap-6 justify-start`}>
                <CgDetailsMore className='size-6 hover:bg-white hover:cursor-pointer rounded-full p-2 box-content' />
                <MdClose onClick={handleDelete} className='size-6 hover:bg-white hover:cursor-pointer rounded-full p-2 box-content'/>
            </div>
        </>
    );
}

export default UserInCourseAdmin;
