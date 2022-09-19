import React, { useState } from 'react'
import { Box, TextField, Typography, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'


const Register = () => {
  const navigate = useNavigate()
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser(user))
  }

  return (
    <>
      <Box sx={{ width: '100vw', height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography>Register</Typography>

        <Box sx={{ maxWidth: 600, width: '100%', display: 'flex', flexDirection: 'column', m: 2 }}>
          <TextField sx={{ m: 1 }} label="Name"
            value={user.name}
            onChange={e => setUser({ ...user, name: e.target.value })}
          ></TextField>
          <TextField sx={{ m: 1 }} label="Email"
            value={user.email}
            onChange={e => setUser({ ...user, email: e.target.value })}></TextField>
          <TextField sx={{ m: 1 }} label="Password"
            value={user.password}
            onChange={e => setUser({ ...user, password: e.target.value })}></TextField>
          <TextField sx={{ m: 1 }} label="Password Comfirm" ></TextField>
        </Box>
        <Box>
          <Button onClick={() => navigate('/')}>Back</Button>
          <Button onClick={handleSubmit}>Register</Button>
        </Box>
      </Box>
    </>
  )
}

export default Register