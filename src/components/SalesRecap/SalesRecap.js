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
  const [grandTotals, setGrandTotals] = useState({});
  const { timeframeProductData } = useAPI();
  const classes = useStyles();

  useEffect(() => {
    if (timeframeProductData) {
      setData(timeframeProductData);
      let totalSalesLW = 0;
      let totalRevenueLW = 0;
      let totalSales4W = 0;
      let totalRevenue4W = 0;
      let totalSales12W = 0;
      let totalRevenue12W = 0;
      let totalSales52W = 0;
      let totalRevenue52W = 0;
      for (let i = 0; i < timeframeProductData.length; i++) {
        totalSalesLW =
          totalSalesLW + parseInt(timeframeProductData[i].unitSalesLW);
        totalRevenueLW =
          totalRevenueLW + parseInt(timeframeProductData[i].netSalesLW);
        totalSales4W =
          totalSales4W + parseInt(timeframeProductData[i].unitSales4W);
        totalRevenue4W =
          totalRevenue4W + parseInt(timeframeProductData[i].netSales4W);
        totalSales12W =
          totalSales12W + parseInt(timeframeProductData[i].unitSales12W);
        totalRevenue12W =
          totalRevenue12W + parseInt(timeframeProductData[i].netSales12W);
        totalSales52W =
          totalSales52W + timeframeProductData[i].unitSales52W
            ? parseInt(timeframeProductData[i].unitSales52W)
            : 0;
        totalRevenue52W =
          totalRevenue52W + timeframeProductData[i].netSales52W
            ? parseInt(timeframeProductData[i].netSales52W)
            : 0;
      }
      setGrandTotals({
        salesLW: totalSalesLW,
        revenueLW: totalRevenueLW,
        sales4W: totalSales4W,
        revenue4W: totalRevenue4W,
        sales12W: totalSales12W,
        revenue12W: totalRevenue12W,
        sales52W: totalSales52W,
        revenue52W: totalRevenue52W,
      });
    }
  }, [timeframeProductData]);

  const cellStyle = {
    padding: '3px',
  };

  const gtCellStyle = {
    padding: '3px',
    fontWeight: 'bold',
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
                    {item.unitSales52W
                      ? '$' + parseFloat(item.unitSales52W).toFixed(0)
                      : 'N/A'}
                  </TableCell>
                  <TableCell style={cellStyle} padding='none' align='right'>
                    {item.netSales52W
                      ? '$' + parseFloat(item.netSales52W).toFixed(2)
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
                <TableCell style={gtCellStyle} padding='none' align='right'>
                  {grandTotals.salesLW}
                </TableCell>
                <TableCell style={gtCellStyle} padding='none' align='right'>
                  ${grandTotals.revenueLW}
                </TableCell>
                <TableCell style={gtCellStyle} padding='none' align='right'>
                  {grandTotals.sales4W}
                </TableCell>
                <TableCell style={gtCellStyle} padding='none' align='right'>
                  ${grandTotals.revenue4W}
                </TableCell>
                <TableCell style={gtCellStyle} padding='none' align='right'>
                  {grandTotals.sales12W}
                </TableCell>
                <TableCell style={gtCellStyle} padding='none' align='right'>
                  ${grandTotals.revenue12W}
                </TableCell>
                <TableCell style={gtCellStyle} padding='none' align='right'>
                  {grandTotals.sales52W}
                </TableCell>
                <TableCell style={gtCellStyle} padding='none' align='right'>
                  ${grandTotals.revenue52W}
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default SalesRecap;
