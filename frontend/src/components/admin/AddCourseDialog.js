import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import toast from 'react-hot-toast';

export default function FormDialog({onAddUserToCourse}) {
    const [info, setInfo] = useState({
        name: "",
        description: "",
    });
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function reset() {
        setInfo({
            name: "",
            description: "",
        });
        handleClose();
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const companyId = localStorage.getItem('companyId');
            const res = await fetch(`http://localhost:5000/api/admin/courses/${companyId}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseName: info.name,
                    description: info.description,
                })
            });

            const data = await res.json();
            if (!res.ok) {
                toast.error(data.msg);
            } else {
                toast.success(data.msg);
                reset();
                onAddUserToCourse();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <React.Fragment>
            <div onClick={handleClickOpen}
                className='bg-primary self-end mb-5 hover:bg-hover hover:cursor-pointer text-white p-3 rounded'>Add course</div>

            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit,
                }}
            >
                <DialogTitle>Add course</DialogTitle>
                <DialogContent >
                    <div className="w-96 flex items-center border-b border-primary-500 py-2 mb-5">
                        <input
                            value={info.name}
                            onChange={e => {
                                const value = e.target.value;
                                if (value.length <= 50) {
                                    setInfo({ ...info, name: value });
                                }
                            }}
                            className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            type="text"
                            placeholder="Name"
                            aria-label="Name"
                        />
                        <span className='ml-1 w-4'>{50 - info.name.length}</span>
                    </div>
                    <div className='flex items-end'>
                        <textarea
                            value={info.description}
                            onChange={e => {
                                const value = e.target.value;
                                if (value.length <= 350) {
                                    setInfo({ ...info, description: value });
                                }
                            }}
                            className='p-2 flex-grow border-solid border border-gray-400'
                            rows="4"
                            maxLength={350}
                            placeholder="Description (max 350 characters)"
                            style={{ resize: 'none' }}
                        />
                        <span className='ml-1 w-4'>{350 - info.description.length}</span>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={reset}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
