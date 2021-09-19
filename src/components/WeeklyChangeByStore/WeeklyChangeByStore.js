import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import clsx from 'clsx';
import {
  // lighten,
  makeStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { useAPI } from '../../context/apiContext';
import './weeklyChangeByStore.css';

function createData(
  name,
  salesWk1,
  changeWk1,
  salesWk2,
  changeWk2,
  salesWk3,
  changeWk3,
  salesWk4
) {
  return {
    name,
    salesWk1,
    changeWk1,
    salesWk2,
    changeWk2,
    salesWk3,
    changeWk3,
    salesWk4,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Store',
  },
  { id: 'salesWk1', numeric: true, disablePadding: false, label: 'Sales' },
  { id: 'changeWk1', numeric: true, disablePadding: false, label: '% Change' },
  { id: 'salesWk2', numeric: true, disablePadding: false, label: 'Sales' },
  { id: 'changeWk2', numeric: true, disablePadding: false, label: '% Change' },
  { id: 'salesWk3', numeric: true, disablePadding: false, label: 'Sales' },
  { id: 'changeWk3', numeric: true, disablePadding: false, label: '% Change' },
  { id: 'salesWk4', numeric: true, disablePadding: false, label: 'Sales' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell
          padding='none'
          className='tableTitle'
          align='center'
          colSpan={8}
        >
          % Change x Store - Last 4 Weeks
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          padding='none'
          className='tableTitle'
          align='center'
          colSpan={1}
        ></TableCell>
        <TableCell
          padding='none'
          className='tableTitle'
          align='center'
          colSpan={2}
        >
          Week 1
        </TableCell>
        <TableCell
          padding='none'
          className='tableTitle'
          align='center'
          colSpan={2}
        >
          Week 2
        </TableCell>
        <TableCell
          padding='none'
          className='tableTitle'
          align='center'
          colSpan={2}
        >
          Week 3
        </TableCell>
        <TableCell
          padding='none'
          className='tableTitle'
          align='center'
          colSpan={1}
        >
          Week 4
        </TableCell>
      </TableRow>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className='tableHeaders'
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding='none'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className='visuallyHidden'>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // margin: '20px 0 0 2.5px',
  },
  paper: {
    width: '100%',
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function WeeklyChangeByStore() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = useState([]);
  const [width, setWidth] = React.useState(window.innerWidth);

  const { timeframeStoreData, weeklyStoreData } = useAPI();

  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  useEffect(() => {
    setData(weeklyStoreData);
  });

  // useEffect(() => {
  //   if (timeframeStoreData) {
  //     const weeklySalesByStore = [];

  //     for (let i = 0; i < timeframeStoreData.length; i++) {
  //       let week1 = 0;
  //       let week2 = 0;
  //       let week3 = 0;
  //       let week4 = 0;
  //       let storeName = timeframeStoreData[i].name;
  //       for (const sku in timeframeStoreData[i].sales) {
  //         week1 = week1 + timeframeStoreData[i].sales[sku].week1;
  //         week2 = week2 + timeframeStoreData[i].sales[sku].week2;
  //         week3 = week3 + timeframeStoreData[i].sales[sku].week3;
  //         week4 = week4 + timeframeStoreData[i].sales[sku].week4;
  //       }
  //       let obj = {};
  //       obj['name'] = storeName;
  //       obj['week1'] = week1;
  //       obj['week2'] = week2;
  //       obj['week3'] = week3;
  //       obj['week4'] = week4;
  //       weeklySalesByStore.push(obj);
  //     }
  //     setData(weeklySalesByStore);
  //   }
  // }, [timeframeStoreData]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let emptyRows;

  if (width < 1300) {
    emptyRows = 0;
  } else {
    emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  }

  return (
    <div id='rootWeeklyStore'>
      <Paper className='paper'>
        <TableContainer>
          <Table
            className='table'
            aria-labelledby='tableTitle'
            size='small'
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      className={index % 2 === 1 ? 'highlighted' : null}
                      tabIndex={-1}
                      key={item.name}
                    >
                      <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='none'
                      >
                        {item.name}
                      </TableCell>
                      <TableCell padding='none' align='right'>
                        {item.totalSalesWeek1 ? item.totalSalesWeek1 : 'N/A'}
                      </TableCell>
                      <TableCell padding='none' align='right'>
                        {item.totalSalesWeek1 - item.totalSalesWeek2
                          ? (
                              ((item.totalSalesWeek1 - item.totalSalesWeek2) /
                                item.totalSalesWeek2) *
                              100
                            ).toFixed(1) + '%'
                          : 'N/A'}
                      </TableCell>
                      <TableCell padding='none' align='right'>
                        {item.totalSalesWeek2 ? item.totalSalesWeek2 : 'N/A'}
                      </TableCell>
                      <TableCell padding='none' align='right'>
                        {item.totalSalesWeek3 && item.totalSalesWeek2
                          ? (
                              ((item.totalSalesWeek2 - item.totalSalesWeek3) /
                                item.totalSalesWeek3) *
                              100
                            ).toFixed(1) + '%'
                          : 'N/A'}
                      </TableCell>
                      <TableCell padding='none' align='right'>
                        {item.totalSalesWeek3 ? item.totalSalesWeek3 : 'N/A'}
                      </TableCell>
                      <TableCell padding='none' align='right'>
                        {item.totalSalesWeek4 && item.totalSalesWeek3
                          ? (
                              ((item.totalSalesWeek3 - item.totalSalesWeek4) /
                                item.totalSalesWeek4) *
                              100
                            ).toFixed(1) + '%'
                          : 'N/A'}
                      </TableCell>
                      <TableCell padding='none' align='right'>
                        {item.totalSalesWeek4 ? item.totalSalesWeek4 : 'N/A'}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
