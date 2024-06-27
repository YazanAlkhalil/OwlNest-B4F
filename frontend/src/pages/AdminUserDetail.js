import React from 'react'
import Card from '../components/trainee/Card'
import'./AdminUserDetail.css'
import NameUser from '../components/trainee/NameUser'
import CardXp from '../components/trainee/CardXp'
import { Table } from '@mui/material'

function AdminUserDetail() {
  return (
    <>
    <div className='NameUserDetail'>
     <img src='../assets/images/40npx.png-'/>
     <NameUser string1={'name'} string2={'email'} string3={'type'}/>
     <NameUser string1={'city'} string2={'birthday'} string3={'phone number'}/>
     <CardXp/>
    </div>
    <br/>
    <div className='userDetail'>
      <Card number={4} string={'finished courses'}/>
      <Card number={3} string={'completed courses'}/>
      <Card number={5} string={'courses not started'}/>
    </div>
    <div>
      
    </div>
    </>
  )
}

export default AdminUserDetail
