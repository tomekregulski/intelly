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
  const { productData } = useAPI();

  useEffect(() => {
    setData(productData);
  }, [productData]);

  return (
    <>
      <h2 className='tableTitle'>% Change in Sales - Last 4 Weeks</h2>
      <TableContainer id='weeklyProduct' component={Paper}>
        <Table size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align='left'>Last Week</TableCell>
              <TableCell align='left'>% Change</TableCell>
              <TableCell align='left'>Week 2</TableCell>
              <TableCell align='left'>% Change</TableCell>
              <TableCell align='left'>Week 3</TableCell>
              <TableCell align='left'>% Change</TableCell>
              <TableCell align='left'>Week 4</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.name}>
                <TableCell component='th' scope='row'>
                  {item.name}
                </TableCell>
                <TableCell align='left'>
                  {parseFloat(item.salesWeek).toFixed(1)}
                </TableCell>
                <TableCell align='left'>
                  {parseFloat(
                    ((item.salesWeek - item.salesWeek2) / item.salesWeek2) * 100
                  ).toFixed(1)}
                  %
                </TableCell>
                <TableCell align='left'>
                  {parseFloat(item.salesWeek2).toFixed(1)}
                </TableCell>
                <TableCell align='left'>
                  {parseFloat(
                    ((item.salesWeek2 - item.salesWeek3) / item.salesWeek3) *
                      100
                  ).toFixed(1)}
                  %
                </TableCell>
                <TableCell align='left'>
                  {parseFloat(item.salesWeek3).toFixed(1)}
                </TableCell>
                <TableCell align='left'>
                  {parseFloat(
                    ((item.salesWeek3 - item.salesWeek4) / item.salesWeek4) *
                      100
                  ).toFixed(1)}
                  %
                </TableCell>
                <TableCell align='left'>
                  {parseFloat(item.salesWeek4).toFixed(1)}
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
