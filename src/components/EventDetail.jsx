import { Box, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect } from 'react'

function EventDetail({ data, Id }) {
  useEffect(() => {

  }, [])

  return (
    <Box>
      
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Event Details
            </TableCell>
            <TableCell>
              Description
            </TableCell>
            <TableCell>
              Date
            </TableCell>
            <TableCell>
              Invited By
            </TableCell>
            <TableCell>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Grid container spacing={2}>
                <Grid item>
                  <img height={20} width={20} src={`https://biharb.leadgenadvertisements.com/`} alt='Profile' />
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="#2F4CDD">
                    {/* {v.fullName} {v.fatherName}, {v.boothNameOrNumber} */}fdss
                  </Typography>
                  <Typography variant="body2">{
                    "Name"}</Typography>
                </Grid>
              </Grid>
            </TableCell>
            <TableCell>
              This is my description
            </TableCell>
            <TableCell>
              DD-MM-YYYY
            </TableCell>
            <TableCell>
              Person Name
            </TableCell>
            <TableCell>
              Accepted
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  )
}

export default EventDetail