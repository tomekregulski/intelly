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
import './salesRecap.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function SalesRecap() {
  const [data, setData] = useState([]);
  const { timeframeProductData } = useAPI();
  const classes = useStyles();

  // console.log(timeframeProductData);

  useEffect(() => {
    if (timeframeProductData) {
      setData(timeframeProductData);
    }
  }, [timeframeProductData]);

  return (
    <>
      <TableContainer
        // id='salesRecap'
        component={Paper}
      >
        <Table
          // fixedHeader={false}
          // style={{ width: 'auto', tableLayout: 'auto' }}
          // className={classes.table}
          // className='tableBody'
          size='small'
          aria-label='simple table'
        >
          <TableHead>
            <TableRow>
              <TableCell
                padding='none'
                className='tableTitle'
                align='center'
                colSpan={9}
              >
                Sales Recap
              </TableCell>
            </TableRow>
            <TableRow className='subHeader'>
              <TableCell
                padding='none'
                colSpan={1}
                className='tableHeaders'
                align='center'
              ></TableCell>
              <TableCell
                padding='none'
                colSpan={2}
                className='tableHeaders'
                align='center'
              >
                Last Week
              </TableCell>
              <TableCell
                padding='none'
                colSpan={2}
                className='tableHeaders'
                align='center'
              >
                4 Weeks
              </TableCell>
              <TableCell
                padding='none'
                colSpan={2}
                className='tableHeaders'
                align='center'
              >
                12 Weeks
              </TableCell>
              <TableCell
                padding='none'
                colSpan={2}
                className='tableHeaders'
                align='center'
              >
                52 Weeks
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell padding='none' className='tableHeaders' align='left'>
                Product
              </TableCell>
              <TableCell padding='none' className='tableHeaders' align='right'>
                Sales
              </TableCell>
              <TableCell padding='none' className='tableHeaders' align='right'>
                Revenue
              </TableCell>
              <TableCell padding='none' className='tableHeaders' align='right'>
                Sales
              </TableCell>
              <TableCell padding='none' className='tableHeaders' align='right'>
                Revenue
              </TableCell>
              <TableCell padding='none' className='tableHeaders' align='right'>
                Sales
              </TableCell>
              <TableCell padding='none' className='tableHeaders' align='right'>
                Revenue
              </TableCell>
              <TableCell padding='none' className='tableHeaders' align='right'>
                Sales
              </TableCell>
              <TableCell padding='none' className='tableHeaders' align='right'>
                Revenue
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
                    align='left'
                    padding='none'
                    component='th'
                    scope='row'
                  >
                    {item.name}
                  </TableCell>
                  <TableCell padding='none' align='right'>
                    {parseFloat(item.unitSalesLW).toFixed(0)}
                  </TableCell>
                  <TableCell padding='none' align='right'>
                    ${parseFloat(item.netSalesLW).toFixed(2)}
                  </TableCell>
                  <TableCell padding='none' align='right'>
                    {parseFloat(item.unitSales4W).toFixed(0)}
                  </TableCell>
                  <TableCell padding='none' align='right'>
                    ${parseFloat(item.netSales4W).toFixed(2)}
                  </TableCell>
                  <TableCell padding='none' align='right'>
                    {parseFloat(item.unitSales12W).toFixed(0)}
                  </TableCell>
                  <TableCell padding='none' align='right'>
                    ${parseFloat(item.netSales12W).toFixed(2)}
                  </TableCell>
                  <TableCell padding='none' align='right'>
                    {parseFloat(item.unitSales52W).toFixed(0)}
                  </TableCell>
                  <TableCell padding='none' align='right'>
                    ${parseFloat(item.netSales52W).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default SalesRecap;
