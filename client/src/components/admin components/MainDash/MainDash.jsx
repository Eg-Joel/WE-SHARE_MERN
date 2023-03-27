
import React from 'react'
import Cards from '../Cards/Cards'
import BasicTable from '../Table/Table'
import './MainDash.css'
const MainDash = () => {
  return (
    <div className='MainDash'>
        <h1>Dashboard</h1>
        <Cards/>
     
        <BasicTable/>
    </div>
  )
}

export default MainDash