import React from 'react';
import { Box, Button, Container, TextField, Typography, Grid, Paper } from '@mui/material';
import InputField from '../../components/InputField';

const AddKaryakartha = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: '10px' }}>
      <Typography variant="h5" gutterBottom>
        Add New Karyakartha
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
          Add as Karyakartha
        </Button>
      </Box>
    </Container>
  );
};

export default AddKaryakartha;



// function TablePaginationActions(props) {
//   const { count, page, rowsPerPage, onPageChange } = props;

//   const handleFirstPageButtonClick = (event) => {
//     onPageChange(event, 0);
//   };

//   const handleBackButtonClick = (event) => {
//     onPageChange(event, page - 1);
//   };

//   const handleNextButtonClick = (event) => {
//     onPageChange(event, page + 1);
//   };

//   const handleLastPageButtonClick = (event) => {
//     onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//   };

//   const handlePageButtonClick = (newPage) => {
//     onPageChange(null, newPage);
//   };

//   const totalPages = Math.ceil(count / rowsPerPage);

//   return (
//     <div style={{ display: 'flex', alignItems: 'center', border: "1px solid red", width: "50%" }}>
//       <CustomButton
//         onClick={handleBackButtonClick}
//         disabled={page === 0}
//         aria-label="previous page"
//       >
//         Previous Page
//         <ChevronLeftRoundedIcon />
//       </CustomButton>

//       <div style={{ display: 'flex', alignItems: 'center', backgroundColor: "#E3E4EB" }}>
//         <CustomPagination count={7} />
//         {Array.from({ length: totalPages }, (_, index) => (
//           <CustomButton
//             key={index}
//             onClick={() => handlePageButtonClick(index)}
//             disabled={index === page}
//             aria-label={`page ${index + 1}`}
//             style={{
//               fontWeight: index === page ? 'bold' : 'normal',
//               backgroundColor: index === page ? 'white' : 'transparent',
//               color: index === page ? "black" : "#2F4CDD"
//             }}
//           >
//             {index + 1}
//           </CustomButton>
//         ))}
//       </div>

//       <CustomButton
//         onClick={handleNextButtonClick}
//         disabled={page >= totalPages - 1}
//         aria-label="next page"
//       >
//         Next Page <ChevronRightRoundedIcon />
//       </CustomButton>
//     </div>

//   );
// }