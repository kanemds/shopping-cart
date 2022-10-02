import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux'
import { CardActionArea, CardMedia, Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { deleteProduct } from '../../../features/productsSlice';
import EditProduct from '../EditProduct';
import { useEffect } from 'react';
import { deleteUser, getAllUsers } from '../../../features/usersSlice';


export default function UsersList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { lists } = useSelector(state => state.users)

  console.log(lists)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])



  const handleDelete = id => {
    dispatch(deleteUser(id))
  }


  const rows = lists && lists.map(user => {

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      admin: user.isAdmin
    }
  })

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    {
      field: 'name', headerName: 'Name', width: 70,

    },
    { field: 'email', headerName: 'Email', width: 200 },

    {
      field: 'admin', headerName: 'Admin', width: 130,
      renderCell: (params) => {
        console.log(params)
        return (
          <Box >
            {params.row.admin ?
              (<Typography>Admin</Typography>) :
              (<Typography>Customer</Typography>)
            }
          </Box>
        )
      }
    },

    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 210,
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex' }}>
            <Button onClick={() => navigate(`/user/${params.row.id}`)}>View</Button>
            <Button onClick={() => handleDelete(params.row.id)}>Delete</Button>
          </Box>
        )
      }
    }
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}