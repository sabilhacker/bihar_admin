import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { createBooth } from '../../Api/booth'; // Adjust the import path according to your project structure

function AddBooth() {
  const [formData, setFormData] = useState({
    name: '',
    constituency: '', // Updated to match the API's expected payload
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name: formData.name,
        constituency: formData.constituency, // Sending only the necessary fields
      };
      
      await createBooth(payload);
      Swal.fire("Success", "Booth added successfully", "success");
      setFormData({ name: '', constituency: '' }); // Clear the form fields after submission
    } catch (err) {
      console.error('Error adding booth:', err);
      Swal.fire("Error", "Failed to add booth", "error");
    }
  };

  return (
    <Box sx={{ maxWidth: '600px', margin: '0 auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Add Booth
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Booth Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Constituency"
          name="constituency"
          value={formData.constituency}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
          fullWidth
        >
          Add Booth
        </Button>
      </Box>
    </Box>
  );
}

export default AddBooth;
