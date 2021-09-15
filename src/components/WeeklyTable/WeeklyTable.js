import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useAPI } from '../../context/apiContext';
import './weeklyTable.css';

function DenseTable() {
  const [data, setData] = useState([]);
  const { timeframeProductData } = useAPI();

  useEffect(() => {
    setData(timeframeProductData);
  }, [timeframeProductData]);

  return (
    <>
      <TableContainer id='weeklyProduct' component={Paper}>
        <Table
          // fixedHeader={false}
          // style={{ width: 'auto', tableLayout: 'auto' }}
          className='tableBody'
          size='small'
          aria-label='a dense table'
        >
          <TableHead>
            <TableRow>
              <TableCell
                padding='none'
                className='tableTitle'
                align='center'
                colSpan={8}
              >
                % Change in Sales - Last 4 Weeks
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell padding='none' className='tableHeaders'>
                Product
              </TableCell>
              <TableCell padding='none' className='tableHeaders' align='center'>
                Last Week
              </TableCell>
              <TableCell padding='none' className='tableHeaders' align='center'>
                % Change
              </TableCell>
              <TableCell padding='none' className='tableHeaders' align='center'>
                Week 2
              </TableCell>
              <TableCell padding='none' className='tableHeaders' align='center'>
                % Change
              </TableCell>
              <TableCell padding='none' className='tableHeaders' align='center'>
                Week 3
              </TableCell>
              <TableCell padding='none' className='tableHeaders' align='center'>
                % Change
              </TableCell>
              <TableCell padding='none' className='tableHeaders' align='center'>
                Week 4
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.name}>
                <TableCell padding='none' component='th' scope='row'>
                  {item.name}
                </TableCell>
                <TableCell padding='none' align='right'>
                  {parseFloat(item.unitSalesLW).toFixed(1)}
                </TableCell>
                <TableCell padding='none' align='right'>
                  {item.unitSalesLW && item.unitSalesWeek2
                    ? parseFloat(
                        ((item.unitSalesLW - item.unitSalesWeek2) /
                          item.unitSalesWeek2) *
                          100
                      ).toFixed(1) + '%'
                    : 'N/A'}
                </TableCell>
                <TableCell padding='none' align='right'>
                  {parseFloat(item.unitSalesWeek2).toFixed(1)}
                </TableCell>
                <TableCell padding='none' align='right'>
                  {item.unitSalesWeek2 && item.unitSalesWeek3
                    ? parseFloat(
                        ((item.unitSalesWeek2 - item.unitSalesWeek3) /
                          item.unitSalesWeek3) *
                          100
                      ).toFixed(1) + '%'
                    : 'N/A'}
                </TableCell>
                <TableCell padding='none' align='right'>
                  {parseFloat(item.unitSalesWeek3).toFixed(1)}
                </TableCell>
                <TableCell padding='none' align='right'>
                  {item.unitSalesWeek3 && item.unitSalesWeek4
                    ? parseFloat(
                        ((item.unitSalesWeek3 - item.unitSalesWeek4) /
                          item.unitSalesWeek4) *
                          100
                      ).toFixed(1) + '%'
                    : 'N/A'}
                </TableCell>
                <TableCell padding='none' align='right'>
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
