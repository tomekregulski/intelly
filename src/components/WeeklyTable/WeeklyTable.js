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
import './weeklyTable.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function DenseTable() {
  const [data, setData] = useState([]);
  const [grandTotals, setGrandTotals] = useState({});

  const { weeklyProductData } = useAPI();

  const classes = useStyles();

  const cellStyle = {
    padding: '3px',
  };

  const gtCellStyle = {
    padding: '3px',
    fontWeight: 'bold',
  };

  useEffect(() => {
    if (weeklyProductData) {
      setData(weeklyProductData);
      let totalSalesW1 = 0;
      let totalSalesW2 = 0;
      let totalSalesW3 = 0;
      let totalSalesW4 = 0;
      weeklyProductData.forEach((entry) => {
        totalSalesW1 = totalSalesW1 + parseInt(entry.unitSalesLW);
        totalSalesW2 = totalSalesW2 + parseInt(entry.unitSalesWeek2);
        totalSalesW3 = totalSalesW3 + parseInt(entry.unitSalesWeek3);
        totalSalesW4 = totalSalesW4 + parseInt(entry.unitSalesWeek4);
      });

      setGrandTotals({
        totalSalesW1: totalSalesW1,
        totalSalesW2: totalSalesW2,
        totalSalesW3: totalSalesW3,
        totalSalesW4: totalSalesW4,
      });
    }
  }, [weeklyProductData]);

  return (
    <>
      <TableContainer id='weeklyProduct' component={Paper}>
        <Table
          className={classes.table}
          size='small'
          aria-label='a dense table'
        >
          <TableHead>
            <TableRow>
              <TableCell
                style={cellStyle}
                padding='none'
                className='tableTitle'
                align='center'
                colSpan={8}
              >
                % Change in Sales - Last 4 Weeks
              </TableCell>
            </TableRow>
            <TableRow>
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
                Last Week
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
                Week 2
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
                Week 3
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
                Week 4
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.name}>
                <TableCell
                  style={cellStyle}
                  padding='none'
                  component='th'
                  scope='row'
                >
                  {item.name}
                </TableCell>
                <TableCell style={cellStyle} padding='none' align='right'>
                  {parseFloat(item.unitSalesLW).toFixed(1)}
                </TableCell>
                <TableCell style={cellStyle} padding='none' align='right'>
                  {item.unitSalesLW && item.unitSalesWeek2
                    ? parseFloat(
                        ((item.unitSalesLW - item.unitSalesWeek2) /
                          item.unitSalesWeek2) *
                          100
                      ).toFixed(1) + '%'
                    : 'N/A'}
                </TableCell>
                <TableCell style={cellStyle} padding='none' align='right'>
                  {parseFloat(item.unitSalesWeek2).toFixed(1)}
                </TableCell>
                <TableCell style={cellStyle} padding='none' align='right'>
                  {item.unitSalesWeek2 && item.unitSalesWeek3
                    ? parseFloat(
                        ((item.unitSalesWeek2 - item.unitSalesWeek3) /
                          item.unitSalesWeek3) *
                          100
                      ).toFixed(1) + '%'
                    : 'N/A'}
                </TableCell>
                <TableCell style={cellStyle} padding='none' align='right'>
                  {parseFloat(item.unitSalesWeek3).toFixed(1)}
                </TableCell>
                <TableCell style={cellStyle} padding='none' align='right'>
                  {item.unitSalesWeek3 && item.unitSalesWeek4
                    ? parseFloat(
                        ((item.unitSalesWeek3 - item.unitSalesWeek4) /
                          item.unitSalesWeek4) *
                          100
                      ).toFixed(1) + '%'
                    : 'N/A'}
                </TableCell>
                <TableCell style={cellStyle} padding='none' align='right'>
                  {parseFloat(item.unitSalesWeek4).toFixed(1)}
                </TableCell>
              </TableRow>
            ))}
            {grandTotals !== {} ? (
              <TableRow>
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
                  {grandTotals.totalSalesW1}
                </TableCell>
                <TableCell style={gtCellStyle} padding='none' align='right'>
                  {(
                    ((grandTotals.totalSalesW1 - grandTotals.totalSalesW2) /
                      grandTotals.totalSalesW2) *
                    100
                  ).toFixed(1)}
                  %
                </TableCell>
                <TableCell style={gtCellStyle} padding='none' align='right'>
                  {grandTotals.totalSalesW2}
                </TableCell>
                <TableCell style={gtCellStyle} padding='none' align='right'>
                  {(
                    ((grandTotals.totalSalesW2 - grandTotals.totalSalesW3) /
                      grandTotals.totalSalesW3) *
                    100
                  ).toFixed(1)}
                  %
                </TableCell>
                <TableCell style={gtCellStyle} padding='none' align='right'>
                  {grandTotals.totalSalesW3}
                </TableCell>
                <TableCell style={gtCellStyle} padding='none' align='right'>
                  {(
                    ((grandTotals.totalSalesW3 - grandTotals.totalSalesW4) /
                      grandTotals.totalSalesW4) *
                    100
                  ).toFixed(1)}
                  %
                </TableCell>
                <TableCell style={gtCellStyle} padding='none' align='right'>
                  {grandTotals.totalSalesW4}
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default DenseTable;
