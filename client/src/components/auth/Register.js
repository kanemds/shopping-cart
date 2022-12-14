import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    if (auth._id) {
      navigate(-1)
    }
  }, [auth._id, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser(user))
  }

  return (
    <>
      <Box sx={{ width: '100vw', height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant='h5'>Register</Typography>
        {auth.registerStatus === "rejected" ? (
          <Typography color='red'>{auth.registerError}</Typography>
        ) : null}
        <Box sx={{ maxWidth: 600, width: '100%', display: 'flex', flexDirection: 'column', m: 2 }}>
          <TextField sx={{ m: 1 }} label="Name"
            value={user.name}
            onChange={e => setUser({ ...user, name: e.target.value })}
          ></TextField>
          <TextField sx={{ m: 1 }} label="Email"
            value={user.email}
            onChange={e => setUser({ ...user, email: e.target.value })}></TextField>
          <TextField sx={{ m: 1 }} label="Password" type='password'
            value={user.password}
            onChange={e => setUser({ ...user, password: e.target.value })}></TextField>
          <TextField sx={{ m: 1 }} label="Password Comfirm" type='password'></TextField>
        </Box>
        <Box>
          <Button onClick={() => navigate('/')}>Back</Button>
          <Button onClick={handleSubmit}> {auth.registerStatus === "pending" ? (
            <Typography>"Submitting"</Typography>
          ) : "Register"}</Button>
        </Box>
      </Box>
    </>
  )
}

export default Register