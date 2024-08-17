import React, { useState } from 'react';
import { styled } from '@mui/system';
import {
  Box,
  Button,
  Pagination,
  TablePagination,
  TableSortLabel,
  Tooltip,
  tooltipClasses,
  Typography,
  IconButton,
  PaginationItem,
  TableRow,
  TableCell,
  TableHead,
  Table,
} from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 11,
    minWidth: 110,
  },
}));

function KaryakarthasList() {
  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "20px", textDecoration: "underline" }}>
          Karyakarthas List
        </Typography>
      </Box>
      <TableCustomized />
    </div>
  );
}

export default KaryakarthasList;

function IconComponents({ order }) {
  return order === 'desc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
}

function TablePaginationAction({ count, page, onPageChange }) {
  return (
    <CustomPagination count={count} page={page} onPageChange={onPageChange} />
  )
}

export const CustomPagination = ({ count, page = 1, onPageChange }) => {

  const renderItem = (item) => (
    <PaginationItem {...item} sx={{
      backgroundColor: item.page === page ? "white !important" : "transparent",
      borderColor: item.page === page ? "white" : "#E3E4EB",
      color: item.page === page ? "black" : "blue",
      borderRadius: "5px",
      padding: "10px",
      m: 0.5,
    }} />
  )

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'right', width: "100%" }}>
      <CustomButton
        disabled={page === 1}
        onClick={() => onPageChange(null, page - 1)}
      >
        <KeyboardDoubleArrowLeftIcon />Previous
      </CustomButton>
      <Pagination
        count={count}
        page={page}
        renderItem={renderItem}
        variant='outlined'
        shape="rounded"
        onChange={onPageChange}
        hidePrevButton
        hideNextButton
        sx={{ mx: 2, backgroundColor: "#E3E4EB" }}
      />
      <CustomButton
        disabled={page === count}
        onClick={() => onPageChange(null, page + 1)}
      >
        Next<KeyboardDoubleArrowRightIcon />
      </CustomButton>
    </div>
  );
};

