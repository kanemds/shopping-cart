import React from 'react'
import { AllTimeData } from './AllTimeData'
import Chart from './Chart'
import Overview from './Overview'
import TransList from './TransList'


const Summary = () => {
  return (
    <>
      <Overview />
      <TransList />
      <Chart />
      <AllTimeData />
    </>
  )
}

export default Summary