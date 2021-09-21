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
    minWidth: 750,
  },
});

function SalesRecap() {
  const [data, setData] = useState([]);
  const { timeframeProductData } = useAPI();
  const classes = useStyles();

  useEffect(() => {
    if (timeframeProductData) {
      setData(timeframeProductData);
    }
  }, [timeframeProductData]);

  const cellStyle = {
    padding: '3px',
  };

  return (
    <>
      <TableContainer id='salesRecap' component={Paper}>
        <Table
          className={classes.table}
          // className='tableBody'
          size='small'
          aria-label='simple table'
        >
          <TableHead>
            <TableRow>
              <TableCell
                style={cellStyle}
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
                style={cellStyle}
                padding='none'
                colSpan={1}
                className='tableHeaders'
                align='center'
              ></TableCell>
              <TableCell
                style={cellStyle}
                padding='none'
                colSpan={2}
                className='tableHeaders'
                align='center'
              >
                Last Week
              </TableCell>
              <TableCell
                style={cellStyle}
                padding='none'
                colSpan={2}
                className='tableHeaders'
                align='center'
              >
                4 Weeks
              </TableCell>
              <TableCell
                style={cellStyle}
                padding='none'
                colSpan={2}
                className='tableHeaders'
                align='center'
              >
                12 Weeks
              </TableCell>
              <TableCell
                style={cellStyle}
                padding='none'
                colSpan={2}
                className='tableHeaders'
                align='center'
              >
                52 Weeks
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={cellStyle}
                padding='none'
                className='tableHeaders'
                align='left'
              >
                Product
              </TableCell>
              <TableCell
                style={cellStyle}
                padding='none'
                className='tableHeaders'
                align='right'
              >
                Sales
              </TableCell>
              <TableCell
                style={cellStyle}
                padding='none'
                className='tableHeaders'
                align='right'
              >
                Revenue
              </TableCell>
              <TableCell
                style={cellStyle}
                padding='none'
                className='tableHeaders'
                align='right'
              >
                Sales
              </TableCell>
              <TableCell
                style={cellStyle}
                padding='none'
                className='tableHeaders'
                align='right'
              >
                Revenue
              </TableCell>
              <TableCell
                style={cellStyle}
                padding='none'
                className='tableHeaders'
                align='right'
              >
                Sales
              </TableCell>
              <TableCell
                style={cellStyle}
                padding='none'
                className='tableHeaders'
                align='right'
              >
                Revenue
              </TableCell>
              <TableCell
                style={cellStyle}
                padding='none'
                className='tableHeaders'
                align='right'
              >
                Sales
              </TableCell>
              <TableCell
                style={cellStyle}
                padding='none'
                className='tableHeaders'
                align='right'
              >
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
                    style={cellStyle}
                    align='left'
                    padding='none'
                    component='th'
                    scope='row'
                  >
                    {item.name}
                  </TableCell>
                  <TableCell style={cellStyle} padding='none' align='right'>
                    {parseFloat(item.unitSalesLW).toFixed(0)}
                  </TableCell>
                  <TableCell style={cellStyle} padding='none' align='right'>
                    ${parseFloat(item.netSalesLW).toFixed(2)}
                  </TableCell>
                  <TableCell style={cellStyle} padding='none' align='right'>
                    {parseFloat(item.unitSales4W).toFixed(0)}
                  </TableCell>
                  <TableCell style={cellStyle} padding='none' align='right'>
                    ${parseFloat(item.netSales4W).toFixed(2)}
                  </TableCell>
                  <TableCell style={cellStyle} padding='none' align='right'>
                    {parseFloat(item.unitSales12W).toFixed(0)}
                  </TableCell>
                  <TableCell style={cellStyle} padding='none' align='right'>
                    ${parseFloat(item.netSales12W).toFixed(2)}
                  </TableCell>
                  <TableCell style={cellStyle} padding='none' align='right'>
                    {parseFloat(item.unitSales52W).toFixed(0)}
                  </TableCell>
                  <TableCell style={cellStyle} padding='none' align='right'>
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
