import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Button, CircularProgress } from '@mui/material';
import { getConstituencies } from '../../Api/constituencies'; // Adjust the import path according to your project structure

function ConstituencyList() {
  const [constituencies, setConstituencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConstituencies = async () => {
      try {
        const response = await getConstituencies();
        console.log('Fetched Constituencies:', response); // Log the full response to debug
        setConstituencies(response.data.data); // Adjust based on the structure of the API response
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch constituencies:', err);
        setError('Failed to fetch constituencies');
        setLoading(false);
      }
    };

    fetchConstituencies();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Constituency List
      </Typography>
      <Paper elevation={3} sx={{ padding: '20px', borderRadius: '8px' }}>
        {constituencies.length > 0 ? (
          <List>
            {constituencies.map((constituency, index) => {
              console.log('Rendering Constituency:', constituency); // Log each item to ensure it's being processed correctly
              return (
                <ListItem key={constituency.id || index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText primary={constituency.name} />
                  <Button variant="contained" color="primary">Details</Button>
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Typography>No constituencies found</Typography>
        )}
      </Paper>
    </Box>
  );
}

export default ConstituencyList;
