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

const useStyles = makeStyles({
  table: {
    minWidth: 730,
  },
});

export default function UnitsSoldPerStorePerWeek() {
  const [data, setData] = useState([]);
  const [grandTotals, setGrandTotals] = useState({});

  const { timeframeProductData } = useAPI();
  const classes = useStyles();

  useEffect(() => {
    if (timeframeProductData) {
      setData(timeframeProductData);
      let totalSalesLW = 0;
      let totalStoresLW = 0;
      let velocityLW = 0;
      let velocity4W = 0;
      let velocity12W = 0;
      let velocity52W = 0;
      for (let i = 0; i < timeframeProductData.length; i++) {
        totalSalesLW =
          totalSalesLW + parseInt(timeframeProductData[i].unitSalesLW);
        totalStoresLW =
          totalStoresLW + parseInt(timeframeProductData[i].storesLW);
        velocityLW =
          velocityLW +
          parseInt(timeframeProductData[i].unitSalesLW) /
            parseInt(timeframeProductData[i].storesLW);
        velocity4W =
          velocity4W +
          parseInt(timeframeProductData[i].unitSales4W) /
            parseInt(timeframeProductData[i].stores4W) /
            4;
        velocity12W =
          velocity12W +
          parseInt(timeframeProductData[i].unitSales12W) /
            parseInt(timeframeProductData[i].stores12W) /
            12;
        velocity52W =
          velocity52W +
          parseInt(timeframeProductData[i].unitSales52W) /
            parseInt(timeframeProductData[i].stores52W) /
            52;
      }
      setGrandTotals({
        salesLW: totalSalesLW,
        storesLW: totalStoresLW,
        velocityLW: velocityLW,
        velocity4W: velocity4W,
        velocity12W: velocity12W,
        velocity52W: velocity52W,
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
    <TableContainer style={{ marginBottom: '10px' }} component={Paper}>
      <Table className={classes.table} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell
              style={cellStyle}
              padding='none'
              className='tableTitle'
              align='center'
              colSpan={7}
            >
              Units Sold Per Store Per Week
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              style={cellStyle}
              padding='none'
              className='tableHeaders'
              colSpan={1}
            />
            <TableCell
              style={cellStyle}
              padding='none'
              className='tableHeaders'
              colSpan={2}
              align='center'
            >
              Last Week
            </TableCell>
            <TableCell
              style={cellStyle}
              padding='none'
              className='tableHeaders'
              colSpan={4}
              align='center'
            >
              Average Units Sold Per Store Per Week
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
              align='right'
            >
              Units Sold
            </TableCell>
            <TableCell
              style={cellStyle}
              padding='none'
              className='tableHeaders'
              align='right'
            >
              Total Stores
            </TableCell>
            <TableCell
              style={cellStyle}
              padding='none'
              className='tableHeaders'
              align='right'
            >
              Last Week
            </TableCell>
            <TableCell
              style={cellStyle}
              padding='none'
              className='tableHeaders'
              align='right'
            >
              4 Weeks
            </TableCell>
            <TableCell
              style={cellStyle}
              padding='none'
              className='tableHeaders'
              align='right'
            >
              12 Weeks
            </TableCell>
            <TableCell
              style={cellStyle}
              padding='none'
              className='tableHeaders'
              align='right'
            >
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
                  style={cellStyle}
                  padding='none'
                  align='left'
                  component='th'
                  scope='row'
                >
                  {item.name}
                </TableCell>
                <TableCell style={cellStyle} padding='none' align='right'>
                  {parseFloat(item.unitSalesLW)}
                </TableCell>
                <TableCell style={cellStyle} padding='none' align='right'>
                  {item.storesLW}
                </TableCell>
                <TableCell style={cellStyle} padding='none' align='right'>
                  {parseFloat(item.unitSalesLW / item.storesLW).toFixed(1)}
                </TableCell>
                <TableCell style={cellStyle} padding='none' align='right'>
                  {parseFloat(item.unitSales4W / item.stores4W / 4).toFixed(1)}
                </TableCell>
                <TableCell style={cellStyle} padding='none' align='right'>
                  {parseFloat(item.unitSales12W / item.stores12W / 12).toFixed(
                    1
                  )}
                </TableCell>
                <TableCell style={cellStyle} padding='none' align='right'>
                  {parseFloat(item.unitSales52W / item.stores52W / 52).toFixed(
                    1
                  )}
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
                {grandTotals.storesLW}
              </TableCell>
              <TableCell style={gtCellStyle} padding='none' align='right'>
                {grandTotals.velocityLW
                  ? grandTotals.velocityLW.toFixed(1)
                  : 'N/A'}
              </TableCell>
              <TableCell style={gtCellStyle} padding='none' align='right'>
                {grandTotals.velocity4W
                  ? grandTotals.velocity4W.toFixed(1)
                  : 'N/A'}
              </TableCell>
              <TableCell style={gtCellStyle} padding='none' align='right'>
                {grandTotals.velocity12W
                  ? grandTotals.velocity12W.toFixed(1)
                  : 'N/A'}
              </TableCell>
              <TableCell style={gtCellStyle} padding='none' align='right'>
                {grandTotals.velocity52W
                  ? grandTotals.velocity52W.toFixed(1)
                  : 'N/A'}
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
