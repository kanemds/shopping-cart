import React from 'react'
import Chart from './Chart'
import Overview from './Overview'
import TransList from './TransList'


const Summary = () => {
  return (
    <>
      <Overview />
      <TransList />
      <Chart />
    </>
  )
}

export default Summary