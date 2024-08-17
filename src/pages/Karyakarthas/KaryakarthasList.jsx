import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Add PropTypes import
import { styled } from '@mui/system';
import {
  Box,
  Button,
  Pagination,
  TableSortLabel,
  Tooltip,
  tooltipClasses,
  Typography,
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
))(() => ({
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

IconComponents.propTypes = {
  order: PropTypes.string.isRequired,
};

function TablePaginationAction({ count, page, onPageChange }) {
  return (
    <CustomPagination count={count} page={page} onPageChange={onPageChange} />
  );
}

TablePaginationAction.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

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
  );

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

CustomPagination.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

function TableCustomized() {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5); // Removed setRowsPerPage as it's not used
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('epicNo');

  const rows = [
    createData('EPIC001', 'John Doe', '123-456-7890', 'Ward 1', '1', 'Edit/Delete'),
    // ... more rows
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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
              {/* More TableCells... */}
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
                    }
                  >
                    <Button
                      sx={{
                        color: "#3E4954",
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
          </tbody>
          <tfoot>
            <TableRow>
              <TableCell colSpan={6} >
                <CustomTablePagination
                  count={Math.ceil(rows.length / rowsPerPage)}
                  page={page}
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

CustomTablePagination.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

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
