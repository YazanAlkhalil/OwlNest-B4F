import React from 'react'
import Card from '../components/trainee/Card'
import'./AdminUserDetail.css'
import NameUser from '../components/trainee/NameUser'
import CardXp from '../components/trainee/CardXp'
import img from '../assets/images/40npx.png'
import ChartExample from '../components/Chart'
function AdminUserDetail() {
  return (
    <>
    <div className='NameUserDetail'>
     <img src={img}/>
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
    <div className='mt-4'>
    <ChartExample options={{
    height: 300,
    title: {
      text: "XP gains for trainees",
    },
    data: [
        { month: "Jan", "XP gains": 200 },
        { month: "Feb", "XP gains": 210 },
        { month: "Mar", "XP gains": 195 },
        { month: "Apr", "XP gains": 205 },
        { month: "May", "XP gains": 215 },
        { month: "Jun", "XP gains": 200 },
        { month: "Jul", "XP gains": 225 },
        { month: "Aug", "XP gains": 210 },
        { month: "Sep", "XP gains": 250 },
        { month: "Oct", "XP gains": 205 },
        { month: "Nov", "XP gains": 215 },
        { month: "Dec", "XP gains": 220 },
      ],
    series: [
      {
        type: "area",
        xKey: "month",
        yKey: "XP gains",
        yName: "XP gains",
      },
      
    ],
  }}/>
    </div>
    </>
  )
}

export default AdminUserDetail
