import React, { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Box,
  Grid
} from '@mui/material';
import { GrievancesGet } from '../Api/grievance';
// import { baseUrl } from '../Api/config';


const Grievances = () => {

  const [data, setData] = useState([])

  useEffect(async () => {
    await GrievancesGet().then((res) => {
      // console.log(res.data.data)
      setData(res.data.data)
    })
      .catch((e) => {
        console.log(e);
      })
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Details</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Assigned to</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data?.map((v, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Grid container spacing={2}>
                    <Grid item>
                      <img height={20} width={20} src={`https://biharb.leadgenadvertisements.com/${v.attachments[0]}`} alt='Profile' />
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" color="#2F4CDD">
                        {v.fullName} {v.fatherName}, {v.boothNameOrNumber}
                      </Typography>
                      <Typography variant="body2">{v.ticketTitle}</Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" component="div">
                       {v.description}
                    </Typography>
                    {/* <Typography variant="body2" component="div">
          ........................................................
        </Typography>
        <Typography variant="body2" component="div">
          ........................................................
        </Typography>
        <Typography variant="body2" component="div">
          ........................................................
        </Typography> */}
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{v.category}</Typography>
                  <Typography variant="body2">{v.subCategory}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">Karyakartha Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{v.status}</Typography>
                </TableCell>
              </TableRow>))}
        </TableBody>
      </Table>
    </TableContainer>

  )
}

export default Grievances;
