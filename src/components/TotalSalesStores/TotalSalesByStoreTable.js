import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
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
import './totalSalesByStoreTable.css';

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

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const [head, setHead] = useState([]);

  const { timeframeProductData } = useAPI();

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  useEffect(() => {
    let tempHead = [
      {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Store',
      },
      {
        id: 'totalSales',
        numeric: true,
        disablePadding: false,
        label: 'Total Sales',
      },
    ];
    if (timeframeProductData.length) {
      timeframeProductData.forEach((item) => {
        tempHead.push({
          id: `${item.name}`,
          numeric: true,
          disablePadding: false,
          label: `${item.name} Sales`,
        });
      });
    }
    setHead(tempHead);
  }, [timeframeProductData]);

  return (
    <TableHead>
      <TableRow>
        <TableCell
          padding='none'
          className='tableTitle'
          align='center'
          colSpan={timeframeProductData.length + 2}
        >
          Total and 'Per SKU' Sales by Store
        </TableCell>
      </TableRow>
      <TableRow>
        {head.length &&
          head.map((head) => (
            <TableCell
              className='tableHeaders'
              key={head.id}
              align={head.numeric ? 'right' : 'left'}
              padding='none'
              sortDirection={orderBy === head.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === head.id}
                direction={orderBy === head.id ? order : 'asc'}
                onClick={createSortHandler(head.id)}
              >
                {head.label}
                {orderBy === head.id ? (
                  <span className='visuallyHidden'>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
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
    margin: '20px 0 0 2.5px',
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

export default function TotalSalesByStoreTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = useState([]);
  const { currentBrandSkus, timeframeStoreData } = useAPI();

  const cellStyle = {
    padding: '3px',
  };

  useEffect(() => {
    if (timeframeStoreData && currentBrandSkus) {
      let newStoresList = [];

      timeframeStoreData.forEach((entry) => {
        let totalSales = 0;
        let storeName = '';
        let salesArray = [];
        let salesObj = entry.sales;
        for (const property in salesObj) {
          if (storeName === '') {
            storeName = entry.name;
          }
          if (salesObj[property]['week1']) {
            totalSales = totalSales + salesObj[property]['week1'];
          }

          let week1 = salesObj[property]['week1']
            ? salesObj[property]['week1']
            : 'N/A';

          let obj = {
            [property]: week1,
          };
          salesArray.push(obj);
        }

        newStoresList.push({
          name: storeName,
          totalSales: totalSales,
          skuSales: salesArray,
        });
      });

      const sortedStoreList = newStoresList.sort((a, b) =>
        a.totalSales > b.totalSales ? -1 : 1
      );
      setData(sortedStoreList);
    }
  }, [timeframeStoreData, currentBrandSkus]);

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

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <div className='root'>
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
                    <TableRow tabIndex={-1} key={item.name}>
                      <TableCell
                        style={cellStyle}
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='none'
                      >
                        {item.name}
                      </TableCell>
                      <TableCell style={cellStyle} padding='none' align='right'>
                        {item.totalSales}
                      </TableCell>
                      {item.skuSales.map((sku) => {
                        return (
                          <TableCell
                            style={cellStyle}
                            padding='none'
                            align='right'
                          >
                            {Object.values(sku)[0]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell style={cellStyle} colSpan={8} />
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
