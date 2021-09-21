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
import './monthlyRevenueRecap.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function MonthlyRevenueRecap() {
  const [data, setData] = useState([]);
  const { monthlyProductData } = useAPI();
  const classes = useStyles();

  const cellStyle = {
    padding: '3px',
  };

  useEffect(() => {
    if (monthlyProductData) {
      setData(monthlyProductData);
    }
  }, [monthlyProductData]);

  return (
    <>
      <TableContainer id='monthlyRevenueRecap' component={Paper}>
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
                Revenue Recap
              </TableCell>
            </TableRow>
            <TableRow className='tableSubHeader'>
              <TableCell
                style={cellStyle}
                padding='none'
                className='tableHeaders'
              >
                Product
              </TableCell>
              <TableCell
                style={cellStyle}
                padding='none'
                className='tableHeaders'
                align='center'
              >
                Month 1
              </TableCell>
              <TableCell
                style={cellStyle}
                padding='none'
                className='tableHeaders'
                align='center'
              >
                % Change
              </TableCell>
              <TableCell
                style={cellStyle}
                padding='none'
                className='tableHeaders'
                align='center'
              >
                Month 2
              </TableCell>
              <TableCell
                style={cellStyle}
                padding='none'
                className='tableHeaders'
                align='center'
              >
                % Change
              </TableCell>
              <TableCell
                style={cellStyle}
                padding='none'
                className='tableHeaders'
                align='center'
              >
                Month 3
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
                  <TableCell style={cellStyle} padding='none' align='center'>
                    {item.netSales4W
                      ? '$' + parseFloat(item.netSales4W).toFixed(2)
                      : 'N/A'}
                  </TableCell>
                  <TableCell style={cellStyle} padding='none' align='center'>
                    {item.netSales8W
                      ? parseFloat(
                          ((item.netSales4W - item.netSales8W) /
                            item.netSales8W) *
                            100
                        ).toFixed(1) + '%'
                      : 'N/A'}
                  </TableCell>
                  <TableCell style={cellStyle} padding='none' align='center'>
                    {item.netSales8W
                      ? '$' + parseFloat(item.netSales8W).toFixed(2)
                      : 'N/A'}
                  </TableCell>
                  <TableCell style={cellStyle} padding='none' align='center'>
                    {item.netSales12W
                      ? parseFloat(
                          ((item.netSales8W - item.netSales12W) /
                            item.netSales12W) *
                            100
                        ).toFixed(1) + '%'
                      : 'N/A'}
                  </TableCell>
                  <TableCell style={cellStyle} padding='none' align='center'>
                    {item.netSales12W
                      ? '$' + parseFloat(item.netSales12W).toFixed(2)
                      : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default MonthlyRevenueRecap;
