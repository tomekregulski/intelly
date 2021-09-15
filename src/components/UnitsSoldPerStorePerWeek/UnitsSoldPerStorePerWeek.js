import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useAPI } from '../../context/apiContext';
// import './velocityTable.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function UnitsSoldPerStorePerWeek() {
  const [data, setData] = useState([]);
  const { timeframeProductData } = useAPI();
  const classes = useStyles();

  useEffect(() => {
    setData(timeframeProductData);
  }, [timeframeProductData]);

  return (
    <TableContainer component={Paper}>
      <Table
        // fixedHeader={false}
        // style={{ width: 'auto', tableLayout: 'auto' }}
        className={classes.table}
        size='small'
        aria-label='a dense table'
      >
        <TableHead>
          <TableRow>
            <TableCell
              padding='none'
              className='tableTitle'
              align='center'
              colSpan={7}
            >
              Units Sold Per Store Per Week
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell padding='none' className='tableHeaders' colSpan={1} />
            <TableCell
              padding='none'
              className='tableHeaders'
              colSpan={2}
              align='center'
            >
              Last Week
            </TableCell>
            <TableCell
              padding='none'
              className='tableHeaders'
              colSpan={4}
              align='center'
            >
              Average Units Sold Per Store Per Week
            </TableCell>
          </TableRow>
          <TableRow className='tableSubHeader'>
            <TableCell padding='none' className='tableHeaders'>
              Product
            </TableCell>
            <TableCell padding='none' className='tableHeaders' align='right'>
              Units Sold
            </TableCell>
            <TableCell padding='none' className='tableHeaders' align='right'>
              Total Stores
            </TableCell>
            <TableCell padding='none' className='tableHeaders' align='right'>
              Last Week
            </TableCell>
            <TableCell padding='none' className='tableHeaders' align='right'>
              4 Weeks
            </TableCell>
            <TableCell padding='none' className='tableHeaders' align='right'>
              12 Weeks
            </TableCell>
            <TableCell padding='none' className='tableHeaders' align='right'>
              52 Weeks
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length &&
            data.map((item, index) => (
              <TableRow
                key={index}
                className={index % 2 === 1 ? 'highlighted' : null}
              >
                <TableCell
                  padding='none'
                  align='left'
                  component='th'
                  scope='row'
                >
                  {item.name}
                </TableCell>
                <TableCell padding='none' align='right'>
                  {parseFloat(item.unitSalesLW)}
                </TableCell>
                <TableCell padding='none' align='right'>
                  {item.storesLW}
                </TableCell>
                <TableCell padding='none' align='right'>
                  {parseFloat(item.unitSalesLW / item.storesLW).toFixed(1)}
                </TableCell>
                <TableCell padding='none' align='right'>
                  {parseFloat(item.unitSales4W / item.stores4W / 4).toFixed(1)}
                </TableCell>
                <TableCell padding='none' align='right'>
                  {parseFloat(item.unitSales12W / item.stores12W / 12).toFixed(
                    1
                  )}
                </TableCell>
                <TableCell padding='none' align='right'>
                  {parseFloat(item.unitSales52W / item.stores52W / 52).toFixed(
                    1
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
