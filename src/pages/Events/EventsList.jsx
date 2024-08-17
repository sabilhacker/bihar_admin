import React, { useEffect, useState } from 'react';
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
  Select, MenuItem
} from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from 'react-router-dom';
import { getUsers, removeUser } from '../../Api/user';
import { deleteEvent, getEvents } from '../../Api/event';
import EventDetail from '../../components/EventDetail';

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

function EventList() {

  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "20px", textDecoration: "underline" }}>
          Event List
        </Typography>
      </Box>
      <TableCustomized />
    </div>
  );
}

export default EventList;

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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('epicNo');
  const navigate = useNavigate();
  const [rows, setRows] = useState([])
  const [totalItems, setTotalItems] = useState(0)

  const getData = async (page = 1) => {
    await getEvents(page).then((res) => {
      // console.log(res.data.pagination)
      // console.log(res.data.pagination.totalItems)
      setTotalItems(res.data.pagination.totalItems)
      setRows(res.data.data)
    })

  }

  useEffect(() => {
    getData()
  }, [])


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

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedRows.length) : 0;

  const handleChangePage = (event, newPage) => {
    console.log("handle page", newPage)
    setPage(newPage);
    getData(newPage)
  };

  const removeEvent = async (id) => {
    await deleteEvent(id);
    await getData()
  }

  const handleKaryakarthaChange = (id, value) => {
    setRows(prevRows =>
      prevRows.map(row =>
        row.id === id ? { ...row, karyakartha: value } : row
      )
    );
    // Optionally, update the backend or trigger any other action here
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
                    Token ID
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
                    Date
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
                    Full Name
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
                <Tooltip title="Sort by Booth No." arrow>
                  <TableSortLabel
                    active={orderBy === 'boothNo'}
                    direction={orderBy === 'boothNo' ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, 'boothNo')}
                    IconComponent={() => <IconComponents order={orderBy === 'boothNo' ? order : 'asc'} />}
                  >
                    Assign Karyakartha
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <tbody>
            {
              // (rowsPerPage > 0
              //   ? sortedRows.slice((page - 1) * rowsPerPage, page * rowsPerPage)
              //   : sortedRows
              // )
              rows.map((row) => (
                <TableRow key={row.id} >
                  <TableCell >{row.epicId}</TableCell>
                  <TableCell>{`${row.date.slice(0, 10)} ${row.date.slice(11, 16)}`}</TableCell>
                  {/* <TableCell>{row.date}</TableCell> */}
                  <TableCell>{row.mobileNumber}</TableCell>
                  <TableCell>{row?.constituency || "constiueny not found"}</TableCell>
                  <TableCell>{row.boothNumber}</TableCell>
                  <TableCell>
                    <Select
                      value={row.karyakartha || ''}
                      onChange={(e) => handleKaryakarthaChange(row.id, e.target.value)}
                      displayEmpty
                      fullWidth
                    >
                      <MenuItem value="" disabled>
                        Select Karyakartha
                      </MenuItem>
                      <MenuItem value="karyakartha1">Karyakartha 1</MenuItem>
                      <MenuItem value="karyakartha2">Karyakartha 2</MenuItem>
                      <MenuItem value="karyakartha3">Karyakartha 3</MenuItem>
                      {/* Add more options as needed */}
                    </Select>
                  </TableCell>
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
                                onClick={() => removeEvent(row.id)}
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
              <TableCell colSpan={7} >
                <CustomTablePagination
                  count={Math.ceil(totalItems / rowsPerPage)}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  onPageChange={handleChangePage}
                />
              </TableCell>
            </TableRow>
          </tfoot>
        </Table>
      </Root>
      <Box>
        <EventDetail />
      </Box>
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
