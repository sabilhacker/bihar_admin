 


import React from 'react';
import { Box, Button, Container, TextField, Typography, Grid, Paper } from '@mui/material';
import InputField from '../../components/InputField';

const RemoveKaryakarthas = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: '10px' }}>
      <Typography variant="h5" gutterBottom>
        Remove Karyakartha
      </Typography>

      <Box sx={{ justifyContent: 'center', marginTop: '20px' }}>
        <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
          Search by
        </Typography>
        <Box sx={{ padding: '20px', border: '1px solid black', borderRadius: '8px', width: "60%", margin: "0px auto" }}>
          <Box>
            <InputField
              fullWidth
              label="Full Name"
              placeholder="Enter Full Name"
              variant="outlined"
              margin="normal"
              sxLabel={{ marginTop: "20px" }}
            />
            <InputField
              fullWidth
              label="EPIC NUMBER"
              placeholder="Enter EPIC Number"
              variant="outlined"
              margin="normal"
              sxLabel={{ marginTop: "20px" }}

            />
          </Box>

          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <Button variant="contained" sx={{ backgroundColor: "#007AFF" }} size="large">
              Search
            </Button>
          </Box>
        </Box>
      </Box>


      <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h6" gutterBottom>
          Results
        </Typography>
        <Paper elevation={3} sx={{ padding: '20px', minHeight: '200px', borderRadius: '8px' }}>
          {/* Results will be displayed here */}
        </Paper>
      </Box>

      <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
        <Button variant="contained" sx={{ backgroundColor: "#007AFF" }} size="large">
          Remove as Karyakartha
        </Button>
      </Box>
    </Container>
  );
};

export default RemoveKaryakarthas;


