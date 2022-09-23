import React from 'react'
import { Box, Button, Typography, TextField, FormControl, Input, InputLabel, InputAdornment, OutlinedInput, CardActionArea, CardMedia, Stack } from '@mui/material'

const CreateProduct = () => {
  return (
    <>

      <Box>
        <Typography>Product</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ maxWidth: 600, width: '100%', display: 'flex', flexDirection: 'column', m: 2 }}>
            <TextField label="Name" sx={{ m: 1 }}>Name</TextField>
            <TextField label="Author" sx={{ m: 1 }}>Author</TextField>
            <TextField label="Description" sx={{ m: 1 }} multiline rows={6}>Description</TextField>
            <FormControl sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
              <OutlinedInput
                type='number'
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Amount"
              />
            </FormControl>
            <Stack sx={{ m: 1 }}>
              <Button variant="contained" component="label">
                Upload Product
                <input hidden accept="image/*" multiple type="file" />
              </Button>
            </Stack>
          </Box>
          <Box sx={{ maxWidth: 600, width: '100%', m: 2 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="400"
                image="abc"
                alt="Product Image"
              />
            </CardActionArea>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default CreateProduct