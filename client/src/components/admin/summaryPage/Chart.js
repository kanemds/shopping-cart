import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { api, setHeaders } from '../../../features/api';
import { Box, Typography } from '@mui/material'
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Chart = () => {

  const [report, setReport] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const reportData = async () => {
      try {
        const res = await axios.get(`${api}/order/weekly-sales`, setHeaders())

        const newReport = res.data.map(sales => {
          const days = [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
          ]

          return {
            day: days[sales._id.dayInWeek - 1],
            amount: sales.total / 100
          }
        })

        setReport(newReport)
        console.log(newReport)
      } catch (error) {
        console.log(error)
      }
    }

    reportData()
  }, [])


  return (
    <Box>
      <Typography>Last 7 days earnings</Typography>
      <AreaChart width={730} height={250} data={report}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="day" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        {/* <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" /> */}
        <Area type="monotone" dataKey="amount" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
    </Box>
  )
}

export default Chart