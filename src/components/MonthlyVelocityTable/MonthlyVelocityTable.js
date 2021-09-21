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
    minWidth: 650,
  },
});
export default function MonthlyVelocityTable() {
  const [data, setData] = useState([]);
  const [grandTotals, setGrandTotals] = useState({});

  const { monthlyProductData } = useAPI();
  const classes = useStyles();

  useEffect(() => {
    if (monthlyProductData) {
      setData(monthlyProductData);
      let velocityM1 = 0;
      let velocityM2 = 0;
      let velocityM3 = 0;
      for (let i = 0; i < monthlyProductData.length; i++) {
        velocityM1 =
          velocityM1 +
          parseInt(monthlyProductData[i].unitSales4W) /
            parseInt(monthlyProductData[i].stores4W);
        velocityM2 =
          velocityM2 +
          parseInt(monthlyProductData[i].unitSales8W) /
            parseInt(monthlyProductData[i].stores8W);
        velocityM3 =
          velocityM3 +
          parseInt(monthlyProductData[i].unitSales12W) /
            parseInt(monthlyProductData[i].stores12W);
      }
      setGrandTotals({
        velocityM1: velocityM1,
        velocityM2: velocityM2,
        velocityM3: velocityM3,
      });
    }
  }, [monthlyProductData]);

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
              Units Sold Per Store Per Month
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
                  style={cellStyle}
                  padding='none'
                  align='left'
                  component='th'
                  scope='row'
                >
                  {item.name}
                </TableCell>
                <TableCell style={cellStyle} padding='none' align='center'>
                  {item.unitSales4W
                    ? parseFloat(item.unitSales4W / item.stores4W / 4).toFixed(
                        1
                      )
                    : 'N/A'}
                </TableCell>
                <TableCell style={cellStyle} padding='none' align='center'>
                  {item.unitSales8W
                    ? parseFloat(
                        ((item.unitSales4W / item.stores4W / 4 -
                          item.unitSales8W / item.stores8W / 4) /
                          (item.unitSales8W / item.stores8W / 4)) *
                          100
                      ).toFixed(1) + '%'
                    : 'N/A'}
                </TableCell>
                <TableCell style={cellStyle} padding='none' align='center'>
                  {item.unitSales8W
                    ? parseFloat(item.unitSales8W / item.stores8W / 4).toFixed(
                        1
                      )
                    : 'N/A'}
                </TableCell>
                <TableCell style={cellStyle} padding='none' align='center'>
                  {item.unitSales12W
                    ? parseFloat(
                        ((item.unitSales8W / item.stores8W / 4 -
                          item.unitSales12W / item.stores12W / 4) /
                          (item.unitSales12W - item.stores12W / 4)) *
                          100
                      ).toFixed(1) + '%'
                    : 'N/A'}
                </TableCell>
                <TableCell style={cellStyle} padding='none' align='center'>
                  {item.unitSales12W
                    ? parseFloat(
                        item.unitSales12W / item.stores12W / 4
                      ).toFixed(1)
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
                {grandTotals.velocityM1
                  ? grandTotals.velocityM1.toFixed(1)
                  : 'N/A'}
              </TableCell>
              <TableCell style={gtCellStyle} padding='none' align='center'>
                {grandTotals.velocityM2
                  ? (
                      ((grandTotals.velocityM1 - grandTotals.velocityM2) /
                        grandTotals.velocityM2) *
                      100
                    ).toFixed(1) + '%'
                  : 'N/A'}
              </TableCell>
              <TableCell style={gtCellStyle} padding='none' align='center'>
                {grandTotals.velocityM2
                  ? grandTotals.velocityM2.toFixed(1)
                  : 'N/A'}
              </TableCell>
              <TableCell style={gtCellStyle} padding='none' align='center'>
                {grandTotals.velocityM3
                  ? (
                      ((grandTotals.velocityM2 - grandTotals.velocityM3) /
                        grandTotals.velocityM3) *
                      100
                    ).toFixed(1) + '%'
                  : 'N/A'}
              </TableCell>
              <TableCell style={gtCellStyle} padding='none' align='center'>
                {grandTotals.velocityM3
                  ? grandTotals.velocityM3.toFixed(1)
                  : 'N/A'}
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