function TableCustomized() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('epicNo');

  const rows = [
    createData('EPIC001', 'John Doe', '123-456-7890', 'Ward 1', '1', 'Edit/Delete'),
    createData('EPIC002', 'Jane Smith', '234-567-8901', 'Ward 2', '2', 'Edit/Delete'),
    createData('EPIC003', 'Jake Doe', '345-678-9012', 'Ward 3', '3', 'Edit/Delete'),
    createData('EPIC004', 'Alice Johnson', '456-789-0123', 'Ward 4', '4', 'Edit/Delete'),
    createData('EPIC005', 'Bob Brown', '567-890-1234', 'Ward 5', '5', 'Edit/Delete'),
    createData('EPIC006', 'Charlie Green', '678-901-2345', 'Ward 6', '6', 'Edit/Delete'),
    createData('EPIC007', 'Diana Black', '789-012-3456', 'Ward 7', '7', 'Edit/Delete'),
    createData('EPIC008', 'Eve White', '890-123-4567', 'Ward 8', '8', 'Edit/Delete'),
    createData('EPIC009', 'Frank Grey', '901-234-5678', 'Ward 9', '9', 'Edit/Delete'),
    createData('EPIC010', 'Grace Blue', '012-345-6789', 'Ward 10', '10', 'Edit/Delete'),
    createData('EPIC011', 'Hannah Brown', '123-456-0987', 'Ward 11', '11', 'Edit/Delete'),
    createData('EPIC012', 'Isaac Green', '234-567-1098', 'Ward 12', '12', 'Edit/Delete'),
    createData('EPIC013', 'Julia White', '345-678-2109', 'Ward 13', '13', 'Edit/Delete'),
    createData('EPIC014', 'Kevin Black', '456-789-3210', 'Ward 14', '14', 'Edit/Delete'),
    createData('EPIC015', 'Laura Blue', '567-890-4321', 'Ward 15', '15', 'Edit/Delete'),
    createData('EPIC016', 'Mike Red', '678-901-5432', 'Ward 16', '16', 'Edit/Delete'),
    createData('EPIC017', 'Nina Yellow', '789-012-6543', 'Ward 17', '17', 'Edit/Delete'),
    createData('EPIC018', 'Oliver Orange', '890-123-7654', 'Ward 18', '18', 'Edit/Delete'),
    createData('EPIC019', 'Pamela Pink', '901-234-8765', 'Ward 19', '19', 'Edit/Delete'),
    createData('EPIC020', 'Quincy Purple', '012-345-9876', 'Ward 20', '20', 'Edit/Delete'),
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    }
    return a[orderBy] > b[orderBy] ? -1 : 1;
  });

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedRows.length) : 0;

  const handleChangePage = (event, newPage) => {
    console.log("handle page", newPage)
    setPage(newPage);
  };
  // console.log(Math.ceil(rows.length / rowsPerPage))

  return (
    <Box>
      <Root>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow >
              <TableCell >
                <Tooltip title="Sort by EPIC No." arrow>
                  <TableSortLabel
                    active={orderBy === 'epicNo'}
                    direction={orderBy === 'epicNo' ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, 'epicNo')}
                    IconComponent={() => <IconComponents order={orderBy === 'epicNo' ? order : 'asc'} />}
                  >
                    EPIC NO
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Sort by Full Name" arrow>
                  <TableSortLabel
                    active={orderBy === 'fullName'}
                    direction={orderBy === 'fullName' ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, 'fullName')}
                    IconComponent={() => <IconComponents order={orderBy === 'fullName' ? order : 'asc'} />}
                  >
                    Full Name
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Sort by Phone Number" arrow>
                  <TableSortLabel
                    active={orderBy === 'phoneNumber'}
                    direction={orderBy === 'phoneNumber' ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, 'phoneNumber')}
                    IconComponent={() => <IconComponents order={orderBy === 'phoneNumber' ? order : 'asc'} />}
                  >
                    Phone Number
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Sort by Constituency" arrow>
                  <TableSortLabel
                    active={orderBy === 'constituency'}
                    direction={orderBy === 'constituency' ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, 'constituency')}
                    IconComponent={() => <IconComponents order={orderBy === 'constituency' ? order : 'asc'} />}
                  >
                    Constituency
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Sort by Booth No." arrow>
                  <TableSortLabel
                    active={orderBy === 'boothNo'}
                    direction={orderBy === 'boothNo' ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, 'boothNo')}
                    IconComponent={() => <IconComponents order={orderBy === 'boothNo' ? order : 'asc'} />}
                  >
                    Booth No.
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <tbody>
            {(rowsPerPage > 0
              ? sortedRows.slice((page - 1) * rowsPerPage, page * rowsPerPage)
              : sortedRows
            ).map((row) => (
              <TableRow key={row.epicNo} >
                <TableCell >{row.epicNo}</TableCell>
                <TableCell>{row.fullName}</TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>{row.constituency}</TableCell>
                <TableCell>{row.boothNo}</TableCell>
                <TableCell>
                  <LightTooltip
                    placement='bottom-end'
                    title={
                      <>
                        <Box>
                          <Box sx={{
                            padding: "4px 5px",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                          >
                            <Typography
                              sx={{
                                padding: "0 5px",
                                fontSize: "12px",
                                cursor: "pointer",
                                color: "#2F4CDD",
                              }}
                            >
                              View Details
                            </Typography>
                          </Box>
                          <Box sx={{
                            padding: "4px 5px",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                          >
                            <Typography sx={{
                              padding: "0 5px",
                              fontSize: "12px",
                              cursor: "pointer",
                              color: "#FF0000",
                            }}
                            >
                              Remove
                            </Typography>
                          </Box>
                        </Box>
                      </>
                    }
                  >
                    <Button
                      sx={{
                        // backgroundColor: "#fff",
                        color: "#3E4954",
                        // border: "1px solid #E3E4EB",
                        textTransform: "none",
                        borderRadius: "8px",
                        height: "37px",
                        p: 1,
                        "&:hover": {
                          backgroundColor: "rgba(242, 244, 248, 0.25)",
                          borderColor: "#2F4CDD",
                        }
                      }}
                    >
                      <MoreHorizIcon />
                    </Button>
                  </LightTooltip>
                </TableCell>
              </TableRow>
            ))}
            {/* {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
              fjsdlkfsd
            </TableRow>
          )} */}
          </tbody>
          <tfoot>
            <TableRow>
              <TableCell colSpan={6} >
                <CustomTablePagination
                  count={Math.ceil(rows.length / rowsPerPage)}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  onPageChange={handleChangePage}
                />
              </TableCell>
            </TableRow>
          </tfoot>
        </Table>
      </Root>
    </Box>

  );
}

function CustomTablePagination({ count, page, onPageChange }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" m={2}>
      <TablePaginationAction
        count={count}
        page={page}
        onPageChange={onPageChange}
      />
    </Box>
  );
}


function createData(epicNo, fullName, phoneNumber, constituency, boothNo, actions) {
  return { epicNo, fullName, phoneNumber, constituency, boothNo, actions };
}

const CustomButton = styled(Button)({
  backgroundColor: "#2F4CDD",
  color: "white",
  width: '120px', // Set width of pagination buttons
  margin: '0 4px',
  textAlign: 'center',
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#2F4CDD"
  }
});

const Root = styled('div')(({ theme }) => ({
  '& .MuiTableHead-root': {
    backgroundColor: theme.palette.background.default,
  },
  '& .MuiTableCell-root': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '& .MuiTableSortLabel-root': {
    color: theme.palette.text.primary,
  },
}));
