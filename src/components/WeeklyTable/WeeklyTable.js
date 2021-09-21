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
  const { weeklyProductData } = useAPI();

  const classes = useStyles();

  const cellStyle = {
    padding: '3px',
  };

  useEffect(() => {
    setData(weeklyProductData);
  }, [weeklyProductData]);

  return (
    <>
      <TableContainer id='weeklyProduct' component={Paper}>
        <Table
          // fixedHeader={false}
          // style={{ width: 'auto', tableLayout: 'auto' }}
          className={classes.table}
          // className='tableBody'
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
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default DenseTable;
