import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux'
import { CardActionArea, CardMedia, Box, Button } from '@mui/material';





export default function ProductList() {

  const { items } = useSelector(state => state.products)
  console.log(items)

  const rows = items && items.map(product => {
    return {
      id: product._id,
      image: product.img,
      name: product.name,
      author: product.author,
      desc: product.desc,
      price: product.price.toFixed(2).toLocaleString()

    }
  })

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    {
      field: 'image', headerName: 'Image', width: 70,
      renderCell: (params) => {
        return (
          <Box>
            <CardActionArea>
              <CardMedia
                component="img"
                height="40"
                image={params.row.image}
                alt={params.row.name}
              />
            </CardActionArea>
          </Box>
        )
      }
    },
    { field: 'name', headerName: 'Name', width: 130 },
    {
      field: 'author',
      headerName: 'author',
      width: 90,
    },
    { field: 'desc', headerName: 'Description', width: 130 },

    { field: 'price', headerName: 'Price', width: 80, type: 'number', },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 210,
      renderCell: (params) => {
        return (
          <Box>
            <Button>View</Button>
            <Button>Edit</Button>
            <Button>Delete</Button>
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
      />
    </div>
  );
}