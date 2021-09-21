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
  const [grandTotals, setGrandTotals] = useState({});

  const { monthlyProductData } = useAPI();
  const classes = useStyles();

  const cellStyle = {
    padding: '3px',
  };

  const gtCellStyle = {
    padding: '3px',
    fontWeight: 'bold',
  };

  useEffect(() => {
    if (monthlyProductData) {
      setData(monthlyProductData);
      let totalSalesM1 = 0;
      let totalSalesM2 = 0;
      let totalSalesM3 = 0;
      for (let i = 0; i < monthlyProductData.length; i++) {
        totalSalesM1 =
          totalSalesM1 + parseInt(monthlyProductData[i].netSales4W);
        totalSalesM2 =
          totalSalesM2 + parseInt(monthlyProductData[i].netSales8W);
        totalSalesM3 =
          totalSalesM3 + parseInt(monthlyProductData[i].netSales12W);
      }
      setGrandTotals({
        totalSalesM1: totalSalesM1,
        totalSalesM2: totalSalesM2,
        totalSalesM3: totalSalesM3,
      });
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
            {grandTotals !== {} ? (
              <TableRow

              // className={index % 2 === 1 ? 'highlighted' : null}
              >
                <TableCell
                  style={gtCellStyle}
                  align='left'
                  padding='none'
                  component='th'
                  scope='row'
                >
                  Grand Total
                </TableCell>
                <TableCell style={gtCellStyle} padding='none' align='center'>
                  ${grandTotals.totalSalesM1.toFixed(2)}
                </TableCell>
                <TableCell style={gtCellStyle} padding='none' align='center'>
                  {(
                    ((grandTotals.totalSalesM1 - grandTotals.totalSalesM2) /
                      grandTotals.totalSalesM2) *
                    100
                  ).toFixed(1)}
                  %
                </TableCell>
                <TableCell style={gtCellStyle} padding='none' align='center'>
                  ${grandTotals.totalSalesM2.toFixed(2)}
                </TableCell>
                <TableCell style={gtCellStyle} padding='none' align='center'>
                  {(
                    ((grandTotals.totalSalesM2 - grandTotals.totalSalesM3) /
                      grandTotals.totalSalesM3) *
                    100
                  ).toFixed(1)}
                  %
                </TableCell>
                <TableCell style={gtCellStyle} padding='none' align='center'>
                  ${grandTotals.totalSalesM3.toFixed(2)}
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default MonthlyRevenueRecap;
