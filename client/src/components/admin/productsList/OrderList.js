import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux'
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { editOrder, ordersFetch } from '../../../features/ordersSlice';
import moment from 'moment'


export default function OrderList() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { lists } = useSelector(state => state.orders)

  useEffect(() => {
    dispatch(ordersFetch())
  }, [])

  const handleOrderDispatched = (id) => {
    dispatch(editOrder({
      id,
      delivery_status: 'dispatched'
    }))
  }

  const handleOrderDelivered = (id) => {
    dispatch(editOrder({
      id,
      delivery_status: "delivered"
    }))
  }


  const rows = lists && lists.map(order => {
    return {
      id: order._id,
      name: order.shipping.name,
      amount: `$${(order.total / 100).toFixed(2).toLocaleString()}`,
      deliveryStatus: order.delivery_status,
      date: moment(order.createdAt).fromNow()
    }
  })

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    {
      field: 'name', headerName: 'Name', width: 200,
    },
    {
      field: 'amount', headerName: 'Amount', width: 120,
    },
    {
      field: 'deliveryStatus', headerName: 'Delivery Status', width: 130,
      renderCell: (params) => {
        return (
          <>
            {params.row.deliveryStatus === 'pending' ?
              <Typography>Pending</Typography> :
              params.row.deliveryStatus === 'dispatched' ?
                <Typography>Dispatched</Typography> :
                params.row.deliveryStatus === 'delivered' ?
                  <Typography>Delivered</Typography> : "Error"
            }
          </>
        )
      }
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 160,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 270,
      renderCell: (params) => {
        return (
          <Box>
            <Button onClick={() => handleOrderDispatched(params.row.id)}>Dispatched</Button>
            <Button onClick={() => handleOrderDelivered(params.row.id)} >Delivered</Button>
            <Button onClick={() => navigate(`/order/${params.row.id}`)}>View</Button>
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