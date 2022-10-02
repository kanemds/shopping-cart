import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { api, setHeaders } from '../../features/api'
import { Box, Paper, TextField, LoginContext, Typography, Button } from '@mui/material'
import { toast } from 'react-toastify'


const User = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const [edit, setEdit] = useState(true)
  const [pwUpdate, setpdUpdate] = useState(false)
  const [pdComfirm, setPdComfirm] = useState("")
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    isAdmin: false,
    password: ""
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const getUser = async () => {
      try {
        const response = await axios.get(`${api}/user/find/${id}`, setHeaders())
        setCurrentUser({
          ...response.data,
          password: ""
        })
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
    setLoading(false)
  }, [id])



  console.log(currentUser)

  const handleClearPd = () => {
    setCurrentUser({ ...currentUser, password: "" })
    setpdUpdate("")
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    const pw = currentUser.password

    if (pw.length > 0 && pw !== pdComfirm) {
      toast.error("Password did not match, please try again", {
        position: "bottom-left"
      })
    }

    if (pw.length > 0 && pw === pdComfirm || pw.length === 0) {
      try {
        const response = await axios.put(`${api}/user/${id}`, {
          ...currentUser
        },
          setHeaders()
        )
        setCurrentUser({ ...response.data, password: "" })
        toast.success("User updated", {
          position: "bottom-left"
        })

      } catch (error) {

      }
    }
  }


  return (
    <>
      {loading ?
        <Box>
          <Typography>Loading...</Typography>
        </Box> :
        <Box
          sx={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Paper
            sx={{
              display: 'flex',
              flexDirection: "column",
              justifyContent: "center",
              '& > :not(style)': {
              },
              mt: 12,
              width: 600
            }}
            variant="outlined">
            <Typography sx={{ m: 3 }} variant="h3" component="div" gutterBottom>
              User
            </Typography>
            <Typography sx={{ m: 3 }} variant="h3" component="div" gutterBottom>
              {
                currentUser.isAdmin ? <Box><Typography>Admin</Typography></Box> :
                  <Box><Typography>Customer</Typography></Box>
              }
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: "column",
                justifyContent: "center",
                '& > :not(style)': {
                },
                m: 2
              }}

            >
              <TextField sx={{ m: 3 }}
                type="text"
                label="Name"
                onChange={e => setCurrentUser({ ...currentUser, name: e.target.value })}
                value={currentUser.name}
                InputProps={{
                  readOnly: edit,
                }}
              />
              <TextField sx={{ m: 3 }}
                type="email"
                label="Email"
                onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })}
                value={currentUser.email}
                InputProps={{
                  readOnly: edit,
                }}
              />

            </Box>


            {!pwUpdate ?
              <Box sx={{
                display: "flex",
                flexDirection: 'row-reverse',
                mr: 8
              }} >
                <Button onClick={() => setpdUpdate(true)}>Update password</Button>
              </Box>
              :
              <Box>
                <Box sx={{
                  display: "flex",
                  flexDirection: 'row-reverse',
                  mr: 8
                }} >
                  <Button onClick={() => { setpdUpdate(false); handleClearPd() }}>Cancel Update password</Button>
                </Box>

                <Box sx={{
                  display: 'flex',
                  flexDirection: "column",
                  justifyContent: "center",
                  '& > :not(style)': {
                  },
                  m: 2
                }} >
                  <TextField sx={{ m: 3 }}
                    type="password"
                    onChange={e => setCurrentUser({ ...currentUser, password: e.target.value })}
                    label="Password"
                    InputProps={{
                      readOnly: edit,
                    }}
                  />
                  <TextField sx={{ m: 3 }}
                    type="password"
                    onChange={e => setPdComfirm(e.target.value)}
                    label="Password Comfirm"
                    InputProps={{
                      readOnly: edit,
                    }}
                  />
                </Box>
              </Box>

            }
            <Box
              sx={{
                mt: 3,
                ml: 5,
                mb: 4
              }}
            >
              <Button sx={{ mr: 3 }} size="medium" variant="contained"
                onClick={() => navigate(-1)}
              >Back</Button>
              {!edit ? (
                <Button size="medium" variant="contained"
                  onClick={handleSubmit}
                >Save</Button>)
                : (
                  <Button sx={{ mr: 3 }} size="medium" variant="contained"
                    onClick={() => setEdit(false)}
                  >Edit</Button>
                )
              }
            </Box>

          </Paper >
        </Box >
      }
    </>
  )
}

export default User