import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useAPI } from '../../context/apiContext';
import './velocityTable.css';

function VelocityTable() {
  const [data, setData] = useState([]);
  const { timeframeProductData } = useAPI();

  useEffect(() => {
    setData(timeframeProductData);
  }, [timeframeProductData]);

  return (
    <>
      <h2 className='tableTitle'>Units Sold Per Store Per Week</h2>
      <TableContainer id='velocityTable' component={Paper}>
        <Table size='small' aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align='left'>Units Sold</TableCell>
              <TableCell align='left'>Total Stores</TableCell>
              <TableCell align='left'>Velocity Last Week</TableCell>
              <TableCell align='left'>4 Weeks</TableCell>
              <TableCell align='left'>12 Weeks</TableCell>
              <TableCell align='left'>52 Weeks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length &&
              data.map((item) => (
                <TableRow key={item.name}>
                  <TableCell component='th' scope='row'>
                    {item.name}
                  </TableCell>
                  <TableCell align='left'>
                    {parseFloat(item.unitSalesLW)}
                  </TableCell>
                  <TableCell align='left'>{item.storesLW}</TableCell>
                  <TableCell align='left'>
                    {parseFloat(item.unitSalesLW / item.storesLW).toFixed(1)}
                  </TableCell>
                  <TableCell align='left'>
                    {parseFloat(item.unitSales4W / item.stores4W / 4).toFixed(
                      1
                    )}
                  </TableCell>
                  <TableCell align='left'>
                    {parseFloat(
                      item.unitSales12W / item.stores12W / 12
                    ).toFixed(1)}
                  </TableCell>
                  <TableCell align='left'>
                    {parseFloat(
                      item.unitSales52W / item.stores52W / 52
                    ).toFixed(1)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default VelocityTable;
